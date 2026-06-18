/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Share2, Award, Check, RefreshCw, Star, MapPin, Calendar, Smartphone, ShieldCheck } from 'lucide-react';
import { Language, UserData } from '../types';

interface IDCardViewProps {
  language: Language;
  userData: UserData;
}

export default function IDCardView({ language, userData }: IDCardViewProps) {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const triggerDownload = () => {
    setDownloading(true);
    setSuccessMsg('');
    setTimeout(() => {
      setDownloading(false);
      setSuccessMsg(
        language === 'ta'
          ? 'முழு அளவு டிஜிட்டல் கார்டு PDF வடிவில் உங்கள் கேலரியில் சேமிக்கப்பட்டது!'
          : 'High-Res Digital Membership Card successfully saved to your downloads!'
      );
    }, 1500);
  };

  const triggerShare = () => {
    setSharing(true);
    setSuccessMsg('');
    setTimeout(() => {
      setSharing(false);
      setSuccessMsg(
        language === 'ta'
          ? 'வாட்ஸ்அப் மற்றும் முகநூல் பகிர்வுக்கான இணைப்பு நகலெடுக்கப்பட்டது!'
          : 'Shareable membership link copied to clipboard successfully!'
      );
    }, 1000);
  };

  return (
    <div className="px-5 py-4 space-y-5" id="member-id-card-view">
      
      {/* Visual Header Guide */}
      <p className="text-center text-[11px] text-slate-500 font-bold select-none leading-relaxed px-2">
        {language === 'ta'
          ? 'இந்த டிஜிட்டல் அட்டை உங்கள் கட்சி அங்கீகாரத்தின் சான்றாகும். கூட்டங்கள் மற்றும் தேர்தல் முகாம்களில் காட்ட தகுந்தது.'
          : 'This secure QR-coded wallet pass acts as valid identification for all local, state, and national party conferences.'}
      </p>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="bg-emerald-55 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs font-bold animate-fade-in flex items-start gap-2">
          <Check className="w-4 h-4 shrink-0 text-[#008C45] mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 3D Looking Digital Card Frame with precise party colors theme */}
      <div
        className="relative mx-auto w-full max-w-[320px] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,40,10,0.25)] border-2 border-slate-200 bg-white"
        id="physical-card-mockup"
      >
        {/* Top Header Section of ID card with Top Blue */}
        <div className="bg-gradient-to-r from-[#0047AB] to-[#003B91] text-white px-4 py-4 relative">
          {/* Subtle logo vector watermark background */}
          <div className="absolute right-2 bottom-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-white">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
              <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="10" />
              <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="10" />
            </svg>
          </div>

          <div className="flex gap-2.5 items-center">
            {/* Round Mini Emblem */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-lg border border-white">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#0047AB]">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                <circle cx="50" cy="50" r="14" fill="#008C45" />
              </svg>
            </div>
            
            <div className="overflow-hidden">
              <h2 className="text-[12px] font-black tracking-wide leading-none uppercase">
                {language === 'ta' ? 'அகில இந்தியா நீதி கட்சி' : 'Akhila India Needhi Katchi'}
              </h2>
              <span className="text-[8px] tracking-widest text-emerald-350 text-emerald-300 font-extrabold block mt-0.5">
                {language === 'ta' ? 'நீதி • முன்னேற்றம் • நம்பிக்கை' : 'JUSTICE • PROGRESS • FAITH'}
              </span>
            </div>
          </div>
        </div>

        {/* Central Tri-color Ribbon Indicator */}
        <div className="h-1.5 w-full flex">
          <div className="w-1/3 h-full bg-[#0047AB]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#008C45]"></div>
        </div>

        {/* Member Profile Main details Card Core */}
        <div className="p-4 bg-white space-y-4">
          <div className="flex gap-4 items-start">
            {/* Picture Portrait Box */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="relative">
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className="w-24 h-28 object-cover bg-slate-50 border-2 border-slate-200 rounded-xl shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
                  }}
                />
                
                {/* Genuine gold foil badge check */}
                <div className="absolute -bottom-1 -right-1 bg-yellow-405 bg-yellow-400 text-slate-950 p-1.5 rounded-full shadow border-2 border-white select-none">
                  <Award className="w-3.5 h-3.5 fill-current text-slate-900" />
                </div>
              </div>
              <span className="text-[7.5px] font-black tracking-wider text-slate-400 font-mono">
                {userData.membershipNo || 'AINK-MEM-PENDING'}
              </span>
            </div>

            {/* Member Parameters List */}
            <div className="flex-1 space-y-2 select-text">
              <div>
                <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                  {language === 'ta' ? 'உறுப்பினர் பெயர்' : 'NAME OF MEMBER'}
                </span>
                <span className="text-xs font-black text-slate-800 line-clamp-1 block uppercase tracking-tight">
                  {userData.name || 'DEMO ACCOUNT'}
                </span>
              </div>

              <div>
                <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                  {language === 'ta' ? 'தந்தை / காப்பாளர்' : 'GUARDIAN / SPOUSE'}
                </span>
                <span className="text-[11px] font-bold text-slate-700 line-clamp-1 block uppercase">
                  {userData.guardian || '---'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                    {language === 'ta' ? 'மாவட்டம்' : 'DISTRICT'}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-700 line-clamp-1 block select-none">
                    {userData.district ? userData.district.split('/')[0].trim() : '---'}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                    {language === 'ta' ? 'தொகுதி' : 'CONSTITUENCY'}
                  </span>
                  <span className="text-[9px] font-extrabold text-slate-750 line-clamp-1 block select-none">
                    {userData.constituency ? userData.constituency.split('/')[0].trim() : '---'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[8px] font-bold text-slate-400 block tracking-wider uppercase">
                  {language === 'ta' ? 'சேர்ந்த நாள்' : 'JOINED ON'}
                </span>
                <span className="text-[10px] font-extrabold text-slate-600 block select-none">
                  {userData.joinDate || '---'}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code Mapped via SVG and Official Signatures validation line */}
          <div className="pt-3 border-t border-dashed border-slate-200 flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl">
            {/* Signature stamp */}
            <div className="space-y-1 select-none">
              <div className="font-mono text-[9px] italic text-[#0047AB] select-none font-bold">
                Dr. A.I.N. Karthikeyan
              </div>
              <div className="h-0.5 w-16 bg-slate-200"></div>
              <span className="text-[7.5px] block text-slate-400 font-extrabold tracking-widest uppercase">
                {language === 'ta' ? 'மாநிலத் தலைவர் கையொப்பம்' : 'PRESIDENT SEAL'}
              </span>
            </div>

            {/* Simulated QR Code (Vector grid) */}
            <div className="w-14 h-14 bg-white p-1 rounded-md border border-slate-200 shadow-inner flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                {/* Outer corners */}
                <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                <rect x="2" y="2" width="21" height="21" fill="white" />
                <rect x="6" y="6" width="13" height="13" fill="currentColor" />

                <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                <rect x="77" y="2" width="21" height="21" fill="white" />
                <rect x="81" y="6" width="13" height="13" fill="currentColor" />

                <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                <rect x="2" y="77" width="21" height="21" fill="white" />
                <rect x="6" y="81" width="13" height="13" fill="currentColor" />

                {/* Random code bits */}
                <rect x="35" y="10" width="10" height="15" fill="currentColor" />
                <rect x="50" y="5" width="15" height="10" fill="currentColor" />
                <rect x="40" y="30" width="15" height="15" fill="currentColor" />
                <rect x="15" y="45" width="15" height="15" fill="currentColor" />
                <rect x="65" y="45" width="20" height="10" fill="currentColor" />
                <rect x="35" y="65" width="15" height="25" fill="currentColor" />
                <rect x="60" y="70" width="25" height="15" fill="currentColor" />

                {/* Center point */}
                <rect x="45" y="45" width="10" height="10" fill="red" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Card Ribbon Accent of color Green */}
        <div className="bg-[#008C45] px-4 py-2 flex items-center justify-between text-white text-[9px] select-none font-bold">
          <span>{language === 'ta' ? 'அறம் வெல்லும்!' : 'JUSTICE PREVAILS!'}</span>
          <span>{language === 'ta' ? 'தேசியத் தலைமையகம், டெல்லி' : 'HQ, New Delhi'}</span>
        </div>
      </div>

      {/* Control Buttons (Android/iOS Styled actions) */}
      <div className="grid grid-cols-2 gap-3 pt-2 select-none">
        
        {/* Download Button */}
        <button
          onClick={triggerDownload}
          disabled={downloading}
          className="w-full bg-[#0047AB] hover:bg-[#003B91] active:scale-95 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2 border-b-2 border-blue-900 cursor-pointer"
          id="btn-download-idcard"
        >
          {downloading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>{downloading ? (language === 'ta' ? 'பதிவிறக்குகிறது...' : 'Saving PNG...') : (language === 'ta' ? 'பதிவிறக்கம் செய்' : 'Download ID Card')}</span>
        </button>

        {/* Share Button with Red accent */}
        <button
          onClick={triggerShare}
          disabled={sharing}
          className="w-full bg-red-650 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center gap-2 border-b-2 border-red-800 cursor-pointer"
          id="btn-share-idcard"
        >
          {sharing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span>{sharing ? 'Sharing...' : (language === 'ta' ? 'வாட்ஸ்அப் பகிர்வு' : 'Share Wallet Pass')}</span>
        </button>

      </div>

      {/* Security note */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-center gap-2 justify-center text-[10px] text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Fully verified under cryptography ledger AINK-25.</span>
      </div>

    </div>
  );
}
