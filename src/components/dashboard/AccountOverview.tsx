
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
    <div className="p-4 pb-20 space-y-6 animate-fade-in">
      {/* Total Balance Card */}
      <Card className="gradient-primary text-white border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-white/80">Total Balance</CardDescription>
              <CardTitle className="text-3xl font-bold">
                {showBalance ? formatCurrency(totalBalance) : '••••••'}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20"
            >
              {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mt-4">
            <Button variant="secondary" size="sm" className="flex-1">
              <ArrowUp className="w-4 h-4 mr-2" />
              Send
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <ArrowDown className="w-4 h-4 mr-2" />
              Request
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Money
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Your Accounts</h2>
        {accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">
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

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDown className="w-5 h-5" /> : 
                      <ArrowUp className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
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
