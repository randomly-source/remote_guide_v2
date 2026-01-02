import { HouseholdProfile, HouseholdMember, Site, PersonalDevice, ReceptionType, InternetStatus, OSType, DeviceProvider } from '../types/household';

/**
 * Default/mock household profile data based on user_profile.md
 * This serves as the initial data structure for the confirmation UI
 */
export function getDefaultHouseholdProfile(): HouseholdProfile {
  return {
    address: '123 Maple Street, Springfield, OH 45501',
    householdComposition: 4,
    totalTelevisions: 2,
    members: [
      {
        id: 'member-1',
        name: 'John Smith',
        age: 42,
        sex: 'Male',
        primaryRoles: 'Primary User: Work Laptop, S24 Phone'
      },
      {
        id: 'member-2',
        name: 'Mary Smith',
        age: 40,
        sex: 'Female',
        primaryRoles: 'Primary User: iPhone, Tablet'
      },
      {
        id: 'member-3',
        name: 'Alex Smith',
        age: 12,
        sex: 'Male',
        primaryRoles: 'Student / Gamer'
      },
      {
        id: 'member-4',
        name: 'Sarah Smith',
        age: 8,
        sex: 'Female',
        primaryRoles: 'Student'
      }
    ],
    sites: [
      {
        id: 'site-1',
        label: 'Family Hub (Living Room)',
        metered: true,
        receptionTypes: ['Cable', 'Broadband'],
        tvDetails: {
          make: 'Sony',
          isCombo: false,
          hdCapable: true,
          internetStatus: 'Internet Enabled'
        },
        connectedDevices: {
          setTopBox: {
            present: true,
            make: 'Motorola',
            hdCapable: true,
            dvrCapable: true
          },
          streamingDevice: {
            present: true,
            device: 'Apple TV',
            internetEnabled: true
          },
          gameSystem: {
            present: true,
            device: 'Nintendo Switch'
          },
          physicalConnections: false
        }
      },
      {
        id: 'site-2',
        label: 'Nano line (Bedroom)',
        metered: true,
        receptionTypes: ['Cable', 'Broadband'],
        tvDetails: {
          make: 'Samsung',
          hdCapable: true,
          internetStatus: 'Internet Enabled'
        },
        connectedDevices: {
          setTopBox: {
            present: true,
            make: 'Cisco'
          },
          streamingDevice: {
            present: true,
            device: 'Roku Stick',
            internetEnabled: true
          },
          headphoneUsage: {
            used: true,
            cutsOffSpeakers: true,
            usedForStreaming: true
          }
        }
      }
    ],
    personalDevices: [
      {
        id: 'device-1',
        shortName: "John's S24",
        type: 'Mobile Phone',
        provider: 'AT&T',
        osType: 'Android',
        primaryUserId: 'member-1',
        homeWifi: true
      },
      {
        id: 'device-2',
        shortName: "Mary's iPhone",
        type: 'Mobile Phone',
        provider: 'Verizon Wireless',
        osType: 'iOS/Apple',
        primaryUserId: 'member-2',
        homeWifi: true
      },
      {
        id: 'device-3',
        shortName: "Mary's Tablet",
        type: 'Tablet',
        provider: 'Other',
        osType: 'iOS/Apple',
        primaryUserId: 'member-2',
        homeWifi: true
      },
      {
        id: 'device-4',
        shortName: 'Work Laptop',
        type: 'Computer',
        primaryUserId: 'member-1',
        make: 'Alienware',
        internetType: 'High-Speed (DSL/Cable)',
        workRelated: true
      }
    ],
    consent: {
      householdAgreement: true,
      mappingAgreement: true,
      mappingMethod: 'Panelist Mapping'
    },
    primaryContact: 'John Smith'
  };
}

/**
 * Helper function to create a new unique ID
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate that the profile data is consistent
 * (e.g., number of sites matches total TVs, members referenced in devices exist)
 */
export function validateProfile(profile: HouseholdProfile): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (profile.sites.length > profile.totalTelevisions) {
    errors.push(`Number of sites (${profile.sites.length}) exceeds total televisions (${profile.totalTelevisions})`);
  }

  // Check that all personal devices reference valid members
  const memberIds = new Set(profile.members.map(m => m.id));
  profile.personalDevices.forEach(device => {
    if (!memberIds.has(device.primaryUserId)) {
      errors.push(`Device "${device.shortName}" references non-existent member`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

