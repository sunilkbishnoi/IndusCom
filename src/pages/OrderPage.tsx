
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Plus, Minus, Info, FileCheck } from 'lucide-react';
import NavBar from '../components/NavBar';
import { steelProducts, locations } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';

const OrderPage = () => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [location, setLocation] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [notes, setNotes] = useState('');
  
  const gst = totalPrice * 0.18; // 18% GST
  const transportCharge = location ? 2500 : 0; // Fixed transport charge if location is selected
  const totalAmount = totalPrice + gst + transportCharge;

  const handleSubmitQuotation = () => {
    if (items.length === 0) {
      toast.error("Your quotation cart is empty");
      return;
    }
    
    if (!location) {
      toast.error("Please select a delivery location");
      return;
    }
    
    // Here would normally be an API call to submit the quotation
    setRequestSent(true);
    toast.success("Quotation request submitted successfully", {
      description: "Our team will contact you within 24 hours"
    });
  };

  const resetForm = () => {
    clearCart();
    setLocation('');
    setDeliveryDate('');
    setNotes('');
    setRequestSent(false);
  };

  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-1">Request Quotation</h1>
        <p className="text-gray-400 text-sm mb-4">Get tailored pricing for your steel products</p>
        
        {requestSent ? (
          <div className="bg-steel-card rounded-xl p-6 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 bg-steel-positive/20 rounded-full flex items-center justify-center">
              <FileCheck className="h-8 w-8 text-steel-positive" />
            </div>
            <h2 className="text-xl font-semibold text-center">Quotation Request Sent</h2>
            <p className="text-center text-gray-400">
              Your quotation request has been submitted successfully. Our team will analyze your requirements and get back to you within 24 hours.
            </p>
            <p className="font-medium">Quotation ID: QT-{Math.floor(Math.random() * 10000)}</p>
            <button 
              onClick={resetForm}
              className="bg-steel-positive text-black font-bold py-2 px-4 rounded-lg hover:opacity-90 mt-4"
            >
              Request Another Quotation
            </button>
          </div>
        ) : (
          <>
            {/* Empty Cart Message */}
            {items.length === 0 && (
              <div className="bg-steel-card rounded-xl p-8 mb-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium mb-2">Your quotation cart is empty</h2>
                <p className="text-gray-400 mb-4">Browse our steel products and add items to request a quotation</p>
                <a href="/market" className="bg-transparent border border-steel-positive text-steel-positive font-medium py-2 px-4 rounded-lg hover:bg-steel-positive/10 inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3V21H21" />
                    <path d="M7 14L11 10L15 14L21 8" />
                  </svg>
                  Browse Products
                </a>
              </div>
            )}

            {/* Quote Items */}
            {items.length > 0 && (
              <div className="bg-steel-card rounded-xl overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold">Items in Quotation ({items.length})</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.grade}-${item.size}`} className="flex flex-col sm:flex-row gap-3 p-3 bg-steel-highlight/30 rounded-lg">
                        <div className="flex-grow">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-400">{item.manufacturer}</div>
                          {item.grade && <div className="text-xs text-gray-400">Grade: {item.grade}</div>}
                          {item.size && <div className="text-xs text-gray-400">Size: {item.size}</div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 rounded-full bg-steel-background"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full bg-steel-background"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <div className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                          <div className="text-xs text-gray-400">₹{item.price.toLocaleString('en-IN')} per TON</div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 p-1 mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Information */}
            {items.length > 0 && (
              <div className="bg-steel-card rounded-xl overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold">Delivery Information</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Delivery Location*</label>
                      <select 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
                      >
                        <option value="">Select location</option>
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>
                            {loc.name}, {loc.state}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Preferred Delivery Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Delivery Date (Optional)</label>
                      <input 
                        type="date" 
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive"
                      />
                    </div>
                    
                    {/* Additional Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Additional Notes (Optional)</label>
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Specific requirements or questions about the products..."
                        className="w-full bg-steel-background border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-steel-positive min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Order Summary */}
            {items.length > 0 && (
              <div className="bg-steel-card rounded-xl overflow-hidden mb-6">
                <div 
                  className="p-4 border-b border-gray-800 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowOrderSummary(!showOrderSummary)}
                >
                  <h2 className="text-lg font-semibold">Quotation Summary</h2>
                  {showOrderSummary ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                
                {showOrderSummary && (
                  <div className="p-4 animate-accordion-down">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Price:</span>
                        <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center">
                          GST (18%):
                          <Info size={14} className="ml-1 text-gray-400" />
                        </span>
                        <span>₹{gst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transport Charges:</span>
                        <span>₹{transportCharge.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                        <span>Est. Total:</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-xs text-gray-400 border border-gray-700 rounded-lg p-3 bg-gray-800/30">
                        <p className="flex items-center mb-1">
                          <Info size={14} className="mr-1 text-steel-positive" />
                          <span className="font-medium text-steel-positive">Important Information</span>
                        </p>
                        <p>This is an estimated quote. Final pricing may vary based on market conditions, material availability, and specific requirements.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Action Buttons */}
            {items.length > 0 && (
              <div className="flex flex-col space-y-3">
                <button 
                  className="w-full bg-steel-positive text-black font-bold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!location || items.length === 0}
                  onClick={handleSubmitQuotation}
                >
                  Submit Quotation Request
                </button>
                <button 
                  className="w-full bg-transparent border border-gray-600 text-white font-bold py-3 rounded-xl hover:bg-gray-800"
                  onClick={clearCart}
                >
                  Clear All Items
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default OrderPage;
