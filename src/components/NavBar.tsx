
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, LineChart, FileText } from 'lucide-react';
import CartButton from './CartButton';

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 p-2 z-10">
      <div className="flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center px-3 py-1 ${isActive('/') ? 'text-white' : 'text-gray-400'}`}
        >
          <Home size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/market" 
          className={`flex flex-col items-center px-3 py-1 ${isActive('/market') ? 'text-white' : 'text-gray-400'}`}
        >
          <LineChart size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Market</span>
        </Link>
        
        <Link 
          to="/search" 
          className={`flex flex-col items-center px-3 py-1 ${isActive('/search') ? 'text-white' : 'text-gray-400'}`}
        >
          <Search size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        
        <Link 
          to="/order" 
          className={`flex flex-col items-center px-3 py-1 ${isActive('/order') ? 'text-white' : 'text-gray-400'}`}
        >
          <div className="relative">
            <CartButton />
          </div>
          <span className="text-xs mt-1">Quote</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center px-3 py-1 ${isActive('/profile') ? 'text-white' : 'text-gray-400'}`}
        >
          <User size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
