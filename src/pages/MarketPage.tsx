
import React, { useState } from 'react';
import { ChevronDown, ArrowUp, ArrowDown, Filter, Truck, Briefcase, Calendar } from 'lucide-react';
import NavBar from '../components/NavBar';
import { steelProducts } from '../data/mockData';
import { SteelCategory, ProductType, Manufacturer } from '../types';
import PriceChange from '../components/PriceChange';

const MarketPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<SteelCategory | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<ProductType | 'All'>('All');
  const [manufacturerFilter, setManufacturerFilter] = useState<Manufacturer | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique categories, types, and manufacturers
  const categories = ['All', ...new Set(steelProducts.map(p => p.category))] as (SteelCategory | 'All')[];
  const types = ['All', ...new Set(steelProducts.map(p => p.type))] as (ProductType | 'All')[];
  const manufacturers = ['All', ...new Set(steelProducts.map(p => p.manufacturer))] as (Manufacturer | 'All')[];
  
  // Filter products
  const filteredProducts = steelProducts.filter(product => {
    return (
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      (typeFilter === 'All' || product.type === typeFilter) &&
      (manufacturerFilter === 'All' || product.manufacturer === manufacturerFilter)
    );
  });

  // Calculate delivery date (5 days from now)
  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-steel-background z-10 border-b border-gray-800">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market</h1>
          <button 
            className="p-2 rounded-full hover:bg-gray-800"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="p-4 bg-steel-card border-t border-gray-800 animate-accordion-down">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as SteelCategory | 'All')}
                  className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Product Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Type</label>
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as ProductType | 'All')}
                  className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Manufacturer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Manufacturer</label>
                <select 
                  value={manufacturerFilter}
                  onChange={(e) => setManufacturerFilter(e.target.value as Manufacturer | 'All')}
                  className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
                >
                  {manufacturers.map(manufacturer => (
                    <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product List */}
      <div className="p-4">
        <div className="bg-steel-card rounded-xl overflow-hidden">
          {filteredProducts.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4 hidden md:table-cell">Manufacturer</th>
                  <th className="text-left p-4 hidden md:table-cell">Details</th>
                  <th className="text-right p-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-steel-highlight">
                    <td className="p-4">
                      <div className="font-medium">{product.type}</div>
                      <div className="text-sm text-gray-400">{product.category}</div>
                      <div className="md:hidden text-sm text-gray-400 mt-1">{product.manufacturer}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">{product.manufacturer}</td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-gray-400">Delivery: {getDeliveryDate()}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Truck className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-gray-400">MOQ: 2 TON</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Briefcase className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-gray-400">GST: 18%</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-right p-4">
                      <div className="font-bold">₹{product.price.toFixed(2)} <span className="text-xs text-gray-400">per TON</span></div>
                      <div className={product.priceChange.amount >= 0 ? "text-steel-positive flex items-center justify-end" : "text-steel-negative flex items-center justify-end"}>
                        {product.priceChange.amount >= 0 ? (
                          <>
                            <ArrowUp className="w-3 h-3 mr-1" />
                            <span>+₹{product.priceChange.amount.toFixed(2)} (+{product.priceChange.percentage.toFixed(2)}%)</span>
                          </>
                        ) : (
                          <>
                            <ArrowDown className="w-3 h-3 mr-1" />
                            <span>₹{product.priceChange.amount.toFixed(2)} ({product.priceChange.percentage.toFixed(2)}%)</span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-400">
              No products found matching your filters
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default MarketPage;
