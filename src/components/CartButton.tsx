
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  
  return (
    <Link to="/order" className="relative">
      <ShoppingCart size={24} strokeWidth={1.5} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-steel-positive text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
