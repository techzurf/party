/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ExternalLink, HelpCircle, Shield, Award } from 'lucide-react';
import { Language } from '../types';

interface ContactViewProps {
  language: Language;
}

export default function ContactView({ language }: ContactViewProps) {
  const officeDetails = {
    addressTa: 'அகில இந்தியா நீதி கட்சி தலைமை காரியாலயம், கதவு எண் 45, அண்ணா சாலை, சோழிங்கநல்லூர், சென்னை - 600119',
    addressEn: 'Akhila India Needhi Katchi State HQ, Door No. 45, Anna Salai, Sholinganallur, Chennai - 600119',
    phone: '+91 44 2456 7890',
    whatsapp: '+91 99999 55555',
    email: 'contact@needhikatchi.org',
    hoursTa: 'திங்கள் - சனி (காலை 10:00 - மாலை 6:00)',
    hoursEn: 'Monday - Saturday (10:00 AM - 6:00 PM)'
  };

  const handleDial = (channel: 'call' | 'whatsapp' | 'email') => {
    if (channel === 'call') {
      alert(language === 'ta' ? `தொடர்பு எண் டயல் செய்யப்படுகிறது: ${officeDetails.phone}` : `Dialing state registry office: ${officeDetails.phone}`);
    } else if (channel === 'whatsapp') {
      alert(language === 'ta' ? `வாட்ஸ்அப் சாட் துவங்கப்படுகிறது: ${officeDetails.whatsapp}` : `Opening official AINK secure Chat: ${officeDetails.whatsapp}`);
    } else {
      alert(language === 'ta' ? `மின்னஞ்சல் அனுப்பப்படுகிறது: ${officeDetails.email}` : `Opening mail client to: ${officeDetails.email}`);
    }
  };

  return (
    <div className="px-4 py-4 space-y-4 text-xs font-semibold" id="contact-us-view">
      
      {/* Official Page Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100" id="contact-section-branding-header">
        <img 
          src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
          alt="AINK Logo" 
          className="w-10 h-10 object-contain shrink-0" 
          referrerPolicy="no-referrer"
        />
        <div>
          <h2 className="text-[13px] font-black text-[#0047AB] tracking-wide uppercase leading-tight">
            {language === 'ta' ? 'தொடர்புகளுக்கு' : 'CONTACT HELPLINE'}
          </h2>
          <p className="text-[10px] text-[#008C45] font-extrabold mt-0.5 leading-none">
            {language === 'ta' ? 'அகில இந்திய நீதி கட்சி உதவிப் பிரிவு' : 'AINK Support & State Headquarters'}
          </p>
        </div>
      </div>
      
      {/* 1. Address block with premium material card details */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="font-extrabold text-slate-800 text-xs border-b border-slate-100 pb-2 select-none uppercase tracking-wide flex items-center gap-1.5">
          <MapPin className="w-4.5 h-4.5 text-[#0047AB]" />
          <span>{language === 'ta' ? 'தலைமை அலுவலகம்' : 'State Headquarters Office'}</span>
        </h3>

        <p className="text-[11px] leading-relaxed text-slate-700 select-text">
          {language === 'ta' ? officeDetails.addressTa : officeDetails.addressEn}
        </p>

        <div className="flex items-center gap-2 text-slate-500 text-[10.5px] select-none pt-1">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{language === 'ta' ? officeDetails.hoursTa : officeDetails.hoursEn}</span>
        </div>
      </div>

      {/* 2. Call-to-action interactive channels */}
      <div className="space-y-2 select-none" id="contact-action-channels">
        <h4 className="text-slate-400 uppercase text-[9px] tracking-widest font-black pl-2">
          {language === 'ta' ? 'விரைவுத் தொடர்புகள்' : 'Direct Helpline Channels'}
        </h4>

        {/* WhatsApp Button */}
        <button
          onClick={() => handleDial('whatsapp')}
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-3.5 rounded-xl transition-all flex items-center justify-between font-extrabold shadow cursor-pointer border-b-2 border-emerald-800"
          id="btn-contact-whatsapp"
        >
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 fill-current" />
            <div className="text-left">
              <span className="block text-xs font-black">{language === 'ta' ? 'வாட்ஸ்அப் (WhatsApp) உதவி' : 'Chat via WhatsApp'}</span>
              <span className="text-[9px] text-emerald-100 font-bold block">{officeDetails.whatsapp}</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </button>

        {/* Call Dialer Button */}
        <button
          onClick={() => handleDial('call')}
          className="w-full bg-[#0047AB] hover:bg-[#003B91] active:scale-95 text-white p-3.5 rounded-xl transition-all flex items-center justify-between font-extrabold shadow cursor-pointer border-b-2 border-blue-900"
          id="btn-contact-call"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 fill-current" />
            <div className="text-left">
              <span className="block text-xs font-black">{language === 'ta' ? 'அலுவலகத்தை அழைக்க' : 'Press to call Desk'}</span>
              <span className="text-[9px] text-blue-100 font-bold block">{officeDetails.phone}</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </button>

        {/* Email Mailer Button */}
        <button
          onClick={() => handleDial('email')}
          className="w-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white p-3.5 rounded-xl transition-all flex items-center justify-between font-extrabold shadow cursor-pointer border-l-4 border-red-650"
          id="btn-contact-email"
        >
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <span className="block text-xs font-black">{language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Send Official Mail'}</span>
              <span className="text-[9px] text-slate-350 font-bold block">{officeDetails.email}</span>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-70" />
        </button>
      </div>

      {/* 3. Static Maps Representation Embed (Simulated vector graphic container) */}
      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-2 select-none text-center">
        <h4 className="text-slate-850 text-xs font-extrabold text-left flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ta' ? 'அமைவிட வரைபடம்' : 'Digital Map Coordinates'}</span>
        </h4>

        {/* Vector representation of map */}
        <div className="h-[100px] bg-slate-200 rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-300">
          {/* Mock lines showing roads */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-0 h-2 bg-slate-700 w-full rotate-12"></div>
            <div className="absolute left-1/3 top-0 w-3 bg-slate-700 h-full -rotate-45"></div>
            <div className="absolute left-2/3 top-0 w-3 bg-slate-700 h-full rotate-45"></div>
            <div className="absolute top-1/3 left-0 h-1.5 bg-slate-700 w-full -rotate-6"></div>
          </div>

          {/* Glowing party pin */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <div className="bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white">
              <Award className="w-4 h-4" />
            </div>
            <span className="bg-slate-900 text-white font-extrabold text-[8px] px-2 py-0.5 rounded-full uppercase mt-1">
              AINK HQ Salai
            </span>
          </div>
        </div>
      </div>

      {/* Legal warning badge */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[10px] text-slate-500 flex items-start gap-2 leading-relaxed">
        <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          {language === 'ta'
            ? 'தகவல் அறியும் உரிமைச் சட்டம் மற்றும் இந்திய தேர்தல் சட்ட விதிமுறைக்கு உட்பட்டு உங்களது அனைத்து விபரங்களும் தகுந்த பாதுகாப்பு குறியாக்கத்தோடு வைக்கப்பட்டுள்ளன.'
            : 'All data communication is cryptographically audited in alignment with standard election support units.'}
        </p>
      </div>

    </div>
  );
}
