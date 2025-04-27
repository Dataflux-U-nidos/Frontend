import React, { useEffect } from "react";

export interface NotificationData {
  type: 'success' | 'error';
  title: string;
  message: string;
}

export interface NotificationProps {
  notification: NotificationData;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const isSuccess = notification.type === 'success';

  // auto-cerrar tras 5s
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 w-80 shadow-lg rounded-md overflow-hidden">
      <div className={`p-4 ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="flex justify-between items-start">
          <div className="flex">
            <div
              className={`mr-3 flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${
                isSuccess ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {isSuccess ? (
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`text-lg font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                {notification.title}
              </h3>
              <div className={`mt-1 text-sm ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                {notification.message}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`ml-4 inline-flex text-gray-400 hover:${
              isSuccess ? 'text-green-600' : 'text-red-600'
            } focus:outline-none`}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: '100%', animation: 'progress-bar 5s linear forwards' }}
          />
        </div>
        <style>
          {`
            @keyframes progress-bar {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}
        </style>
      </div>
    </div>
  );
};
