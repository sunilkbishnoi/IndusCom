
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { SteelCategory } from '../types';
import StockAlert from './StockAlert';

interface CategoryCardProps {
  category: SteelCategory;
  price: number;
  priceChange: {
    amount: number;
    percentage: number;
  };
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  price, 
  priceChange,
  onClick
}) => {
  const isPositive = priceChange.amount >= 0;

  return (
    <div 
      className="bg-steel-card rounded-xl p-3 flex flex-col hover:bg-steel-highlight cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded flex items-center justify-center mr-2 ${isPositive ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
            {isPositive ? (
              <ArrowUp className="w-5 h-5 text-steel-positive" />
            ) : (
              <ArrowDown className="w-5 h-5 text-steel-negative" />
            )}
          </div>
          <div className="text-sm font-medium">{category}</div>
        </div>
        <StockAlert 
          productId={`category-${category}`} 
          productName={category} 
          isInWatchlist={category === "Stainless Steel" || category === "Carbon Steel"}
        />
      </div>
      <div className="text-xl font-bold">
        ₹{price.toLocaleString('en-IN', { 
          maximumFractionDigits: 2,
          minimumFractionDigits: 2 
        })}
        <span className="text-xs text-gray-400 ml-1">per Ton</span>
      </div>
    </div>
  );
};

export default CategoryCard;
