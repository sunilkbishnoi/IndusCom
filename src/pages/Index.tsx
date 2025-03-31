
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, FileText, Info } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import WatchlistItem from '../components/WatchlistItem';
import NavBar from '../components/NavBar';
import NewsTicker from '../components/NewsTicker';
import IndustryInsights from '../components/IndustryInsights';
import TechnicalSpecs from '../components/TechnicalSpecs';
import { steelCategories, steelProducts, watchlistItems, marketNews, steelSpecs, industryReports } from '../data/mockData';
import { SteelCategory } from '../types';

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<SteelCategory>("Stainless Steel");
  const [timeFilter, setTimeFilter] = useState("Today");
  
  // Filter products by selected category
  const filteredProducts = steelProducts.filter(
    product => product.category === selectedCategory
  );

  // Extract headlines for the ticker
  const headlines = marketNews.map(news => news.headline);

  const handleCategorySelect = (category: SteelCategory) => {
    setSelectedCategory(category);
  };

  // Get relevant technical specification for the selected category
  const relevantSpec = steelSpecs.find(spec => spec.category === selectedCategory);

  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      {/* Header */}
      <div className="p-4 pt-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold">IndusCom Index</h1>
        <button className="p-2 rounded-full hover:bg-gray-800">
          <Settings size={24} />
        </button>
      </div>

      {/* News Ticker */}
      <NewsTicker news={headlines} />

      {/* Categories Carousel */}
      <div className="px-4 py-4 overflow-x-auto flex gap-3 no-scrollbar">
        {Object.entries(steelCategories).map(([category, data]) => (
          <div key={category} className="min-w-[200px]">
            <CategoryCard
              category={category as SteelCategory}
              price={data.price}
              priceChange={data.priceChange}
              onClick={() => handleCategorySelect(category as SteelCategory)}
            />
          </div>
        ))}
      </div>

      {/* Selected Category */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{selectedCategory}</h2>
          <div className="relative">
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="appearance-none bg-black border border-gray-700 rounded-full px-4 py-1 pr-8 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
            >
              <option value="Today">Today</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See More */}
        <div className="mt-4 flex justify-center">
          <button 
            className="flex items-center text-green-500 font-medium"
            onClick={() => navigate('/market')}
          >
            See More
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Technical Specs */}
      {relevantSpec && (
        <div className="px-4 mt-2">
          <TechnicalSpecs spec={relevantSpec} />
        </div>
      )}

      {/* Industry Insights */}
      <div className="px-4 mt-6">
        <IndustryInsights reports={industryReports} />
      </div>

      {/* Watchlist */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">Your Watchlist</h2>
          <button 
            className="text-gray-400 flex items-center"
            onClick={() => navigate('/watchlist')}
          >
            Edit Watchlist
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {watchlistItems.map(item => (
          <WatchlistItem key={item.id} item={item} />
        ))}
        
        {watchlistItems.length === 0 && (
          <div className="text-center py-10 bg-steel-card rounded-xl">
            <FileText size={48} className="mx-auto mb-3 text-gray-500" />
            <h3 className="text-lg font-medium">Your watchlist is empty</h3>
            <p className="text-gray-400 text-sm mt-1">Add items to track their price changes</p>
            <button 
              className="mt-4 bg-steel-positive text-black font-bold py-2 px-6 rounded-xl hover:opacity-90"
              onClick={() => navigate('/market')}
            >
              Browse Products
            </button>
          </div>
        )}
      </div>

      {/* Market Conditions Banner */}
      <div className="mx-4 mb-8 p-4 bg-steel-card rounded-xl flex items-center border border-gray-800">
        <Info size={20} className="text-steel-positive mr-3" />
        <div>
          <h3 className="font-medium">Market Conditions</h3>
          <p className="text-sm text-gray-400">Current market volatility: Moderate. Consider bulk purchases to lock in current prices.</p>
        </div>
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default Index;
