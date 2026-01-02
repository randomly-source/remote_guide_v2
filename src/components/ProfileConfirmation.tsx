import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FieldGroup, Field, FieldRow } from './FieldGroup';
import { SectionEditModal } from './SectionEditModal';
import { ProgressBar } from './ProgressBar';
import { HierarchyWarningModal, HierarchyWarning } from './HierarchyWarningModal';
import { HouseholdProfile, Site, HouseholdMember, PersonalDevice } from '../types/household';
import { getDefaultHouseholdProfile, generateId, validateProfile } from '../utils/profileParser';
import {
  CheckCircle2,
  Home as HomeIcon,
  Users,
  Tv,
  Smartphone,
  Edit3,
  CheckSquare
} from 'lucide-react';

interface ProfileConfirmationProps {
  profile?: HouseholdProfile;
  onSave?: (profile: HouseholdProfile) => void;
  onEdit?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

export function ProfileConfirmation({
  profile = getDefaultHouseholdProfile(),
  onSave,
  onEdit,
  onModalStateChange
}: ProfileConfirmationProps) {
  const [editedProfile, setEditedProfile] = useState<HouseholdProfile>(profile);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [confirmedSections, setConfirmedSections] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [warning, setWarning] = useState<HierarchyWarning | null>(null);
  const [pendingChange, setPendingChange] = useState<{
    field: string;
    value: any;
    handler: () => void;
  } | null>(null);

  const sectionPages = [
    { id: 'household', label: 'Household Overview', shortLabel: 'Overview' },
    { id: 'members', label: 'Household Members', shortLabel: 'Members' },
    { id: 'sites', label: 'TV Sites', shortLabel: 'TV Sites' },
    { id: 'devices', label: 'Personal Devices', shortLabel: 'Devices' },
    { id: 'consent', label: 'Consent & Measurement', shortLabel: 'Consent' }
  ];
  const totalSections = sectionPages.length;

  // Scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIndex]);

  const handleNext = () => {
    const currentSectionId = sectionPages[currentSectionIndex].id;
    if (!confirmedSections.has(currentSectionId)) {
      alert('Please confirm this section before proceeding.');
      return;
    }
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const toggleSectionConfirmation = (sectionId: string) => {
    setConfirmedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
        // Auto-advance to next section if not the last one
        if (currentSectionIndex < totalSections - 1) {
          setTimeout(() => {
            setCurrentSectionIndex(prev => prev + 1);
          }, 300); // Small delay for visual feedback
        }
      }
      return next;
    });
  };

  const currentSectionId = sectionPages[currentSectionIndex].id;
  const isCurrentSectionConfirmed = confirmedSections.has(currentSectionId);
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === totalSections - 1;

  const checkHierarchyWarnings = useCallback((
    field: string,
    newValue: any,
    applyChange: () => void
  ) => {
    if (field === 'totalTelevisions' && typeof newValue === 'number') {
      if (newValue < editedProfile.sites.length) {
        const excessSites = editedProfile.sites.slice(newValue);
        setWarning({
          type: 'tv_count_reduction',
          title: 'Reducing Number of TVs',
          message: `You're reducing the number of TVs from ${editedProfile.totalTelevisions} to ${newValue}. This will affect the following sites:`,
          affectedItems: excessSites.map((site, idx) => ({
            id: site.id,
            label: site.label,
            description: `Site ${idx + 1} with ${site.connectedDevices.setTopBox?.present ? 'STB, ' : ''}${site.connectedDevices.streamingDevice?.present ? 'Streaming, ' : ''}${site.connectedDevices.gameSystem?.present ? 'Game System' : ''}`
          }))
        });
        setPendingChange({ field, value: newValue, handler: applyChange });
        return;
      }
    }

    if (field === 'members' && Array.isArray(newValue)) {
      const removedMembers = editedProfile.members.filter(
        m => !newValue.find((nm: HouseholdMember) => nm.id === m.id)
      );
      if (removedMembers.length > 0) {
        const affectedDevices = editedProfile.personalDevices.filter(
          d => removedMembers.some(m => m.id === d.primaryUserId)
        );
        if (affectedDevices.length > 0) {
          setWarning({
            type: 'member_removal',
            title: 'Removing Household Member',
            message: `Removing this member will also remove their associated devices:`,
            affectedItems: affectedDevices.map(device => ({
              id: device.id,
              label: device.shortName,
              description: `${device.type} - ${device.primaryUserId}`
            }))
          });
          setPendingChange({ field, value: newValue, handler: applyChange });
          return;
        }
      }
    }

    applyChange();
  }, [editedProfile]);

  const handleWarningConfirm = (selectedItemsToRemove?: string[]) => {
    if (!pendingChange) return;

    if (pendingChange.field === 'totalTelevisions') {
      const sitesToKeep = editedProfile.sites.filter(
        site => !selectedItemsToRemove?.includes(site.id)
      );
      setEditedProfile(prev => ({
        ...prev,
        totalTelevisions: pendingChange.value,
        sites: sitesToKeep
      }));
    } else if (pendingChange.field === 'members') {
      const devicesToKeep = editedProfile.personalDevices.filter(
        device => !selectedItemsToRemove?.includes(device.id)
      );
      setEditedProfile(prev => ({
        ...prev,
        members: pendingChange.value,
        personalDevices: devicesToKeep
      }));
    }

    setWarning(null);
    setPendingChange(null);
  };

  const handleWarningCancel = () => {
    setWarning(null);
    setPendingChange(null);
  };

  const handleSave = () => {
    const validation = validateProfile(editedProfile);
    if (!validation.valid) {
      alert(`Validation errors:\n${validation.errors.join('\n')}`);
      return;
    }
    if (onSave) {
      onSave(editedProfile);
    }
  };

  // Edit Modal State
  const [householdEditData, setHouseholdEditData] = useState({
    address: editedProfile.address,
    householdComposition: editedProfile.householdComposition,
    totalTelevisions: editedProfile.totalTelevisions,
    primaryContact: editedProfile.primaryContact || ''
  });

  const [consentEditData, setConsentEditData] = useState({
    householdAgreement: editedProfile.consent.householdAgreement,
    mappingAgreement: editedProfile.consent.mappingAgreement,
    mappingMethod: editedProfile.consent.mappingMethod || ''
  });

  const [membersEditData, setMembersEditData] = useState<HouseholdMember[]>([]);
  const [sitesEditData, setSitesEditData] = useState<Site[]>([]);
  const [devicesEditData, setDevicesEditData] = useState<PersonalDevice[]>([]);

  // Initialize edit data when opening modals
  React.useEffect(() => {
    if (editingSection === 'household') {
      setHouseholdEditData({
        address: editedProfile.address,
        householdComposition: editedProfile.householdComposition,
        totalTelevisions: editedProfile.totalTelevisions,
        primaryContact: editedProfile.primaryContact || ''
      });
    }
    if (editingSection === 'consent') {
      setConsentEditData({
        householdAgreement: editedProfile.consent.householdAgreement,
        mappingAgreement: editedProfile.consent.mappingAgreement,
        mappingMethod: editedProfile.consent.mappingMethod || ''
      });
    }
    if (editingSection === 'members') {
      setMembersEditData(JSON.parse(JSON.stringify(editedProfile.members)));
    }
    if (editingSection === 'sites') {
      setSitesEditData(JSON.parse(JSON.stringify(editedProfile.sites)));
    }
    if (editingSection === 'devices') {
      setDevicesEditData(JSON.parse(JSON.stringify(editedProfile.personalDevices)));
    }
  }, [editingSection, editedProfile]);

  const handleHouseholdEditSave = () => {
    checkHierarchyWarnings('totalTelevisions', householdEditData.totalTelevisions, () => {
      setEditedProfile(prev => ({
        ...prev,
        address: householdEditData.address,
        householdComposition: householdEditData.householdComposition,
        totalTelevisions: householdEditData.totalTelevisions,
        primaryContact: householdEditData.primaryContact || undefined
      }));
      setEditingSection(null);
    });
  };

  const handleConsentEditSave = () => {
    setEditedProfile(prev => ({
      ...prev,
      consent: {
        householdAgreement: consentEditData.householdAgreement,
        mappingAgreement: consentEditData.mappingAgreement,
        mappingMethod: consentEditData.mappingMethod || undefined
      }
    }));
    setEditingSection(null);
  };

  const handleMembersEditSave = () => {
    checkHierarchyWarnings('members', membersEditData, () => {
      setEditedProfile(prev => ({
        ...prev,
        members: membersEditData
      }));
      setEditingSection(null);
    });
  };

  const handleSitesEditSave = () => {
    setEditedProfile(prev => ({
      ...prev,
      sites: sitesEditData
    }));
    setEditingSection(null);
  };

  const handleDevicesEditSave = () => {
    setEditedProfile(prev => ({
      ...prev,
      personalDevices: devicesEditData
    }));
    setEditingSection(null);
  };

  // Render current section content
  const renderCurrentSection = () => {
    const section = sectionPages[currentSectionIndex];
    
    switch (section.id) {
      case 'household':
        return renderHouseholdSection();
      case 'members':
        return renderMembersSection();
      case 'sites':
        return renderSitesSection();
      case 'devices':
        return renderDevicesSection();
      case 'consent':
        return renderConsentSection();
      default:
        return null;
    }
  };

  const renderHouseholdSection = () => (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <HomeIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Household Overview</h3>
            <p className="text-xs text-gray-500 mt-0.5">Address and basic information</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confirmedSections.has('household') && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          <Button
            variant="ghost"
            onClick={() => {
              setHouseholdEditData({
                address: editedProfile.address,
                householdComposition: editedProfile.householdComposition,
                totalTelevisions: editedProfile.totalTelevisions,
                primaryContact: editedProfile.primaryContact || ''
              });
              setEditingSection('household');
            }}
            className="text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <FieldGroup>
          <FieldRow label="Home Address" value={editedProfile.address} />
          <FieldRow label="Household Members" value={`${editedProfile.householdComposition} people`} />
          <FieldRow label="Total Televisions" value={`${editedProfile.totalTelevisions} TV${editedProfile.totalTelevisions !== 1 ? 's' : ''}`} />
          {editedProfile.primaryContact && (
            <FieldRow label="Primary Contact" value={editedProfile.primaryContact} />
          )}
        </FieldGroup>
      </div>
    </Card>
  );

  const renderMembersSection = () => (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Household Members</h3>
            <p className="text-xs text-gray-500 mt-0.5">{editedProfile.members.length} member{editedProfile.members.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confirmedSections.has('members') && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          <Button
            variant="ghost"
            onClick={() => setEditingSection('members')}
            className="text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {editedProfile.members.map((member) => (
          <Card key={member.id} className="bg-gray-50 border border-gray-200">
            <div className="space-y-3">
              <FieldGroup>
                <Field label="Name" value={member.name} />
                {member.age !== undefined && <Field label="Age" value={member.age} />}
                {member.sex && <Field label="Sex" value={member.sex} />}
                {member.primaryRoles && (
                  <Field label="Primary Roles/Notes" value={member.primaryRoles} />
                )}
              </FieldGroup>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );

  const renderSitesSection = () => (
    <Card className="overflow-hidden shadow-sm w-full">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Tv className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">TV Sites</h3>
            <p className="text-xs text-gray-500 mt-0.5">{editedProfile.sites.length} site{editedProfile.sites.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confirmedSections.has('sites') && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          <Button
            variant="ghost"
            onClick={() => setEditingSection('sites')}
            className="text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-5 sm:p-6 space-y-4 w-full">
        {editedProfile.sites.map((site) => (
          <div key={site.id} className="bg-gray-50 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 space-y-3 w-full">
            <h4 className="font-semibold text-gray-900 text-base">{site.label}</h4>
            
            <div className="space-y-2 text-sm w-full">
              <div className="flex justify-between items-center w-full gap-4">
                <span className="text-gray-600 shrink-0">Metered:</span>
                <span className="text-gray-900 font-medium text-right flex-1">{site.metered ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between items-center w-full gap-4">
                <span className="text-gray-600 shrink-0">Reception:</span>
                <span className="text-gray-900 font-medium text-right flex-1 break-words">{site.receptionTypes.join(', ')}</span>
              </div>
              {site.tvDetails.make && (
                <div className="flex justify-between items-center w-full gap-4">
                  <span className="text-gray-600 shrink-0">TV Make:</span>
                  <span className="text-gray-900 font-medium text-right flex-1">{site.tvDetails.make}</span>
                </div>
              )}
              {site.tvDetails.hdCapable !== undefined && (
                <div className="flex justify-between items-center w-full gap-4">
                  <span className="text-gray-600 shrink-0">HD Capable:</span>
                  <span className="text-gray-900 font-medium text-right flex-1">{site.tvDetails.hdCapable ? 'Yes' : 'No'}</span>
                </div>
              )}
              {site.tvDetails.internetStatus && (
                <div className="flex justify-between items-center w-full gap-4">
                  <span className="text-gray-600 shrink-0">Internet:</span>
                  <span className="text-gray-900 font-medium text-right flex-1 break-words">{site.tvDetails.internetStatus}</span>
                </div>
              )}
            </div>

            {(site.connectedDevices.setTopBox?.present || 
              site.connectedDevices.streamingDevice?.present || 
              site.connectedDevices.gameSystem?.present) && (
              <div className="pt-2 border-t border-gray-200 space-y-2 w-full">
                {site.connectedDevices.setTopBox?.present && (
                  <div className="text-sm flex justify-between items-center w-full gap-4">
                    <span className="text-gray-600 shrink-0">Set-Top Box:</span>
                    <span className="text-gray-900 font-medium text-right flex-1">
                      {site.connectedDevices.setTopBox.make || 'STB'}
                      {site.connectedDevices.setTopBox.hdCapable && ' (HD)'}
                      {site.connectedDevices.setTopBox.dvrCapable && ' (DVR)'}
                    </span>
                  </div>
                )}
                {site.connectedDevices.streamingDevice?.present && (
                  <div className="text-sm flex justify-between items-center w-full gap-4">
                    <span className="text-gray-600 shrink-0">Streaming:</span>
                    <span className="text-gray-900 font-medium text-right flex-1 break-words">
                      {site.connectedDevices.streamingDevice.device}
                      {site.connectedDevices.streamingDevice.internetEnabled && ' (Internet Enabled)'}
                    </span>
                  </div>
                )}
                {site.connectedDevices.gameSystem?.present && (
                  <div className="text-sm flex justify-between items-center w-full gap-4">
                    <span className="text-gray-600 shrink-0">Game System:</span>
                    <span className="text-gray-900 font-medium text-right flex-1">{site.connectedDevices.gameSystem.device}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );

  const renderDevicesSection = () => (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Personal Devices</h3>
            <p className="text-xs text-gray-500 mt-0.5">{editedProfile.personalDevices.length} device{editedProfile.personalDevices.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confirmedSections.has('devices') && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          <Button
            variant="ghost"
            onClick={() => setEditingSection('devices')}
            className="text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-5 space-y-4">
        {editedProfile.members.map((member) => {
          const memberDevices = editedProfile.personalDevices.filter(
            d => d.primaryUserId === member.id
          );
          if (memberDevices.length === 0) return null;

          return (
            <div key={member.id} className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm pb-2 border-b border-gray-200">
                {member.name}'s Devices
              </h4>
              {memberDevices.map((device) => (
                <Card key={device.id} className="bg-gray-50 border border-gray-200">
                  <FieldGroup>
                    <Field label="Device Name" value={device.shortName} />
                    <Field label="Type" value={device.type} />
                    {device.provider && <Field label="Provider" value={device.provider} />}
                    {device.osType && <Field label="OS Type" value={device.osType} />}
                    {device.homeWifi !== undefined && (
                      <Field label="Home WiFi" value={device.homeWifi ? 'Yes' : 'No'} />
                    )}
                    {device.make && <Field label="Make" value={device.make} />}
                    {device.workRelated !== undefined && (
                      <Field label="Work Related" value={device.workRelated ? 'Yes' : 'No'} />
                    )}
                  </FieldGroup>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </Card>
  );

  const renderConsentSection = () => (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Consent & Measurement</h3>
            <p className="text-xs text-gray-500 mt-0.5">Agreements and permissions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {confirmedSections.has('consent') && (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          )}
          <Button
            variant="ghost"
            onClick={() => setEditingSection('consent')}
            className="text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit
          </Button>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <FieldGroup>
          <FieldRow label="Household Agreement" value={editedProfile.consent.householdAgreement ? 'Yes' : 'No'} />
          <FieldRow label="Mapping Agreement" value={editedProfile.consent.mappingAgreement ? 'Yes' : 'No'} />
          {editedProfile.consent.mappingMethod && (
            <FieldRow label="Mapping Method" value={editedProfile.consent.mappingMethod} />
          )}
        </FieldGroup>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Verify Your Profile
        </h2>
        <p className="text-sm text-gray-600">
          Please review and confirm each section. You can go back to edit previous sections at any time.
        </p>
      </div>

      {/* Progress Bar */}
      <div>
        <ProgressBar
          sections={sectionPages}
          currentIndex={currentSectionIndex}
          confirmedSections={confirmedSections}
          onSectionClick={(index) => setCurrentSectionIndex(index)}
        />
        <p className="text-xs text-gray-500 text-center mt-2">
          💡 Tip: Click on any section in the progress bar above to navigate
        </p>
      </div>

      {/* Current Section */}
      <div className="min-h-[400px]">
        {renderCurrentSection()}
      </div>

      {/* Confirm Button */}
      <div className="pt-4">
        {isLastSection && confirmedSections.size === totalSections ? (
          <Button
            variant="primary"
            onClick={handleSave}
            fullWidth
            className="text-sm h-12"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Save All Changes
          </Button>
        ) : (
          <Button
            variant={isCurrentSectionConfirmed ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => toggleSectionConfirmation(currentSectionId)}
            className="text-sm h-12"
          >
            {isCurrentSectionConfirmed ? (
              <>
                <CheckSquare className="w-5 h-5 mr-2" />
                Section Confirmed
              </>
            ) : (
              <>
                <CheckSquare className="w-5 h-5 mr-2" />
                Confirm This Section
              </>
            )}
          </Button>
        )}
      </div>


      {/* Edit Modals */}
      {/* Household Edit Modal */}
      <SectionEditModal
        isOpen={editingSection === 'household'}
        title="Edit Household Overview"
        onSave={handleHouseholdEditSave}
        onCancel={() => setEditingSection(null)}
        onClose={() => setEditingSection(null)}
        onModalStateChange={onModalStateChange}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Home Address
            </label>
            <input
              type="text"
              value={householdEditData.address}
              onChange={(e) => setHouseholdEditData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Household Members
            </label>
            <input
              type="number"
              value={householdEditData.householdComposition}
              onChange={(e) => setHouseholdEditData(prev => ({ ...prev, householdComposition: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Total Televisions
            </label>
            <input
              type="number"
              value={householdEditData.totalTelevisions}
              onChange={(e) => setHouseholdEditData(prev => ({ ...prev, totalTelevisions: parseInt(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Primary Contact
            </label>
            <input
              type="text"
              value={householdEditData.primaryContact}
              onChange={(e) => setHouseholdEditData(prev => ({ ...prev, primaryContact: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
        </div>
      </SectionEditModal>

      {/* Consent Edit Modal */}
      <SectionEditModal
        isOpen={editingSection === 'consent'}
        title="Edit Consent & Measurement"
        onSave={handleConsentEditSave}
        onCancel={() => setEditingSection(null)}
        onClose={() => setEditingSection(null)}
        onModalStateChange={onModalStateChange}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Household Agreement
            </label>
            <select
              value={consentEditData.householdAgreement ? 'Yes' : 'No'}
              onChange={(e) => setConsentEditData(prev => ({ ...prev, householdAgreement: e.target.value === 'Yes' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mapping Agreement
            </label>
            <select
              value={consentEditData.mappingAgreement ? 'Yes' : 'No'}
              onChange={(e) => setConsentEditData(prev => ({ ...prev, mappingAgreement: e.target.value === 'Yes' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mapping Method
            </label>
            <select
              value={consentEditData.mappingMethod}
              onChange={(e) => setConsentEditData(prev => ({ ...prev, mappingMethod: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            >
              <option value="Panelist Mapping">Panelist Mapping</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </SectionEditModal>

      {/* Members Edit Modal */}
      <SectionEditModal
        isOpen={editingSection === 'members'}
        title="Edit Household Members"
        onSave={handleMembersEditSave}
        onCancel={() => setEditingSection(null)}
        onClose={() => setEditingSection(null)}
        onModalStateChange={onModalStateChange}
      >
        <div className="space-y-6">
          {membersEditData.map((member, idx) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <h4 className="font-semibold text-gray-900">Member {idx + 1}</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...membersEditData];
                    updated[idx] = { ...updated[idx], name: e.target.value };
                    setMembersEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input
                  type="number"
                  value={member.age || ''}
                  onChange={(e) => {
                    const updated = [...membersEditData];
                    updated[idx] = { ...updated[idx], age: parseInt(e.target.value) || undefined };
                    setMembersEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sex</label>
                <select
                  value={member.sex || ''}
                  onChange={(e) => {
                    const updated = [...membersEditData];
                    updated[idx] = { ...updated[idx], sex: e.target.value as 'Male' | 'Female' | 'Other' };
                    setMembersEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary Roles/Notes</label>
                <textarea
                  value={member.primaryRoles || ''}
                  onChange={(e) => {
                    const updated = [...membersEditData];
                    updated[idx] = { ...updated[idx], primaryRoles: e.target.value };
                    setMembersEditData(updated);
                  }}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </SectionEditModal>

      {/* Sites Edit Modal */}
      <SectionEditModal
        isOpen={editingSection === 'sites'}
        title="Edit TV Sites"
        onSave={handleSitesEditSave}
        onCancel={() => setEditingSection(null)}
        onClose={() => setEditingSection(null)}
        onModalStateChange={onModalStateChange}
      >
        <div className="space-y-6">
          {sitesEditData.map((site, idx) => (
            <div key={site.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <h4 className="font-semibold text-gray-900">Site {idx + 1}</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Label</label>
                <input
                  type="text"
                  value={site.label}
                  onChange={(e) => {
                    const updated = [...sitesEditData];
                    updated[idx] = { ...updated[idx], label: e.target.value };
                    setSitesEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Metered</label>
                <select
                  value={site.metered ? 'Yes' : 'No'}
                  onChange={(e) => {
                    const updated = [...sitesEditData];
                    updated[idx] = { ...updated[idx], metered: e.target.value === 'Yes' };
                    setSitesEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reception Types</label>
                <div className="space-y-2 border border-gray-200 rounded-lg p-3 bg-gray-50">
                  {(['OTA', 'Cable', 'DBS', 'MA_TV', 'SMA_TV', 'MMDS', 'Broadband'] as const).map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-white cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={site.receptionTypes.includes(type)}
                        onChange={(e) => {
                          const updated = [...sitesEditData];
                          if (e.target.checked) {
                            updated[idx] = {
                              ...updated[idx],
                              receptionTypes: [...updated[idx].receptionTypes, type]
                            };
                          } else {
                            updated[idx] = {
                              ...updated[idx],
                              receptionTypes: updated[idx].receptionTypes.filter(t => t !== type)
                            };
                          }
                          setSitesEditData(updated);
                        }}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-sm text-gray-900 flex-1">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">TV Make</label>
                <input
                  type="text"
                  value={site.tvDetails.make || ''}
                  onChange={(e) => {
                    const updated = [...sitesEditData];
                    updated[idx] = {
                      ...updated[idx],
                      tvDetails: { ...updated[idx].tvDetails, make: e.target.value }
                    };
                    setSitesEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">HD Capable</label>
                <select
                  value={site.tvDetails.hdCapable !== undefined ? (site.tvDetails.hdCapable ? 'Yes' : 'No') : ''}
                  onChange={(e) => {
                    const updated = [...sitesEditData];
                    updated[idx] = {
                      ...updated[idx],
                      tvDetails: { ...updated[idx].tvDetails, hdCapable: e.target.value === 'Yes' }
                    };
                    setSitesEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Internet Status</label>
                <select
                  value={site.tvDetails.internetStatus || ''}
                  onChange={(e) => {
                    const updated = [...sitesEditData];
                    updated[idx] = {
                      ...updated[idx],
                      tvDetails: { ...updated[idx].tvDetails, internetStatus: e.target.value as any }
                    };
                    setSitesEditData(updated);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="">Select...</option>
                  <option value="Internet Enabled">Internet Enabled</option>
                  <option value="Internet Capable, but not Enabled">Internet Capable, but not Enabled</option>
                  <option value="Not Internet Capable">Not Internet Capable</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </SectionEditModal>

      {/* Devices Edit Modal */}
      <SectionEditModal
        isOpen={editingSection === 'devices'}
        title="Edit Personal Devices"
        onSave={handleDevicesEditSave}
        onCancel={() => setEditingSection(null)}
        onClose={() => setEditingSection(null)}
        onModalStateChange={onModalStateChange}
      >
        <div className="space-y-6">
          {devicesEditData.map((device, idx) => {
            const member = editedProfile.members.find(m => m.id === device.primaryUserId);
            return (
              <div key={device.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <h4 className="font-semibold text-gray-900">{member?.name}'s Device</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Device Name</label>
                  <input
                    type="text"
                    value={device.shortName}
                    onChange={(e) => {
                      const updated = [...devicesEditData];
                      updated[idx] = { ...updated[idx], shortName: e.target.value };
                      setDevicesEditData(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select
                    value={device.type}
                    onChange={(e) => {
                      const updated = [...devicesEditData];
                      updated[idx] = { ...updated[idx], type: e.target.value as any };
                      setDevicesEditData(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="Mobile Phone">Mobile Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Computer">Computer</option>
                  </select>
                </div>
                {device.provider && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Provider</label>
                    <select
                      value={device.provider}
                      onChange={(e) => {
                        const updated = [...devicesEditData];
                        updated[idx] = { ...updated[idx], provider: e.target.value as any };
                        setDevicesEditData(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="AT&T">AT&T</option>
                      <option value="Verizon Wireless">Verizon Wireless</option>
                      <option value="T-Mobile">T-Mobile</option>
                      <option value="Sprint">Sprint</option>
                      <option value="Other">Other</option>
                      <option value="Home WiFi">Home WiFi</option>
                    </select>
                  </div>
                )}
                {device.osType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">OS Type</label>
                    <select
                      value={device.osType}
                      onChange={(e) => {
                        const updated = [...devicesEditData];
                        updated[idx] = { ...updated[idx], osType: e.target.value as any };
                        setDevicesEditData(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="Android">Android</option>
                      <option value="iOS/Apple">iOS/Apple</option>
                      <option value="Windows">Windows</option>
                      <option value="macOS">macOS</option>
                      <option value="Linux">Linux</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                )}
                {device.homeWifi !== undefined && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Home WiFi</label>
                    <select
                      value={device.homeWifi ? 'Yes' : 'No'}
                      onChange={(e) => {
                        const updated = [...devicesEditData];
                        updated[idx] = { ...updated[idx], homeWifi: e.target.value === 'Yes' };
                        setDevicesEditData(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                )}
                {device.make && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Make</label>
                    <input
                      type="text"
                      value={device.make}
                      onChange={(e) => {
                        const updated = [...devicesEditData];
                        updated[idx] = { ...updated[idx], make: e.target.value };
                        setDevicesEditData(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionEditModal>

      {/* Warning Modal */}
      <HierarchyWarningModal
        warning={warning}
        onConfirm={handleWarningConfirm}
        onCancel={handleWarningCancel}
      />
    </div>
  );
}
