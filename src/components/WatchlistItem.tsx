
import React from 'react';
import { WatchlistItem as WatchlistItemType } from '../types';
import PriceChange from './PriceChange';
import { Bell, BellOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface WatchlistItemProps {
  item: WatchlistItemType;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ item }) => {
  const handleRemoveFromWatchlist = () => {
    toast.success("Item removed from watchlist", {
      description: `${item.category} has been removed from your watchlist`
    });
  };

  const handleSetPriceAlert = () => {
    toast.success("Price alert set", {
      description: `You'll be notified when ${item.category} price changes significantly`
    });
  };

  return (
    <div className="bg-steel-card rounded-xl p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold">{item.category}</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleSetPriceAlert}
            className="p-1.5 bg-amber-400/20 rounded-full"
            title="Set price alert"
          >
            <AlertTriangle size={16} className="text-amber-400" />
          </button>
          <button 
            onClick={handleRemoveFromWatchlist}
            className="p-1.5 bg-steel-positive/20 rounded-full"
            title="Remove from watchlist"
          >
            <BellOff size={16} className="text-steel-positive" />
          </button>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <span className="text-2xl font-bold">
            ₹{item.price.toLocaleString('en-IN', { 
              maximumFractionDigits: 2,
              minimumFractionDigits: 2 
            })}
          </span>
          <span className="text-xs text-gray-400 block">per Ton</span>
        </div>
        <PriceChange 
          amount={item.priceChange.amount} 
          percentage={item.priceChange.percentage}
        />
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-steel-highlight hover:bg-steel-highlight/80 text-xs py-1 rounded-lg text-center">
            Volume History
          </button>
          <button className="bg-steel-highlight hover:bg-steel-highlight/80 text-xs py-1 rounded-lg text-center">
            View Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
