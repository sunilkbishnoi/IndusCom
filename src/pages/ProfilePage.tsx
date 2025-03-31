
import React from 'react';
import { Settings, LogOut, CreditCard, FileText, Bell, Mail } from 'lucide-react';
import NavBar from '../components/NavBar';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-steel-background text-white pb-20">
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="p-2 rounded-full hover:bg-gray-800">
            <Settings size={20} />
          </button>
        </div>
        
        {/* User Info */}
        <div className="bg-steel-card rounded-xl p-4 mb-6 flex items-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
            SB
          </div>
          <div>
            <h2 className="text-xl font-bold">Sunil Bishnoi</h2>
            <p className="text-gray-400">Steel Procurement Manager</p>
            <p className="text-sm text-gray-500">ID: STL8794125</p>
          </div>
        </div>
        
        {/* Account Options */}
        <div className="bg-steel-card rounded-xl overflow-hidden mb-6">
          <div className="border-b border-gray-800">
            <a href="#" className="block p-4 hover:bg-steel-highlight flex items-center">
              <CreditCard size={20} className="mr-3 text-gray-400" />
              <span>Payment Methods</span>
            </a>
          </div>
          <div className="border-b border-gray-800">
            <a href="#" className="block p-4 hover:bg-steel-highlight flex items-center">
              <FileText size={20} className="mr-3 text-gray-400" />
              <span>Order History</span>
            </a>
          </div>
          <div className="border-b border-gray-800">
            <a href="#" className="block p-4 hover:bg-steel-highlight flex items-center">
              <Bell size={20} className="mr-3 text-gray-400" />
              <span>Notifications</span>
            </a>
          </div>
          <div>
            <a href="#" className="block p-4 hover:bg-steel-highlight flex items-center">
              <Mail size={20} className="mr-3 text-gray-400" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
        
        {/* Company Info */}
        <div className="bg-steel-card rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Company Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Company Name:</span>
              <span>Bishnoi Industries Pvt Ltd</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">GST Number:</span>
              <span>29AABCU9603R1ZJ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Location:</span>
              <span>Mumbai, Maharashtra</span>
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <button className="w-full border border-gray-700 rounded-xl p-3 flex items-center justify-center text-red-500 hover:bg-gray-800">
          <LogOut size={20} className="mr-2" />
          <span>Logout</span>
        </button>
      </div>

      {/* Navigation Bar */}
      <NavBar />
    </div>
  );
};

export default ProfilePage;
