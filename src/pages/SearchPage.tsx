
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NavBar from '../components/NavBar';
import { steelProducts } from '../data/mockData';
import { SteelProduct } from '../types';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SteelProduct[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = steelProducts.filter(product => 
      product.category.toLowerCase().includes(term) ||
      product.type.toLowerCase().includes(term) ||
      product.manufacturer.toLowerCase().includes(term) ||
      (product.qualityGrade && product.qualityGrade.toLowerCase().includes(term))
    );
    
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, categories, manufacturers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-steel-card border border-gray-700 rounded-xl px-4 py-3 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 px-4 bg-steel-highlight rounded-r-xl hover:bg-steel-highlight/80"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-3">Results ({searchResults.length})</h2>
            <div className="bg-steel-card rounded-xl overflow-hidden">
              {searchResults.map(product => (
                <div 
                  key={product.id} 
                  className="p-4 border-b border-gray-800 hover:bg-steel-highlight last:border-b-0"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">{product.type}</div>
                      <div className="text-sm text-gray-400">
                        {product.category} • {product.manufacturer}
                      </div>
                      {product.qualityGrade && (
                        <div className="text-xs text-gray-500 mt-1">
                          Grade: {product.qualityGrade}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{product.price.toFixed(2)}</div>
                      <div className={product.priceChange.amount >= 0 ? "text-steel-positive text-sm" : "text-steel-negative text-sm"}>
                        {product.priceChange.amount >= 0 ? "+" : ""}
                        {product.priceChange.amount.toFixed(2)} ({product.priceChange.percentage.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchTerm ? (
          <div className="text-center py-8 text-gray-400">
            No results found for "{searchTerm}"
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="w-20 h-20 mx-auto mb-4 bg-steel-highlight rounded-full flex items-center justify-center">
              <Search size={32} />
            </div>
            Search for steel products, categories, or manufacturers
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default SearchPage;
