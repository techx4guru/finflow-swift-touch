
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AccountOverview = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [accounts] = useState([
    {
      id: 1,
      name: 'Checking Account',
      type: 'checking',
      balance: 12500.75,
      accountNumber: '****6789',
      currency: 'USD'
    },
    {
      id: 2,
      name: 'Savings Account',
      type: 'savings',
      balance: 45000.00,
      accountNumber: '****4321',
      currency: 'USD'
    },
    {
      id: 3,
      name: 'Investment Account',
      type: 'investment',
      balance: 78950.25,
      accountNumber: '****9876',
      currency: 'USD'
    }
  ]);

  const [recentTransactions] = useState([
    { id: 1, description: 'Starbucks Coffee', amount: -4.50, type: 'debit', date: '2025-06-12' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, type: 'credit', date: '2025-06-11' },
    { id: 3, description: 'Amazon Purchase', amount: -67.89, type: 'debit', date: '2025-06-10' },
    { id: 4, description: 'ATM Withdrawal', amount: -100.00, type: 'debit', date: '2025-06-10' }
  ]);

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="px-3 sm:px-4 pt-3 pb-24 space-y-4 sm:space-y-6 animate-fade-in max-w-md mx-auto">
      {/* Total Balance Card - Mobile optimized */}
      <Card className="gradient-primary text-white border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-white/80 text-sm">Total Balance</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl font-bold">
                {showBalance ? formatCurrency(totalBalance) : '••••••'}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20 p-2"
            >
              {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-2 mt-3">
            <Button variant="secondary" size="sm" className="text-xs py-2">
              <ArrowUp className="w-3 h-3 mr-1" />
              Send
            </Button>
            <Button variant="secondary" size="sm" className="text-xs py-2">
              <ArrowDown className="w-3 h-3 mr-1" />
              Request
            </Button>
            <Button variant="secondary" size="sm" className="text-xs py-2">
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accounts List - Mobile optimized */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground px-1">Your Accounts</h2>
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground text-sm truncate">{account.name}</h3>
                  <p className="text-xs text-muted-foreground">{account.accountNumber}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-semibold text-foreground text-sm">
                    {showBalance ? formatCurrency(account.balance) : '••••••'}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {account.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions - Mobile optimized */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold text-foreground">Recent</h2>
          <Button variant="ghost" size="sm" className="text-xs">View All</Button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDown className="w-4 h-4" /> : 
                      <ArrowUp className="w-4 h-4" />
                    }
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold text-sm ml-2 ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
