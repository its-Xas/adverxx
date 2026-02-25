import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
  title?: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  message, 
  onClose, 
  title = 'Success' 
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 max-w-md w-full mx-auto animate-fadeInUp">
      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 backdrop-blur-xl border border-green-500/30 rounded-xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-inter font-semibold text-green-400 mb-1">
              {title}
            </h4>
            <p className="text-antique-300 text-sm font-inter leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};