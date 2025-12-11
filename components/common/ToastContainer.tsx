import React, { useEffect } from 'react';
import { useUiStore } from '../../store/useUiStore';

export const ToastContainer: React.FC = () => {
  const toasts = useUiStore((state) => state.toasts);
  const removeToast = useUiStore((state) => state.removeToast);

  const getToastStyles = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  const getIcon = (type: 'success' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${getToastStyles(toast.type)}
            px-4 py-3 rounded-lg shadow-lg
            flex items-center gap-3 min-w-[300px] max-w-[400px]
            pointer-events-auto
            animate-slideIn
          `}
          role="alert"
        >
          <span className="text-xl font-bold">{getIcon(toast.type)}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="알림 닫기"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
