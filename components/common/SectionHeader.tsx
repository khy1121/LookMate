import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionSlot?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  actionSlot,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>
        {actionSlot && (
          <div className="flex-shrink-0">
            {actionSlot}
          </div>
        )}
      </div>
    </div>
  );
};
