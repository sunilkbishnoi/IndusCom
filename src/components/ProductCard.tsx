
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Ruler, ShoppingCart, Truck, Factory, Award } from 'lucide-react';
import { SteelProduct, QualityGrade, SizeRange } from '../types';
import PriceChange from './PriceChange';
import StockAlert from './StockAlert';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: SteelProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade | undefined>(
    product.qualityGrade || "S.S 304 Q"
  );
  const [selectedSize, setSelectedSize] = useState<SizeRange | undefined>(
    product.sizeRange || "1 inch - 8 inch"
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Mock data for the chart with more points for a smoother curve
  const data = [
    { name: 'Jan', price: product.price - 1200 },
    { name: 'Feb', price: product.price - 800 },
    { name: 'Mar', price: product.price - 400 },
    { name: 'Apr', price: product.price - 200 },
    { name: 'May', price: product.price + 300 },
    { name: 'Jun', price: product.price },
  ];

  // Available quality grades based on product category
  const qualityGrades: QualityGrade[] = 
    product.category === "Stainless Steel" 
      ? ["S.S 202 Q", "S.S 204 Q", "S.S 304 Q"] 
      : product.category === "Mild Steel"
      ? ["M.S IS 2062"]
      : product.category === "Carbon Steel"
      ? ["CS ASTM A106"]
      : product.category === "Alloy Steel"
      ? ["AS A335 P11"]
      : ["S.S 304 Q"];
  
  // Available size ranges
  const sizeRanges: SizeRange[] = ["1 inch - 8 inch", "8 inch - 12 inch", "Custom"];

  // Calculate delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.type} - ${product.category}`,
      manufacturer: product.manufacturer,
      grade: selectedGrade,
      size: selectedSize,
      price: product.price,
      quantity
    });
    
    toast.success("Added to quotation cart", {
      description: `${product.type} - ${selectedGrade} added to your quotation list`
    });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border-b border-gray-800"
    >
      <CollapsibleTrigger className="flex justify-between items-center py-2.5 px-2 w-full text-left hover:bg-steel-highlight/40 transition-colors">
        <div className="flex flex-col">
          <span className="text-base font-semibold">{product.type}</span>
          <span className="text-xs text-gray-400">{product.manufacturer}</span>
        </div>
        <div className="flex items-center gap-3">
          <StockAlert productId={product.id} productName={`${product.type} - ${product.category}`} />
          <div className="text-right">
            <div className="text-base font-semibold">₹{product.price.toLocaleString('en-IN')} <span className="text-[10px] text-gray-400">per Ton</span></div>
            <PriceChange 
              amount={product.priceChange.amount} 
              percentage={product.priceChange.percentage}
            />
            <div className="text-gray-400">
              {isOpen ? <ChevronUp className="ml-auto" size={14} /> : <ChevronDown className="ml-auto" size={14} />}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-steel-highlight/20 p-3 rounded-lg mb-2 mx-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Quality Grade</label>
              <Select
                value={selectedGrade}
                onValueChange={(value) => setSelectedGrade(value as QualityGrade)}
              >
                <SelectTrigger className="w-full bg-steel-background border-gray-700 h-8 text-sm">
                  <SelectValue placeholder="Select quality grade" />
                </SelectTrigger>
                <SelectContent className="bg-steel-background border-gray-700 text-white">
                  {qualityGrades.map((grade) => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Size Range</label>
              <Select
                value={selectedSize}
                onValueChange={(value) => setSelectedSize(value as SizeRange)}
              >
                <SelectTrigger className="w-full bg-steel-background border-gray-700 h-8 text-sm">
                  <SelectValue placeholder="Select size range" />
                </SelectTrigger>
                <SelectContent className="bg-steel-background border-gray-700 text-white">
                  {sizeRanges.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Quantity (Ton)</label>
              <input 
                type="number" 
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full bg-steel-background border border-gray-700 rounded-md px-3 h-8 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2 text-xs">
            <div className="bg-steel-card px-2 py-1 rounded-full flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-steel-positive" />
              <span>Est. Delivery: {formattedDeliveryDate}</span>
            </div>
            <div className="bg-steel-card px-2 py-1 rounded-full flex items-center">
              <Ruler className="w-3 h-3 mr-1 text-steel-positive" />
              <span>MOQ: 2 Ton</span>
            </div>
            <div className="bg-steel-card px-2 py-1 rounded-full flex items-center">
              <Truck className="w-3 h-3 mr-1 text-steel-positive" />
              <span>Free Shipping: Order &gt;5 Ton</span>
            </div>
            <div className="bg-steel-card px-2 py-1 rounded-full flex items-center">
              <Factory className="w-3 h-3 mr-1 text-steel-positive" />
              <span>Manufacturing: 3 days</span>
            </div>
            <div className="bg-steel-card px-2 py-1 rounded-full flex items-center">
              <Award className="w-3 h-3 mr-1 text-steel-positive" />
              <span>Quality: ISO 9001</span>
            </div>
          </div>

          <div className="text-sm font-medium mb-1 flex justify-between items-center">
            <span>Price History (6 months)</span>
            <span className="text-xs text-steel-positive font-normal">+{product.priceChange.percentage}% overall</span>
          </div>
          
          <div className="p-2 bg-steel-card/50 rounded-lg border border-gray-800 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.5} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  dy={5}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }}
                  width={40}
                  dx={-5}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E1E', 
                    border: '1px solid #333', 
                    borderRadius: '8px', 
                    fontSize: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }} 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                  labelFormatter={(label) => `${label}, 2023`}
                />
                <ReferenceLine 
                  y={product.price} 
                  stroke="#777" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Current', 
                    position: 'insideBottomRight', 
                    fill: '#999',
                    fontSize: 10
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#4ADE80" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  activeDot={{ 
                    r: 5, 
                    fill: '#4ADE80',
                    stroke: '#000',
                    strokeWidth: 1
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <button 
            className="w-full bg-transparent border border-steel-positive text-steel-positive font-medium py-1.5 px-3 rounded-lg flex-1 hover:bg-steel-positive/10 flex items-center justify-center gap-2 text-sm mt-3"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Request Quotation
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductCard;
