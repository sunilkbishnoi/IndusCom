
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PriceChangeProps {
  amount: number;
  percentage: number;
  className?: string;
}

const PriceChange: React.FC<PriceChangeProps> = ({ amount, percentage, className }) => {
  const isPositive = amount >= 0;
  
  return (
    <div className={`${isPositive ? 'price-trend-positive' : 'price-trend-negative'} ${className}`}>
      {isPositive ? (
        <>
          <ArrowUp className="w-4 h-4 mr-1" />
          <span>+₹{amount.toFixed(2)} (+{percentage.toFixed(2)}%)</span>
        </>
      ) : (
        <>
          <ArrowDown className="w-4 h-4 mr-1" />
          <span>₹{amount.toFixed(2)} ({percentage.toFixed(2)}%)</span>
        </>
      )}
    </div>
  );
};

export default PriceChange;
