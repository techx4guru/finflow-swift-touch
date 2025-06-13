
import { useState } from 'react';
import { Home, CreditCard as CardIcon, Clock, Send, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AccountOverview from './AccountOverview';
import TransactionHistory from './TransactionHistory';
import TransferMoney from './TransferMoney';
import CardManagement from './CardManagement';
import NotificationCenter from './NotificationCenter';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'transactions', label: 'History', icon: Clock },
    { id: 'transfer', label: 'Transfer', icon: Send },
    { id: 'cards', label: 'Cards', icon: CardIcon },
    { id: 'notifications', label: 'Alerts', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AccountOverview />;
      case 'transactions':
        return <TransactionHistory />;
      case 'transfer':
        return <TransferMoney />;
      case 'cards':
        return <CardManagement />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header - Mobile optimized */}
      <header className="gradient-primary px-4 py-3 pb-4 safe-area-top">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-xl sm:text-2xl font-bold">SecureBank</h1>
            <p className="text-white/80 text-xs sm:text-sm">Welcome back, John</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20 p-2"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content - Flexible container */}
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Mobile optimized */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around py-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-1 h-auto min-w-0 flex-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className="text-xs leading-tight">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
