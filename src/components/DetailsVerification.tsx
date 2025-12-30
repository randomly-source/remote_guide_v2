import React from 'react';
import { Card } from './ui/Card';
import { CheckCircle2, Edit3, Users, Home as HomeIcon, Tv } from 'lucide-react';
import { Button } from './ui/Button';
interface HouseholdDetails {
  address: string;
  members: number;
  tvs: number;
  primaryContact: string;
}
interface DetailsVerificationProps {
  details?: HouseholdDetails;
  onEdit?: () => void;
}
export function DetailsVerification({
  details = {
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    members: 4,
    tvs: 2,
    primaryContact: 'John Smith'
  },
  onEdit
}: DetailsVerificationProps) {
  const items = [{
    icon: HomeIcon,
    label: 'Home Address',
    value: details.address
  }, {
    icon: Users,
    label: 'Household Members',
    value: `${details.members} people`
  }, {
    icon: Tv,
    label: 'TVs to Monitor',
    value: `${details.tvs} television${details.tvs > 1 ? 's' : ''}`
  }];
  return <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Verify Your Details
        </h2>
        <CheckCircle2 className="w-6 h-6 text-green-600" />
      </div>

      <p className="text-sm text-gray-600 mb-6">
        We collected this information during your recruitment. Please confirm
        everything looks correct.
      </p>

      <div className="space-y-3">
        {items.map((item, idx) => {
        const Icon = item.icon;
        return <Card key={idx} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {item.value}
                </p>
              </div>
            </Card>;
      })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-700 mb-3">
          <strong className="text-gray-900">Primary Contact:</strong>{' '}
          {details.primaryContact}
        </p>
        <Button variant="secondary" fullWidth onClick={onEdit} className="text-sm">
          <Edit3 className="w-4 h-4 mr-2" />
          Update Information
        </Button>
      </div>
    </div>;
}