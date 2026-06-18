/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, ArrowLeft, Menu, Bell, Languages, Smartphone, ShieldCheck } from 'lucide-react';
import { DeviceType, Language, ScreenId } from '../types';

interface DeviceFrameProps {
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  children: React.ReactNode;
  toggleSidebar: () => void;
  unreadNotifications: number;
}

export default function DeviceFrame({
  deviceType,
  setDeviceType,
  language,
  setLanguage,
  currentScreen,
  setCurrentScreen,
  children,
  toggleSidebar,
  unreadNotifications,
}: DeviceFrameProps) {
  const [time, setTime] = useState<string>('09:41');
  const [batteryLevel, setBatteryLevel] = useState<number>(85);

  useEffect(() => {
    // Simulate real time updating tick
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = String(hours % 12 || 12).padStart(2, '0');
      setTime(`${formattedHours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-lg mx-auto" id="aink-app-frame-wrapper">
      {/* Platform & Language Quick Bar (Above Mockup) */}
      <div className="w-full max-w-[380px] flex items-center justify-between px-4 mb-4 gap-2 text-xs bg-slate-900/90 text-white rounded-xl p-2.5 shadow-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-theme-blue font-semibold text-blue-400" />
          <span className="font-semibold text-slate-300">OS Frame:</span>
          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setDeviceType('ios')}
              className={`px-2 py-1 rounded-md transition-all font-medium ${
                deviceType === 'ios'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              id="btn-frame-ios"
            >
              iPhone
            </button>
            <button
              onClick={() => setDeviceType('android')}
              className={`px-2 py-1 rounded-md transition-all font-medium ${
                deviceType === 'android'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              id="btn-frame-android"
            >
              Android
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-emerald-400" />
          <button
            onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
            className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-white py-1 px-2.5 rounded-lg border border-slate-750 font-bold transition-all text-[11px] uppercase tracking-wider flex items-center gap-1.5"
            id="toggle-language-btn"
          >
            <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>
        </div>
      </div>

      {/* Hardware Device Container */}
      <div
        className={`relative transition-all duration-500 rounded-[55px] p-3.5 bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-4 ${
          deviceType === 'ios'
            ? 'border-slate-800 shadow-[0_0_20px_rgba(255,255,255,0.05),_0_25px_60px_rgba(0,0,0,0.8)]'
            : 'border-neutral-800 shadow-[0_0_20px_rgba(255,255,255,0.02),_0_25px_60px_rgba(0,0,0,0.8)]'
        }`}
        style={{ width: '380px' }}
        id="physical-device-body"
      >
        {/* Hardware side button click simulations (Visual decoration) */}
        <div className="absolute left-[-4px] top-[140px] w-[4px] h-[45px] bg-neutral-800 rounded-l-md border-r border-slate-700"></div>
        <div className="absolute left-[-4px] top-[200px] w-[4px] h-[45px] bg-neutral-800 rounded-l-md border-r border-slate-700"></div>
        <div className="absolute right-[-4px] top-[170px] w-[4px] h-[65px] bg-neutral-800 rounded-r-md border-l border-slate-700"></div>

        {/* Outer screen content container */}
        <div
          className="relative overflow-hidden w-full h-[690px] bg-slate-50 rounded-[42px] flex flex-col select-none border border-slate-900"
          id="mockup-screen-container"
        >
          {/* Top Status Bar (Android or iOS Styled) */}
          <div
            className={`w-full z-45 px-6 pt-3 flex items-center justify-between text-xs font-semibold select-none ${
              currentScreen === 'splash'
                ? 'bg-gradient-to-r from-[#0047AB] to-[#008C45] text-white/95'
                : 'glass-header text-slate-800 border-b border-slate-100'
            }`}
            style={{ height: '40px' }}
            id="top-status-bar"
          >
            {/* Time */}
            <div className={`w-1/3 text-left tracking-tight ${deviceType === 'ios' ? 'font-black' : 'font-semibold'}`}>
              {time}
            </div>

            {/* Dynamic Center hardware notches */}
            <div className="w-1/3 flex justify-center items-center">
              {deviceType === 'ios' ? (
                /* iPhone 15 Pro Dynamic Island */
                <div className="w-[100px] h-[24px] bg-slate-950 rounded-full border border-neutral-800/50 flex items-center justify-center gap-1.5 px-3 z-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#111]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#050510] border border-blue-900 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-500/80"></div>
                  </div>
                  {/* Dynamic notification dot inside Dynamic island */}
                  {unreadNotifications > 0 && currentScreen !== 'splash' && (
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                  )}
                </div>
              ) : (
                /* Android Central Camera Punch hole */
                <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-blue-900/60"></div>
                </div>
              )}
            </div>

            {/* Status Icons */}
            <div className="w-1/3 flex items-center justify-end gap-1.5">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] scale-90">{batteryLevel}%</span>
                <Battery className="w-4 h-4 text-emerald-600 fill-emerald-600/30 rotate-0" />
              </div>
            </div>
          </div>

          {/* Simulated App Header (Only if NOT on splash or login screens) */}
          {currentScreen !== 'splash' && currentScreen !== 'login' && (
            <div
              className="w-full glass-header px-4 flex items-center justify-between shrink-0 shadow-xs border-b border-white/50 text-slate-800"
              style={{ height: '56px' }}
              id="simulation-app-header"
            >
              <div className="flex items-center gap-2">
                {currentScreen === 'dashboard' ? (
                  <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg hover:bg-slate-100 active:scale-95 transition-all text-[#0047AB] cursor-pointer"
                    aria-label="Toggle Side Menu"
                    id="btn-header-menu"
                  >
                    <Menu className="w-5.5 h-5.5 stroke-[2.2]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentScreen('dashboard')}
                    className="p-1.5 rounded-lg hover:bg-slate-100 active:scale-95 transition-all text-[#0047AB] flex items-center cursor-pointer"
                    aria-label="Back to Dashboard"
                    id="btn-header-back"
                  >
                    <ArrowLeft className="w-5.5 h-5.5 stroke-[2.2]" />
                  </button>
                )}
                <span className="font-extrabold text-[11px] tracking-wider text-[#0047AB] bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 uppercase">
                  {language === 'ta' ? 'அ.இ.நீ.க' : 'AINK'}
                </span>
              </div>

              {/* Centered screen titles */}
              <div className="font-extrabold text-xs tracking-wider text-slate-800 uppercase truncate max-w-[125px] text-center">
                {currentScreen === 'dashboard' && (language === 'ta' ? 'முகப்பு' : 'Dashboard')}
                {currentScreen === 'register' && (language === 'ta' ? 'உறுப்பினர் பதிவு' : 'Registration')}
                {currentScreen === 'idcard' && (language === 'ta' ? 'எனது அட்டை' : 'Member ID Card')}
                {currentScreen === 'profile' && (language === 'ta' ? 'சுயவிவரம்' : 'My Profile')}
                {currentScreen === 'news' && (language === 'ta' ? 'செய்திகள்' : 'News & Updates')}
                {currentScreen === 'events' && (language === 'ta' ? 'நிகழ்வுகள்' : 'Party Events')}
                {currentScreen === 'volunteer' && (language === 'ta' ? 'தன்னார்வலர்' : 'Volunteer')}
                {currentScreen === 'contact' && (language === 'ta' ? 'தொடர்புகள்' : 'Contact Us')}
                {currentScreen === 'notifications' && (language === 'ta' ? 'அறிவிப்புகள்' : 'Notifications')}
              </div>

              {/* Alert notifications bell */}
              <button
                onClick={() => setCurrentScreen('notifications')}
                className="relative p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-all active:scale-95 cursor-pointer"
                id="btn-header-notif-bell"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-white flex items-center justify-center text-[7px]"
                    id="alert-notif-dot"
                  ></span>
                )}
              </button>
            </div>
          )}

          {/* Actual Screen Viewport Scroll Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative bg-[#F7F9FC] pb-6 glass-body-bg" id="inner-view-scroll">
            {children}
          </div>

          {/* Bottom Device Navigation Bar (iOS Home Bar indicator or Android Navigation keys) */}
          <div
            className={`w-full py-2 flex items-center justify-center bg-white border-t border-slate-100 ${
              currentScreen === 'splash' ? 'bg-gradient-to-r from-[#0047AB] to-[#008C45] border-t-0 py-3' : ''
            }`}
            style={{ height: '32px' }}
            id="bottom-os-navbar"
          >
            {deviceType === 'ios' ? (
              /* Apple iOS Thin black strip indicator */
              <div className={`w-[110px] h-1.5 rounded-full ${currentScreen === 'splash' ? 'bg-white/70' : 'bg-slate-800'}`}></div>
            ) : (
              /* Google Android Classic 3-Button navigation */
              <div className="w-full h-full flex items-center justify-around px-16 text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    if (currentScreen !== 'splash' && currentScreen !== 'dashboard' && currentScreen !== 'login') {
                      setCurrentScreen('dashboard');
                    } else if (currentScreen === 'dashboard') {
                      toggleSidebar();
                    }
                  }}
                  className="p-1 hover:text-slate-600"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <polygon points="19,5 12,12 5,5 5,19 19,19" />
                  </svg>
                </button>
                <div
                  onClick={() => {
                    if (currentScreen !== 'splash' && currentScreen !== 'dashboard') {
                      setCurrentScreen('dashboard');
                    }
                  }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 hover:border-slate-600 cursor-pointer"
                ></div>
                <div
                  onClick={() => {
                    if (currentScreen !== 'splash' && currentScreen !== 'login') {
                      setCurrentScreen('dashboard');
                    }
                  }}
                  className="w-3 h-3 border-2 border-slate-400 hover:border-slate-600 rotate-45 cursor-pointer"
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Safety certification banner */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>100% Secure Government-Grade Mobile UI System</span>
      </div>
    </div>
  );
}
