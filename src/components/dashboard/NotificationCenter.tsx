import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Clock, Shield, CreditCard as CardIcon, Send } from 'lucide-react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Transaction Alert',
      message: 'Purchase at Starbucks Coffee for $4.50',
      type: 'transaction',
      time: '2 minutes ago',
      isRead: false,
      icon: Send
    },
    {
      id: 2,
      title: 'Security Alert',
      message: 'New device login detected from iPhone 14',
      type: 'security',
      time: '1 hour ago',
      isRead: false,
      icon: Shield
    },
    {
      id: 3,
      title: 'Card Update',
      message: 'Your card spending limit has been updated',
      type: 'card',
      time: '3 hours ago',
      isRead: true,
      icon: CardIcon
    },
    {
      id: 4,
      title: 'Payment Reminder',
      message: 'Credit card payment due in 3 days',
      type: 'reminder',
      time: '1 day ago',
      isRead: false,
      icon: Clock
    },
    {
      id: 5,
      title: 'Transaction Alert',
      message: 'Salary deposit of $3,200.00 received',
      type: 'transaction',
      time: '2 days ago',
      isRead: true,
      icon: Send
    },
    {
      id: 6,
      title: 'Security Alert',
      message: 'Password changed successfully',
      type: 'security',
      time: '3 days ago',
      isRead: true,
      icon: Shield
    }
  ]);

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'card':
        return 'bg-purple-100 text-purple-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColor = (type: string, isRead: boolean) => {
    if (isRead) return 'text-muted-foreground';
    
    switch (type) {
      case 'transaction':
        return 'text-blue-600';
      case 'security':
        return 'text-red-600';
      case 'card':
        return 'text-purple-600';
      case 'reminder':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="px-3 sm:px-4 pt-3 pb-24 space-y-4 sm:space-y-6 animate-fade-in max-w-md mx-auto">
      {/* Header - Mobile optimized */}
      <Card className="gradient-primary text-white border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center text-lg">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white text-primary text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Mark All as Read */}
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="text-xs">
            <Check className="w-3 h-3 mr-1" />
            Mark all as read
          </Button>
        </div>
      )}

      {/* Notifications List - Mobile optimized */}
      <div className="space-y-2">
        {notifications.map((notification, index) => {
          const IconComponent = notification.icon;
          
          return (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-all hover:shadow-md animate-slide-up ${
                !notification.isRead ? 'ring-1 ring-primary/20 border-primary/20' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notification.isRead ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <IconComponent className={`w-5 h-5 ${getIconColor(notification.type, notification.isRead)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium text-sm ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`text-xs ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'} mb-2 leading-relaxed`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`${getNotificationColor(notification.type)} text-xs`}>
                        {notification.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-medium mb-2 text-sm">No notifications</h3>
            <p className="text-muted-foreground text-xs">
              You're all caught up! We'll notify you when something important happens.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings - Mobile optimized */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full text-xs">
              Transaction Alerts
            </Button>
            <Button variant="outline" className="w-full text-xs">
              Security Alerts
            </Button>
            <Button variant="outline" className="w-full text-xs">
              Payment Reminders
            </Button>
            <Button variant="outline" className="w-full text-xs">
              Account Updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
