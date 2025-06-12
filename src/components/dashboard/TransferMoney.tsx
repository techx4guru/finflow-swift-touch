
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Users, Building, Smartphone, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TransferMoney = () => {
  const [transferType, setTransferType] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [memo, setMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const accounts = [
    { id: 'checking', name: 'Checking Account', balance: 12500.75, number: '****6789' },
    { id: 'savings', name: 'Savings Account', balance: 45000.00, number: '****4321' },
  ];

  const quickActions = [
    { id: 'internal', title: 'Internal Transfer', description: 'Between your accounts', icon: Users },
    { id: 'external', title: 'External Transfer', description: 'To other banks', icon: Building },
    { id: 'mobile', title: 'Mobile Top-up', description: 'Airtime & data', icon: Smartphone },
    { id: 'scheduled', title: 'Schedule Transfer', description: 'Set future transfers', icon: Calendar },
  ];

  const handleTransfer = async () => {
    if (!transferType || !amount || !fromAccount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate transfer process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Transfer Successful",
      description: `$${amount} has been transferred successfully`,
    });

    // Reset form
    setAmount('');
    setRecipient('');
    setMemo('');
    setIsLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-4 pb-20 space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="gradient-primary text-white border-0">
        <CardHeader>
          <CardTitle className="text-white">Transfer Money</CardTitle>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card 
              key={action.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                transferType === action.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => setTransferType(action.id)}
            >
              <CardContent className="p-4 text-center">
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                  transferType === action.id ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <h3 className="font-medium text-sm">{action.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transfer Form */}
      {transferType && (
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="w-5 h-5 mr-2" />
              {quickActions.find(a => a.id === transferType)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Account */}
            <div>
              <Label htmlFor="from-account">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex justify-between w-full">
                        <span>{account.name} {account.number}</span>
                        <span className="text-muted-foreground ml-4">
                          {formatCurrency(account.balance)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Recipient */}
            {transferType !== 'internal' && (
              <div>
                <Label htmlFor="recipient">
                  {transferType === 'mobile' ? 'Phone Number' : 'Recipient'}
                </Label>
                <Input
                  id="recipient"
                  placeholder={
                    transferType === 'mobile' 
                      ? '+1 (555) 123-4567' 
                      : transferType === 'external'
                      ? 'Account number or email'
                      : 'Enter recipient details'
                  }
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            )}

            {/* To Account (Internal Transfer) */}
            {transferType === 'internal' && (
              <div>
                <Label htmlFor="to-account">To Account</Label>
                <Select value={recipient} onValueChange={setRecipient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.filter(account => account.id !== fromAccount).map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} {account.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Memo */}
            <div>
              <Label htmlFor="memo">Memo (Optional)</Label>
              <Input
                id="memo"
                placeholder="What's this for?"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            {/* Transfer Summary */}
            {amount && fromAccount && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Transfer Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transfer Fee:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transfer Button */}
            <Button 
              onClick={handleTransfer} 
              disabled={isLoading}
              className="w-full h-12"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send ${amount || '0.00'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TransferMoney;
