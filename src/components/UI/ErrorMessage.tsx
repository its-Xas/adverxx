import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
  type?: 'error' | 'warning' | 'info';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onClose, 
  type = 'error' 
}) => {
  const getStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500/10 to-red-600/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          icon: 'text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          icon: 'text-yellow-400'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: 'text-blue-400'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-red-500/10 to-red-600/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          icon: 'text-red-400'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`fixed top-6 right-6 z-50 max-w-md w-full mx-auto animate-fadeInUp`}>
      <div className={`${styles.bg} backdrop-blur-xl border ${styles.border} rounded-xl p-4 shadow-2xl`}>
        <div className="flex items-start gap-3">
          <AlertCircle className={`h-5 w-5 ${styles.icon} mt-0.5 flex-shrink-0`} />
          <div className="flex-1">
            <h4 className={`font-inter font-semibold ${styles.text} mb-1`}>
              {type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Information'}
            </h4>
            <p className="text-antique-300 text-sm font-inter leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`${styles.text} hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};