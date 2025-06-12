
import { useState } from 'react';
import { Home, Card as CardIcon, Clock, Send, Settings, Bell } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary p-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-white">
            <h1 className="text-2xl font-bold">SecureBank</h1>
            <p className="text-white/80 text-sm">Welcome back, John</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white hover:bg-white/20"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 -mt-2">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-3 px-2 h-auto min-w-0 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
                <span className="text-xs">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
