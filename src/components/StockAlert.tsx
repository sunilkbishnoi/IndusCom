
import React, { useState } from 'react';
import { Bell, BellOff, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface StockAlertProps {
  productId: string;
  productName: string;
  isInWatchlist?: boolean;
}

const StockAlert: React.FC<StockAlertProps> = ({ 
  productId, 
  productName, 
  isInWatchlist = false 
}) => {
  const [isWatching, setIsWatching] = useState(isInWatchlist);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleToggleWatch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsWatching(!isWatching);
    
    if (!isWatching) {
      toast.success(`Added to watchlist`, {
        description: `You will receive price alerts for ${productName}`,
      });
    } else {
      toast.success(`Removed from watchlist`, {
        description: `You will no longer receive price alerts for ${productName}`,
      });
    }
  };

  const handleSetPriceAlert = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsAlertOpen(!isAlertOpen);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={handleToggleWatch}
        className="p-1 rounded-full hover:bg-steel-highlight transition-colors"
        title={isWatching ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isWatching ? (
          <BellOff size={18} className="text-steel-positive" />
        ) : (
          <Bell size={18} className="text-gray-400" />
        )}
      </button>
      
      {isWatching && (
        <div className="relative">
          <button 
            onClick={handleSetPriceAlert}
            className="p-1 rounded-full hover:bg-steel-highlight transition-colors"
            title="Set price alert"
          >
            <AlertTriangle size={18} className="text-amber-400" />
          </button>
          
          {isAlertOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg bg-steel-card shadow-lg border border-gray-800">
              <div className="p-3">
                <h4 className="font-medium mb-2">Set Price Alert</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Price threshold</label>
                    <input 
                      type="number" 
                      className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-1 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive text-sm"
                      placeholder="Enter price threshold"
                    />
                  </div>
                  <div className="pt-2">
                    <button 
                      className="w-full bg-steel-positive text-black font-medium py-1 px-2 rounded flex items-center justify-center gap-1 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAlertOpen(false);
                        toast.success("Price alert set", {
                          description: `You will be notified when price changes significantly`
                        });
                      }}
                    >
                      <Check size={16} />
                      Set Alert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockAlert;
