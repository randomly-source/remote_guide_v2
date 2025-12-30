import React from 'react';
import { Card } from './ui/Card';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
interface Milestone {
  id: string;
  label: string;
  status: 'complete' | 'current' | 'upcoming';
}
interface ProgressTrackerProps {
  milestones?: Milestone[];
  completionPercentage?: number;
}
export function ProgressTracker({
  milestones = [{
    id: '1',
    label: 'Equipment Received',
    status: 'complete'
  }, {
    id: '2',
    label: 'Initial Setup',
    status: 'current'
  }, {
    id: '3',
    label: 'Installation Call',
    status: 'upcoming'
  }, {
    id: '4',
    label: 'Start Measuring',
    status: 'upcoming'
  }],
  completionPercentage = 25
}: ProgressTrackerProps) {
  return <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Your Progress</h3>
        <span className="text-sm font-semibold text-[#4A90E2]">
          {completionPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] h-full transition-all duration-700 ease-out" style={{
        width: `${completionPercentage}%`
      }} />
      </div>

      {/* Milestones */}
      <div className="space-y-4">
        {milestones.map((milestone, idx) => {
        const isLast = idx === milestones.length - 1;
        return <div key={milestone.id} className="relative">
              <div className="flex items-center gap-3">
                {milestone.status === 'complete' ? <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" /> : milestone.status === 'current' ? <div className="w-6 h-6 rounded-full border-2 border-[#4A90E2] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#4A90E2]" />
                  </div> : <Circle className="w-6 h-6 text-gray-300 shrink-0" />}

                <span className={`text-sm font-medium ${milestone.status === 'complete' ? 'text-green-700' : milestone.status === 'current' ? 'text-[#4A90E2]' : 'text-gray-400'}`}>
                  {milestone.label}
                </span>
              </div>

              {!isLast && <div className="absolute left-3 top-6 w-0.5 h-6 bg-gray-200" />}
            </div>;
      })}
      </div>
    </Card>;
}