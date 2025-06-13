import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Lock, Unlock, Settings, CreditCard as CardIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CardManagement = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const { toast } = useToast();

  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'SecureBank Visa',
      type: 'Debit',
      number: '4532 **** **** 6789',
      fullNumber: '4532 1234 5678 6789',
      expiryDate: '12/27',
      cvv: '123',
      status: 'active',
      isBlocked: false,
      spendingLimit: 2500,
      balance: 12500.75
    },
    {
      id: 2,
      name: 'SecureBank Mastercard',
      type: 'Credit',
      number: '5555 **** **** 4321',
      fullNumber: '5555 1234 5678 4321',
      expiryDate: '09/26',
      cvv: '456',
      status: 'active',
      isBlocked: false,
      spendingLimit: 5000,
      balance: 1250.30
    }
  ]);

  const toggleCardStatus = (cardId: number) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, isBlocked: !card.isBlocked }
        : card
    ));

    const card = cards.find(c => c.id === cardId);
    toast({
      title: card?.isBlocked ? "Card Unblocked" : "Card Blocked",
      description: card?.isBlocked 
        ? "Your card has been unblocked and is ready to use"
        : "Your card has been blocked for security",
    });
  };

  const updateSpendingLimit = (cardId: number, newLimit: number) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, spendingLimit: newLimit }
        : card
    ));

    toast({
      title: "Spending Limit Updated",
      description: `Daily spending limit set to $${newLimit}`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="px-3 sm:px-4 pt-3 pb-24 space-y-4 sm:space-y-6 animate-fade-in max-w-md mx-auto">
      {/* Header - Mobile optimized */}
      <Card className="gradient-primary text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center text-lg">
            <CardIcon className="w-5 h-5 mr-2" />
            Card Management
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Cards List - Mobile optimized */}
      <div className="space-y-4">
        {cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            {/* Card Visual - Mobile optimized */}
            <div className={`p-4 text-white relative overflow-hidden ${
              card.type === 'Credit' ? 'gradient-success' : 'gradient-primary'
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-white/80 text-xs">{card.name}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {card.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs">Balance</p>
                    <p className="text-lg font-bold">{formatCurrency(card.balance)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-lg font-mono tracking-wider">
                    {showCardDetails ? card.fullNumber : card.number}
                  </p>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-xs">EXPIRES</p>
                      <p className="font-medium text-sm">{card.expiryDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs">CVV</p>
                      <p className="font-medium text-sm">
                        {showCardDetails ? card.cvv : '***'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCardDetails(!showCardDetails)}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      {showCardDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Controls - Mobile optimized */}
            <CardContent className="p-4 space-y-4">
              {/* Status and Quick Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    card.isBlocked ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium text-sm">
                    {card.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>
                <Button
                  variant={card.isBlocked ? "default" : "destructive"}
                  size="sm"
                  onClick={() => toggleCardStatus(card.id)}
                  className="text-xs"
                >
                  {card.isBlocked ? (
                    <>
                      <Unlock className="w-3 h-3 mr-1" />
                      Unblock
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 mr-1" />
                      Block
                    </>
                  )}
                </Button>
              </div>

              {/* Spending Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`limit-${card.id}`} className="text-sm">Daily Spending Limit</Label>
                  <span className="text-xs text-muted-foreground">
                    {formatCurrency(card.spendingLimit)}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id={`limit-${card.id}`}
                    type="number"
                    placeholder="Enter new limit"
                    className="flex-1 text-sm"
                  />
                  <Button 
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(`limit-${card.id}`) as HTMLInputElement;
                      const newLimit = parseFloat(input.value);
                      if (newLimit && newLimit > 0) {
                        updateSpendingLimit(card.id, newLimit);
                        input.value = '';
                      }
                    }}
                    className="text-xs"
                  >
                    Update
                  </Button>
                </div>
              </div>

              {/* Card Settings */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center text-sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Card Settings
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`notifications-${card.id}`} className="text-sm">Transaction Notifications</Label>
                    <Switch id={`notifications-${card.id}`} defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`international-${card.id}`} className="text-sm">International Transactions</Label>
                    <Switch id={`international-${card.id}`} defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`online-${card.id}`} className="text-sm">Online Purchases</Label>
                    <Switch id={`online-${card.id}`} defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`contactless-${card.id}`} className="text-sm">Contactless Payments</Label>
                    <Switch id={`contactless-${card.id}`} defaultChecked />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" className="w-full text-xs">
                  Replace Card
                </Button>
                <Button variant="outline" className="w-full text-xs">
                  View Statements
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Card - Mobile optimized */}
      <Card className="border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
        <CardContent className="p-6 text-center">
          <CardIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <h3 className="font-medium mb-2 text-sm">Add New Card</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Apply for a new debit or credit card
          </p>
          <Button variant="outline" className="text-xs">Apply Now</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardManagement;
