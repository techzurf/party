/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Languages,
  CheckCircle,
  Award,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  BookOpen,
  Send,
  Bell,
  RefreshCw,
  Plus,
  Home,
  Newspaper,
  Calendar,
  Phone,
  User,
  ArrowLeft,
  Users
} from 'lucide-react';

import { Language, ScreenId, UserData, NewsItem, EventItem, PartyNotification, VolunteerData } from './types';
import { TN_DISTRICTS_AND_CONSTITUENCIES, MOCK_NEWS, MOCK_EVENTS, INITIAL_NOTIFICATIONS } from './data';

import SplashView from './components/SplashView';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import RegistrationView from './components/RegistrationView';
import IDCardView from './components/IDCardView';
import ProfileView from './components/ProfileView';
import NewsView from './components/NewsView';
import EventsView from './components/EventsView';
import VolunteeringView from './components/VolunteeringView';
import ContactView from './components/ContactView';
import NotificationsView from './components/NotificationsView';
import AdminPortalView from './components/AdminPortalView';

// Preset Avatars for pre-fill simulation
const PRESET_PROFILE_PHOTOS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', // Female avatar
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', // Male avatar
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', // Leader style 
];

export default function App() {
  const [language, setLanguage] = useState<Language>('ta');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [viewPortal, setViewPortal] = useState<'user' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('portal') === 'admin' || params.get('view') === 'admin') {
        return 'admin';
      }
    }
    return 'user';
  });

  // Core application database/states
  const [userData, setUserData] = useState<UserData>({
    name: 'கோகுல கிருஷ்ணன் (Gokul)',
    guardian: 'ராஜசேகர் (Rajasekar)',
    mobile: '9845012345',
    email: 'gokul@needhikatchi.org',
    gender: 'Male',
    dob: '1998-08-24',
    district: 'Chennai / சென்னை',
    constituency: 'Mylapore / மயிலாப்பூர்',
    address: 'கதவு எண் 12, காந்தி தெரு, மயிலாப்பூர், சென்னை - 600004',
    photo: PRESET_PROFILE_PHOTOS[1],
    membershipNo: 'AINK-240915',
    joinDate: '2026 ஜூன் 18',
    isRegistered: false, // Starts as unregistered, can register in app or click prefills
    isLoggedIn: false
  });

  const [newsItems, setNewsItems] = useState<NewsItem[]>(MOCK_NEWS);
  const [eventItems, setEventItems] = useState<EventItem[]>(MOCK_EVENTS);
  const [notifications, setNotifications] = useState<PartyNotification[]>(INITIAL_NOTIFICATIONS);
  const [volunteerData, setVolunteerData] = useState<VolunteerData>({
    skills: [],
    availability: 'Weekends',
    interest: 'youth',
    isRegistered: false
  });

  // Derived state: counts unread notifications for the status bell
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simulate Instant Auto-registration helper
  const handlePrefillAndRegister = () => {
    setUserData({
      name: 'செல்வி. அஞ்சலி தேவி (Anjali Devi)',
      guardian: 'முனுசாமி (Munusamy)',
      mobile: '9444055667',
      email: 'anjali@needhikatchi.org',
      gender: 'Female',
      dob: '2001-11-04',
      district: 'Chennai / சென்னை',
      constituency: 'Chepauk-Thiruvallikeni / சேப்பாக்கம்-திருவல்லிக்கேணி',
      address: 'கதவு எண் 7, பவழக்குறிச்சி, சென்னை - 600005',
      photo: PRESET_PROFILE_PHOTOS[0],
      membershipNo: 'AINK-859423',
      joinDate: 'ஜூன் 18, 2026',
      isRegistered: true,
      isLoggedIn: true
    });
    
    // Auto shift to dashboard so they can explore
    setCurrentScreen('dashboard');
  };

  // Reset demo state helper
  const handleResetDemoState = () => {
    setUserData({
      name: 'கோகுல கிருஷ்ணன் (Gokul)',
      guardian: 'ராஜசேகர் (Rajasekar)',
      mobile: '9845012345',
      email: 'gokul@needhikatchi.org',
      gender: 'Male',
      dob: '1998-08-24',
      district: 'Chennai / சென்னை',
      constituency: 'Mylapore / மயிலாப்பூர்',
      address: 'கதவு எண் 12, காந்தி தெரு, மயிலாப்பூர், சென்னை - 600004',
      photo: PRESET_PROFILE_PHOTOS[1],
      membershipNo: 'AINK-240915',
      joinDate: '2026 ஜூன் 18',
      isRegistered: false,
      isLoggedIn: false
    });
    setVolunteerData({
      skills: [],
      availability: 'Weekends',
      interest: 'youth',
      isRegistered: false
    });
    setNotifications(INITIAL_NOTIFICATIONS);
    // Reset RSVP dates
    setEventItems(MOCK_EVENTS);
    setCurrentScreen('splash');
  };

  if (viewPortal === 'admin') {
    return (
      <div className="w-full min-h-screen flex flex-col bg-[#F0F4F8] text-slate-800 overflow-x-hidden relative" id="aink-root-admin-container">
        <AdminPortalView
          language={language}
          newsItems={newsItems}
          setNewsItems={setNewsItems}
          eventItems={eventItems}
          setEventItems={setEventItems}
          notifications={notifications}
          setNotifications={setNotifications}
          currentUserData={userData}
          setCurrentScreen={(screen) => {
            setViewPortal('user');
            setCurrentScreen(screen);
          }}
        />

        {/* Floating Toggle to switch back to User App readily */}
        <div className="fixed bottom-6 right-6 z-[99999]">
          <button 
            onClick={() => setViewPortal('user')}
            className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-black py-2.5 px-4 rounded-full shadow-2xl text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 select-none"
            id="portal-toggle-to-user"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>📱 Go back to Mobile App</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F5F7FA] text-slate-800 overflow-x-hidden relative" id="aink-root-app-container">
      
      {/* 
        Official Government-Grade Top App Bar
        - Centered Logo & Brand
        - Notification icon on right
        - Language switcher on left
      */}
      {currentScreen !== 'splash' && currentScreen !== 'login' && (
        <div 
          className="w-full bg-white px-4 shrink-0 flex items-center justify-between border-b border-slate-200 shadow-xs z-20"
          style={{ height: '64px' }}
          id="aink-standard-top-header"
        >
          {/* Language switcher on left */}
          <div className="flex items-center gap-1.5 justify-start w-1/4">
            {!['dashboard', 'news', 'events', 'contact', 'idcard', 'register'].includes(currentScreen) && (
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="p-1.5 rounded-lg hover:bg-slate-50 text-[#0B47AB] transition-colors active:scale-95 cursor-pointer flex items-center justify-center min-h-[44px]"
                aria-label="Back to home"
                id="top-bar-back-arrow"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
            <button
              onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
              className="bg-slate-50 hover:bg-slate-100 active:scale-95 text-slate-750 font-black text-[11px] py-1.5 px-2.5 rounded-lg border border-slate-200 transition-colors uppercase cursor-pointer min-h-[44px] flex items-center justify-center min-w-[55px]"
              id="top-bar-lang-toggle"
            >
              {language === 'ta' ? 'EN' : 'தமிழ்'}
            </button>
          </div>

          {/* Party logo & name centered */}
          <div className="flex items-center justify-center gap-2 w-2/4 cursor-pointer" onClick={() => setCurrentScreen('dashboard')}>
            <img 
              src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
              alt="AINK Logo" 
              className="w-9 h-9 object-contain shrink-0" 
              referrerPolicy="no-referrer"
            />
            <span className="font-extrabold text-[12.5px] sm:text-[14px] text-[#0B47AB] tracking-tight uppercase truncate">
              {language === 'ta' ? 'அகில இந்திய நீதி கட்சி' : 'All India Needhi Katchi'}
            </span>
          </div>

          {/* Notification icon on right */}
          <div className="flex items-center justify-end w-1/4">
            <button
              onClick={() => setCurrentScreen('notifications')}
              className="relative p-2 rounded-full hover:bg-slate-50 text-slate-700 transition-all active:scale-95 cursor-pointer min-h-[44px] flex items-center justify-center"
              id="top-bar-bell-btn"
              aria-label="Notifications"
            >
              <Bell className="w-5.5 h-5.5 text-slate-700" />
              {unreadCount > 0 && (
                <span 
                  className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse"
                  id="top-bar-bell-badge"
                ></span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 
        Quick Helper overlay for cold splash/login (Reviewer bypass) 
        Allows testers to instantly skip verification & logs in
      */}
      {(currentScreen === 'splash' || currentScreen === 'login') && (
        <div className="absolute top-4 left-0 right-0 px-4 z-40" id="reviewer-fast-bypass-panel">
          <div className="bg-slate-900/95 text-white/95 rounded-xl p-2.5 text-xs shadow-xl border border-slate-800 flex items-center justify-between gap-3 font-semibold select-none">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>{language === 'ta' ? 'விரைவு சோதனை முறைமை:' : 'Reviewer Fast-Sandbox:'}</span>
            </span>
            <button
              onClick={handlePrefillAndRegister}
              className="bg-[#008C45] hover:bg-emerald-600 active:scale-95 text-white font-black text-[10px] py-1 px-2.5 rounded-lg border border-emerald-500 uppercase transition-all shrink-0 cursor-pointer"
              id="bypass-auto-register-btn"
            >
              {language === 'ta' ? 'தானியங்கி உள்நுழைவு ➔' : 'Auto-Fill & Skip ➔'}
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Main Screen Content Viewport */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-[#F5F7FA]" id="virtual-app-inner-scroll">
        
        {currentScreen === 'splash' && (
          <SplashView
            language={language}
            onEnter={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'login' && (
          <LoginView
            language={language}
            onLoginSuccess={(mob) => {
              setUserData(prev => ({ ...prev, mobile: mob, isLoggedIn: true }));
              setCurrentScreen('dashboard');
            }}
            onJoinPartyClick={() => {
              setCurrentScreen('register');
            }}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardView
            language={language}
            userData={userData}
            newsItems={newsItems}
            eventItems={eventItems}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'register' && (
          <RegistrationView
            language={language}
            userData={userData}
            setUserData={setUserData}
            onSubmitSuccess={() => {
              setCurrentScreen('idcard');
            }}
          />
        )}

        {currentScreen === 'idcard' && (
          <IDCardView
            language={language}
            userData={userData}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileView
            language={language}
            userData={userData}
            setUserData={setUserData}
            onLogout={() => {
              setUserData(prev => ({ ...prev, isLoggedIn: false, isRegistered: false }));
              setCurrentScreen('splash');
            }}
            onPrefill={handlePrefillAndRegister}
            onReset={handleResetDemoState}
          />
        )}

        {currentScreen === 'news' && (
          <NewsView
            language={language}
            newsItems={newsItems}
            setNewsItems={setNewsItems}
          />
        )}

        {currentScreen === 'events' && (
          <EventsView
            language={language}
            eventItems={eventItems}
            setEventItems={setEventItems}
          />
        )}

        {currentScreen === 'volunteer' && (
          <VolunteeringView
            language={language}
            volunteerData={volunteerData}
            setVolunteerData={setVolunteerData}
          />
        )}

        {currentScreen === 'contact' && (
          <ContactView
            language={language}
          />
        )}

        {currentScreen === 'notifications' && (
          <NotificationsView
            language={language}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}

      </div>

      {/* 
        Official Sticky Bottom Navigation Bar
        - Fixed 5 Tabs with dynamic state highlights
        - Rendered only when authenticated past Splash or Login
      */}
      {/* Floating Toggle to Switch to Admin Portal - Designed cleanly to fit over the mobile screens for testing */}
      <div className="fixed bottom-20 right-4 z-[9999] select-none text-xs" id="admin-portal-floating-utility">
        <button 
          onClick={() => setViewPortal('admin')}
          className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-white font-black py-2 px-3 rounded-full shadow-2xl flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95 border-b-2 border-slate-950"
          id="portal-toggle-to-admin"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>🖥️ Switch to Admin Portal</span>
        </button>
      </div>

      {currentScreen !== 'splash' && currentScreen !== 'login' && (
        <div 
          className="w-full bg-white border-t border-slate-200 shrink-0 flex items-center justify-around z-30 shadow-md pb-safe"
          style={{ height: '62px' }}
          id="sticky-bottom-nav-bar"
        >
          {/* Tab 1: Home (🏠 முகப்பு) */}
          <button
            onClick={() => setCurrentScreen('dashboard')}
            aria-label="Home Tab"
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all text-center gap-0.5 cursor-pointer min-h-[48px] ${
              currentScreen === 'dashboard' ? 'text-[#0B47AB]' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Home className={`w-5.5 h-5.5 ${currentScreen === 'dashboard' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] sm:text-[11px] font-black select-none tracking-tight">
              {language === 'ta' ? '🏠 முகப்பு' : 'Home'}
            </span>
          </button>

          {/* Tab 2: News (📰 செய்திகள்) */}
          <button
            onClick={() => setCurrentScreen('news')}
            aria-label="News Tab"
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all text-center gap-0.5 cursor-pointer min-h-[48px] ${
              currentScreen === 'news' ? 'text-[#0B47AB]' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Newspaper className={`w-5.5 h-5.5 ${currentScreen === 'news' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] sm:text-[11px] font-black select-none tracking-tight">
              {language === 'ta' ? '📰 செய்திகள்' : 'News'}
            </span>
          </button>

          {/* Tab 3: Events (📅 நிகழ்வுகள்) */}
          <button
            onClick={() => setCurrentScreen('events')}
            aria-label="Events Tab"
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all text-center gap-0.5 cursor-pointer min-h-[48px] ${
              currentScreen === 'events' ? 'text-[#0B47AB]' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Calendar className={`w-5.5 h-5.5 ${currentScreen === 'events' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] sm:text-[11px] font-black select-none tracking-tight">
              {language === 'ta' ? '📅 நிகழ்வுகள்' : 'Events'}
            </span>
          </button>

          {/* Tab 4: Member (👥 உறுப்பினர்) */}
          <button
            onClick={() => {
              if (userData.isRegistered) {
                setCurrentScreen('idcard');
              } else {
                setCurrentScreen('register');
              }
            }}
            aria-label="Member Tab"
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all text-center gap-0.5 cursor-pointer min-h-[48px] ${
              (currentScreen === 'idcard' || currentScreen === 'register') ? 'text-[#0B47AB]' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Users className={`w-5.5 h-5.5 ${(currentScreen === 'idcard' || currentScreen === 'register') ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] sm:text-[11px] font-black select-none tracking-tight">
              {language === 'ta' ? '👥 உறுப்பினர்' : 'Member'}
            </span>
          </button>

          {/* Tab 5: Contact (📞 தொடர்பு) */}
          <button
            onClick={() => setCurrentScreen('contact')}
            aria-label="Contact Tab"
            className={`flex-1 flex flex-col items-center justify-center h-full transition-all text-center gap-0.5 cursor-pointer min-h-[48px] ${
              currentScreen === 'contact' ? 'text-[#0B47AB]' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            <Phone className={`w-5.5 h-5.5 ${currentScreen === 'contact' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] sm:text-[11px] font-black select-none tracking-tight">
              {language === 'ta' ? '📞 தொடர்பு' : 'Contact'}
            </span>
          </button>
        </div>
      )}

    </div>
  );
}
