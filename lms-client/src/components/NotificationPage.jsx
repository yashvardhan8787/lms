import React from 'react';

const NotificationPage = () => {
  const notifications = [
    { id: 1, message: "Your course has been updated.", type: "info" },
    { id: 2, message: "You have a new message from your instructor.", type: "success" },
    { id: 3, message: "Your subscription is about to expire.", type: "warning" },
    { id: 4, message: "Failed to process your payment.", type: "error" },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Notifications</h1>
      
      <div className="max-w-3xl mx-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className={`p-4 mb-4 rounded-lg ${getNotificationStyle(notification.type)}`}>
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notifications at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
