import React from 'react';
import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

interface NotificationContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onRemove,
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-3 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {notification.type === 'success' ? (
            <SuccessMessage
              message={notification.message}
              title={notification.title}
              onClose={() => onRemove(notification.id)}
            />
          ) : (
            <ErrorMessage
              message={notification.message}
              type={notification.type}
              onClose={() => onRemove(notification.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};