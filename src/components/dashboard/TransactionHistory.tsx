
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, Search, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('30days');

  const [transactions] = useState([
    { id: 1, description: 'Starbucks Coffee', amount: -4.50, type: 'debit', category: 'Food & Dining', date: '2025-06-12', time: '08:30 AM' },
    { id: 2, description: 'Salary Deposit', amount: 3200.00, type: 'credit', category: 'Income', date: '2025-06-11', time: '09:00 AM' },
    { id: 3, description: 'Amazon Purchase', amount: -67.89, type: 'debit', category: 'Shopping', date: '2025-06-10', time: '02:15 PM' },
    { id: 4, description: 'ATM Withdrawal', amount: -100.00, type: 'debit', category: 'Cash', date: '2025-06-10', time: '11:45 AM' },
    { id: 5, description: 'Netflix Subscription', amount: -15.99, type: 'debit', category: 'Entertainment', date: '2025-06-09', time: '06:00 PM' },
    { id: 6, description: 'Freelance Payment', amount: 750.00, type: 'credit', category: 'Income', date: '2025-06-08', time: '03:30 PM' },
    { id: 7, description: 'Grocery Store', amount: -89.45, type: 'debit', category: 'Food & Dining', date: '2025-06-07', time: '05:20 PM' },
    { id: 8, description: 'Gas Station', amount: -45.60, type: 'debit', category: 'Transportation', date: '2025-06-06', time: '07:45 AM' }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const categoryColors = {
    'Food & Dining': 'bg-orange-100 text-orange-800',
    'Income': 'bg-green-100 text-green-800',
    'Shopping': 'bg-blue-100 text-blue-800',
    'Cash': 'bg-gray-100 text-gray-800',
    'Entertainment': 'bg-purple-100 text-purple-800',
    'Transportation': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="px-3 sm:px-4 pt-3 pb-24 space-y-4 sm:space-y-6 animate-fade-in max-w-md mx-auto">
      {/* Header - Mobile optimized */}
      <Card className="gradient-primary text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Transaction History</CardTitle>
        </CardHeader>
      </Card>

      {/* Filters - Mobile optimized */}
      <Card>
        <CardContent className="p-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credits</SelectItem>
                <SelectItem value="debit">Debits</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List - Mobile optimized */}
      <div className="space-y-2">
        {filteredTransactions.map((transaction, index) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow animate-slide-up" 
                style={{ animationDelay: `${index * 0.05}s` }}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDown className="w-5 h-5" /> : 
                      <ArrowUp className="w-5 h-5" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className={`text-xs ${categoryColors[transaction.category as keyof typeof categoryColors]}`}>
                        {transaction.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {transaction.date} at {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className={`font-bold text-sm ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm">No transactions found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransactionHistory;
