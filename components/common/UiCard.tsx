import React from 'react';

interface UiCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'bordered' | 'elevated';
}

export const UiCard: React.FC<UiCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'default'
}) => {
  const baseStyles = 'bg-white rounded-2xl transition-shadow';
  
  const variantStyles = {
    default: 'p-6 shadow-sm border border-gray-100',
    bordered: 'p-6 border-2 border-gray-200',
    elevated: 'p-6 shadow-lg hover:shadow-xl',
  };

  const interactiveStyles = onClick 
    ? 'cursor-pointer hover:shadow-md' 
    : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`;

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  ) : (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};
