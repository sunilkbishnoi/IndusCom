
import React, { useState } from 'react';
import { ArrowLeft, Plus, X, Bell, AlertTriangle, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { toast } from 'sonner';
import { watchlistItems, steelCategories } from '../data/mockData';
import { SteelCategory } from '../types';

const WatchlistPage = () => {
  const [priceThreshold, setPriceThreshold] = useState<Record<string, number>>({});
  const [alertType, setAlertType] = useState<Record<string, 'increase' | 'decrease' | 'both'>>({});
  const [showAlertSettings, setShowAlertSettings] = useState<Record<string, boolean>>({});

  const handleRemoveFromWatchlist = (id: string, category: string) => {
    toast.success("Item removed from watchlist", {
      description: `${category} has been removed from your watchlist`
    });
  };

  const handleAddToWatchlist = (category: string) => {
    toast.success("Item added to watchlist", {
      description: `${category} has been added to your watchlist`
    });
  };

  const handleSetPriceAlert = (id: string, category: string) => {
    // Toggle alert settings panel
    setShowAlertSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    if (showAlertSettings[id]) {
      toast.success("Price alert settings saved", {
        description: `You'll be notified about ${category} price changes`
      });
    }
  };

  const handleSaveAlert = (id: string, category: string) => {
    setShowAlertSettings(prev => ({
      ...prev,
      [id]: false
    }));
    
    toast.success("Price alert set", {
      description: `You'll be notified when ${category} price ${alertType[id] === 'increase' ? 'increases' : alertType[id] === 'decrease' ? 'decreases' : 'changes'} by ${priceThreshold[id] || 5}%`
    });
  };

  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      {/* Header */}
      <div className="p-4 flex items-center border-b border-gray-800">
        <Link to="/" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Manage Watchlist</h1>
      </div>
      
      {/* Watchlist Items */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Your Watchlist</h2>
        
        {watchlistItems.map(item => (
          <div key={item.id} className="bg-steel-card rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold">{item.category}</div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleSetPriceAlert(item.id, item.category)}
                  className="p-1.5 bg-amber-400/20 rounded-full"
                  title="Set price alert"
                >
                  <AlertTriangle size={16} className="text-amber-400" />
                </button>
                <button
                  className="p-1.5 bg-blue-400/20 rounded-full"
                  title="View price chart"
                >
                  <LineChart size={16} className="text-blue-400" />
                </button>
                <button 
                  onClick={() => handleRemoveFromWatchlist(item.id, item.category)}
                  className="p-1.5 bg-gray-600/20 rounded-full"
                  title="Remove from watchlist"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <div className={`text-xl font-bold ${item.priceChange.amount >= 0 ? 'text-steel-positive' : 'text-steel-negative'}`}>
                  ₹{item.price.toLocaleString('en-IN', { 
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2 
                  })}
                </div>
                <span className="text-xs text-gray-400">per Ton</span>
              </div>
              <div className={item.priceChange.amount >= 0 ? "text-steel-positive flex flex-col items-end" : "text-steel-negative flex flex-col items-end"}>
                <span className="text-lg">
                  {item.priceChange.amount >= 0 ? "+" : ""}
                  {item.priceChange.percentage.toFixed(2)}%
                </span>
                <span className="text-xs text-gray-400">
                  {item.priceChange.amount >= 0 ? "+" : ""}
                  ₹{item.priceChange.amount.toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Alert Settings Panel */}
            {showAlertSettings[item.id] && (
              <div className="mt-3 pt-3 border-t border-gray-800 animate-accordion-down">
                <h3 className="text-sm font-medium mb-2">Price Alert Settings</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Alert Type</label>
                    <select 
                      className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-steel-positive"
                      value={alertType[item.id] || 'both'}
                      onChange={(e) => setAlertType(prev => ({
                        ...prev,
                        [item.id]: e.target.value as 'increase' | 'decrease' | 'both'
                      }))}
                    >
                      <option value="increase">Price Increase</option>
                      <option value="decrease">Price Decrease</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Threshold (%)</label>
                    <input 
                      type="number" 
                      min="0.1" 
                      step="0.1"
                      value={priceThreshold[item.id] || 5}
                      onChange={(e) => setPriceThreshold(prev => ({
                        ...prev,
                        [item.id]: parseFloat(e.target.value)
                      }))}
                      className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-steel-positive"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleSaveAlert(item.id, item.category)}
                  className="w-full bg-steel-positive text-black font-medium py-1.5 px-3 rounded-lg mt-3 hover:opacity-90 text-sm"
                >
                  Save Alert
                </button>
              </div>
            )}
          </div>
        ))}
        
        {/* Add New Item */}
        <h2 className="text-lg font-semibold mt-6 mb-3">Add to Watchlist</h2>
        
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Object.entries(steelCategories)
            .filter(([category]) => !watchlistItems.some(item => item.category === category))
            .map(([category, data]) => (
              <div key={category} className="bg-steel-card rounded-xl p-4 hover:bg-steel-highlight cursor-pointer flex justify-between items-center">
                <div>
                  <div className="font-bold">{category}</div>
                  <div className={data.priceChange.amount >= 0 ? "text-steel-positive text-sm" : "text-steel-negative text-sm"}>
                    {data.price.toLocaleString('en-IN', { 
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2 
                    })}
                    <span className="text-xs text-gray-400 ml-1">per Ton</span>
                  </div>
                </div>
                <button 
                  className="p-2 hover:bg-gray-700 rounded-full flex items-center justify-center"
                  onClick={() => handleAddToWatchlist(category)}
                >
                  <Bell size={18} className="text-gray-400" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default WatchlistPage;
