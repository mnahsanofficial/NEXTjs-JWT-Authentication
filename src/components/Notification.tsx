import React from 'react';
import { useNotification } from '../context/NotificationContext';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`relative transform transition-all duration-300 ease-in-out ${
            notifications.includes(notification) ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div
            className={`w-80 p-4 rounded-lg shadow-lg flex items-start ${
              notification.type === 'success'
                ? 'bg-green-50 border-l-4 border-green-500'
                : notification.type === 'error'
                ? 'bg-red-50 border-l-4 border-red-500'
                : 'bg-blue-50 border-l-4 border-blue-500'
            }`}
          >
           
            <div className="ml-3 flex-1">
              <p
                className={`text-sm font-medium ${
                  notification.type === 'success'
                    ? 'text-green-800'
                    : notification.type === 'error'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}
              >
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};