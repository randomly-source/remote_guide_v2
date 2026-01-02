import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  shortLabel?: string;
}

interface ProgressBarProps {
  sections: Section[];
  currentIndex: number;
  confirmedSections: Set<string>;
  onSectionClick?: (index: number) => void;
}

export function ProgressBar({
  sections,
  currentIndex,
  confirmedSections,
  onSectionClick
}: ProgressBarProps) {
  const totalSections = sections.length;
  const progressPercentage = ((currentIndex + 1) / totalSections) * 100;
  const confirmedCount = confirmedSections.size;

  return (
    <div className="w-full mb-6">
      {/* Progress Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentIndex + 1} of {totalSections}
          </span>
          <span className="text-sm text-gray-500">
            ({Math.round(progressPercentage)}%)
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {confirmedCount} of {totalSections} confirmed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Section Labels */}
      <div className="flex items-center justify-between mt-3">
        {sections.map((section, index) => {
          const isCurrent = index === currentIndex;
          const isCompleted = confirmedSections.has(section.id);
          const isPast = index < currentIndex;
          const isClickable = onSectionClick !== undefined;

          return (
            <div
              key={section.id}
              className="flex flex-col items-center gap-1 flex-1 cursor-pointer"
              onClick={() => isClickable && onSectionClick?.(index)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white scale-110'
                    : isCompleted
                    ? 'bg-green-500 text-white'
                    : isPast
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gray-200 text-gray-400'
                } ${isClickable && !isCurrent ? 'hover:scale-105 hover:shadow-md' : ''}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-xs text-center max-w-[60px] ${
                  isCurrent
                    ? 'font-semibold text-blue-600'
                    : isCompleted
                    ? 'font-medium text-green-600'
                    : 'text-gray-500'
                } ${isClickable && !isCurrent ? 'hover:text-gray-700' : ''}`}
              >
                {section.shortLabel || section.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
