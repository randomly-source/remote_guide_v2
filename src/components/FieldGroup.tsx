import React from 'react';

interface FieldGroupProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldGroup({ title, children, className = '' }: FieldGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h4>
      )}
      <div className="space-y-2.5">
        {children}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number | boolean | null | undefined;
  className?: string;
  formatValue?: (value: any) => string;
}

export function Field({ label, value, className = '', formatValue }: FieldProps) {
  const displayValue = formatValue 
    ? formatValue(value)
    : value === null || value === undefined 
      ? 'Not set'
      : String(value);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <p className="text-sm font-medium text-gray-900">
        {displayValue}
      </p>
    </div>
  );
}

interface FieldRowProps {
  label: string;
  value: string | number | boolean | null | undefined;
  className?: string;
  formatValue?: (value: any) => string;
}

export function FieldRow({ label, value, className = '', formatValue }: FieldRowProps) {
  const displayValue = formatValue 
    ? formatValue(value)
    : value === null || value === undefined 
      ? 'Not set'
      : String(value);

  return (
    <div className={`flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0 ${className}`}>
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wider shrink-0">
        {label}
      </label>
      <p className="text-sm font-medium text-gray-900 text-right">
        {displayValue}
      </p>
    </div>
  );
}

