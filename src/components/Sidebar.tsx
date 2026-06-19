/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import {
  Home,
  User,
  CreditCard,
  Newspaper,
  Calendar,
  HeartHandshake,
  Phone,
  Bell,
  LogOut,
  X,
  Award
} from 'lucide-react';
import { ScreenId, Language, UserData } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  language: Language;
  userData: UserData;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  currentScreen,
  setCurrentScreen,
  language,
  userData,
  onLogout,
}: SidebarProps) {
  if (!isOpen) return null;

  const menuItems: { id: ScreenId; labelTa: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      labelTa: 'முகப்புப்பலகை',
      labelEn: 'Home Dashboard',
      icon: <Home className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'idcard',
      labelTa: 'எனது உறுப்பினர் அட்டை',
      labelEn: 'Digital ID Card',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'profile',
      labelTa: 'சுயவிவரம்',
      labelEn: 'My Profile',
      icon: <User className="w-5 h-5 text-blue-700" />
    },
    {
      id: 'news',
      labelTa: 'செய்திகள் & நிகழ்வுகள்',
      labelEn: 'News & Announcements',
      icon: <Newspaper className="w-5 h-5 text-emerald-700" />
    },
    {
      id: 'events',
      labelTa: 'கட்சி நிகழ்வுகள்',
      labelEn: 'Party Events',
      icon: <Calendar className="w-5 h-5 text-red-600" />
    },
    {
      id: 'volunteer',
      labelTa: 'தன்னார்வலர் சேர்க்கை',
      labelEn: 'Volunteer Wing',
      icon: <HeartHandshake className="w-5 h-5 text-blue-800" />
    },
    {
      id: 'contact',
      labelTa: 'தொடர்பு கொள்ள',
      labelEn: 'Contact Party',
      icon: <Phone className="w-5 h-5 text-emerald-800" />
    },
    {
      id: 'notifications',
      labelTa: 'அறிவிப்புகள்',
      labelEn: 'Notifications',
      icon: <Bell className="w-5 h-5 text-orange-600" />
    }
  ];

  const handleNavigate = (id: ScreenId) => {
    setCurrentScreen(id);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex" id="sidebar-drawer-overlay">
      {/* Background Dim Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        id="sidebar-backdrop"
      ></div>

      {/* Slide-out Sidebar Menu */}
      <div
        className="relative flex flex-col w-[290px] max-w-[85%] h-full bg-white shadow-2xl transition-transform duration-300 ease-out flex-shrink-0 animate-in slide-in-from-left duration-200"
        id="sidebar-menu-body"
      >
        {/* Sidebar Header (Party Logo and Top Gradient Banner) */}
        <div className="relative p-5 bg-gradient-to-br from-[#0047AB] via-[#0047AB] to-[#008C45] text-white flex flex-col gap-3">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/20 hover:bg-black/35 text-white active:scale-95 transition-all"
            aria-label="Close menu"
            id="sidebar-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Party Seal / Emblem and Name */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-white flex items-center justify-center shadow-lg p-1.5 shrink-0">
              <img 
                src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
                alt="AINK Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide leading-tight">AINK</h3>
              <p className="text-[10px] text-blue-100 font-medium tracking-wider">
                {language === 'ta' ? 'அகில இந்தியா நீதி கட்சி' : 'Akhila India Needhi Katchi'}
              </p>
            </div>
          </div>

          {/* Member Card Quick Status */}
          <div className="mt-2 bg-white/10 rounded-xl p-3 border border-white/15 flex items-center gap-3">
            <img
              src={userData.photo}
              alt={userData.name}
              className="w-10 h-10 rounded-full object-cover border border-white"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
              }}
            />
            <div className="overflow-hidden">
              <p className="font-semibold text-xs truncate">{userData.isRegistered ? userData.name : (language === 'ta' ? 'அதிதி பயனர்' : 'Guest Member')}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-[9px] uppercase tracking-wider text-emerald-100 font-bold bg-[#008C45] px-1.5 py-0.2 rounded">
                  {userData.isRegistered ? (language === 'ta' ? 'செயலில்' : 'ACTIVE') : (language === 'ta' ? 'பதிவு செய்யவில்லை' : 'UNREGISTERED')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 bg-slate-50/50" id="sidebar-links-container">
          {menuItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all font-medium text-xs ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-[#0047AB]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                id={`sidebar-link-${item.id}`}
              >
                <div className="flex items-center gap-3.5">
                  {item.icon}
                  <span>{language === 'ta' ? item.labelTa : item.labelEn}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer and Logout button */}
        <div className="p-4 border-t border-slate-155 bg-white space-y-2">
          {/* Slogan details */}
          <div className="text-center py-2 px-1 rounded-lg bg-orange-50 text-orange-800 text-[10px] font-bold tracking-wider leading-relaxed border border-orange-100">
            {language === 'ta' ? 'நீதி • முன்னேற்றம் • நம்பிக்கை' : 'JUSTICE • PROGRESS • FAITH'}
          </div>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 border border-red-200 hover:bg-red-50 text-red-600 py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-all text-center"
            id="sidebar-logout-btn"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'ta' ? 'வெளியேறு' : 'Logout Party App'}</span>
          </button>

          <p className="text-[10px] text-center text-slate-400 font-mono">
            {language === 'ta' ? 'பதிப்பு 2.4.0 (அண்ட்ராய்டு/iOS)' : 'v2.4.0 (Unified Build)'}
          </p>
        </div>
      </div>
    </div>
  );
}
