/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';
import { Language } from '../types';

interface SplashViewProps {
  language: Language;
  onEnter: () => void;
}

export default function SplashView({ language, onEnter }: SplashViewProps) {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-[#0047AB] via-[#0047AB] to-[#008C45] text-white flex flex-col justify-between p-8 text-center select-none animate-fade-in"
      id="splash-screen-container"
    >
      {/* Decorative background lights */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Tagline */}
      <div className="pt-8 flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/20">
          <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
          <span>{language === 'ta' ? 'அதிகாரப்பூர்வ செயலி' : 'OFFICIAL PARTY PORTAL'}</span>
        </div>
      </div>

      {/* Centered Logo & Brand name */}
      <div className="flex flex-col items-center justify-center gap-6 my-auto">
        <div className="relative w-32 h-32 rounded-full border-4 border-white/90 bg-white shadow-2xl flex items-center justify-center p-3 animate-pulse duration-[3000ms]">
          <img 
            src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
            alt="Akhila India Needhi Katchi Logo" 
            className="w-full h-full object-contain" 
            referrerPolicy="no-referrer"
          />
          {/* Mini star at bottom */}
          <div className="absolute -bottom-1 bg-red-600 text-white rounded-full p-1 border-2 border-white">
            <Star className="w-3 h-3 fill-current text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight leading-none drop-shadow-md">
            {language === 'ta' ? 'அகில இந்தியா' : 'AKHILA INDIA'}
          </h1>
          <h2 className="text-4xl font-black text-yellow-300 tracking-wider leading-none drop-shadow">
            {language === 'ta' ? 'நீதி கட்சி' : 'NEEDHI KATCHI'}
          </h2>
          <p className="text-[11px] text-blue-100 uppercase tracking-widest font-bold">
            {language === 'ta' ? 'அனைவருக்குமான நீதி, வளர்ச்சி, நேர்மை' : 'All-India Justice for All'}
          </p>
        </div>

        {/* Dynamic Glowing Party Motto in Tamil */}
        <div className="mt-4 bg-black/25 backdrop-blur-xs text-yellow-100 border border-white/10 py-2.5 px-6 rounded-full inline-flex flex-col items-center justify-center shadow-inner gap-1 min-w-[240px]">
          <span className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
            {language === 'ta' ? 'கட்சியின் கொள்கை முழக்கம்' : 'OUR SACRED MOTTO'}
          </span>
          <span className="text-base font-extrabold tracking-widest text-[#FFF] animate-pulse">
            நீதி • முன்னேற்றம் • நம்பிக்கை
          </span>
        </div>
      </div>

      {/* Button and security stamp */}
      <div className="flex flex-col gap-4 items-center mb-6">
        <button
          onClick={onEnter}
          className="w-full max-w-[280px] bg-white hover:bg-slate-100 active:scale-95 text-slate-900 border-2 border-white hover:border-yellow-300 font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-yellow-300/20 tracking-wider transition-all uppercase flex items-center justify-center gap-3 group"
          id="btn-splash-enter"
        >
          <span>{language === 'ta' ? 'செயலிக்குள் நுழைக' : 'Get Started'}</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform stroke-[3px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5 text-[10px] text-white/60 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'இந்திய தேர்தல் ஆணையம் அங்கீகரித்தது' : 'ECI Registered Political Unit'}</span>
        </div>
      </div>
    </div>
  );
}
