import React from 'react';

interface TagBadgeProps {
  label: string;
  variant?: 'default' | 'outline' | 'primary' | 'success';
  className?: string;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ 
  label, 
  variant = 'default',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-600',
    outline: 'bg-white border border-gray-300 text-gray-700',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-green-100 text-green-700',
  };

  return (
    <span 
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};
