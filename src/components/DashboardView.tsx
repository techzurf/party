/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CreditCard,
  UserPlus,
  Newspaper,
  Calendar,
  HeartHandshake,
  Phone,
  ArrowRight,
  MessageSquare,
  Award,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Info,
  PhoneCall,
  Link,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { ScreenId, Language, UserData, NewsItem, EventItem } from '../types';
import { PARTY_PRESIDENT_MESSAGE } from '../data';

interface DashboardViewProps {
  language: Language;
  userData: UserData;
  newsItems: NewsItem[];
  eventItems: EventItem[];
  setCurrentScreen: (screen: ScreenId) => void;
}

export default function DashboardView({
  language,
  userData,
  newsItems,
  eventItems,
  setCurrentScreen,
}: DashboardViewProps) {
  const [activeTabScheme, setActiveTabScheme] = useState<'women' | 'education' | 'health'>('women');
  const [simulatedCallNumber, setSimulatedCallNumber] = useState<string | null>(null);

  const actions: { id: ScreenId; titleTa: string; titleEn: string; descTa: string; descEn: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'idcard',
      titleTa: 'உறுப்பினர் கார்டு',
      titleEn: 'Digital ID Card',
      descTa: 'QR சரிபார்க்கப்பட்ட உறுப்பினர் அட்டை',
      descEn: 'View secure party identity badge',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-[#0B47AB]'
    },
    {
      id: 'register',
      titleTa: 'உறுப்பினர் சேர்க்கை',
      titleEn: 'Register',
      descTa: 'கைபேசியில் உறுப்பினர் சேர்க்கை படிவம்',
      descEn: 'Apply or edit primary member data',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'bg-[#008C45]'
    },
    {
      id: 'volunteer',
      titleTa: 'தன்னார்வலர் சேர்க்கை',
      titleEn: 'Volunteer Wing',
      descTa: 'கட்சி வேலைகளில் பங்கெடுக்க',
      descEn: 'Register skillsets for public campaigns',
      icon: <HeartHandshake className="w-5 h-5" />,
      color: 'bg-red-600'
    },
    {
      id: 'news',
      titleTa: 'கட்சிச் செய்திகள்',
      titleEn: 'News & Media',
      descTa: 'தலைவரின் அறிக்கைகள் & புகைப்படத்தொகுப்பு',
      descEn: 'Official statements & media updates',
      icon: <Newspaper className="w-5 h-5" />,
      color: 'bg-cyan-600'
    },
    {
      id: 'events',
      titleTa: 'எதிர்வரும் நிகழ்வுகள்',
      titleEn: 'Campaign Events',
      descTa: 'மாநாடுகள் & கலந்துரையாடல்',
      descEn: 'Upcoming community drives & RSVP',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-purple-600'
    },
    {
      id: 'contact',
      titleTa: 'கட்சித் தொடர்புகளுக்கு',
      titleEn: 'Contact Party',
      descTa: 'தலைமையகம் & எமர்ஜென்சி எண்கள்',
      descEn: 'HQ office lines, email, WhatsApp',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-emerald-700'
    }
  ];

  const handleCallSimulation = (label: string, phone: string) => {
    setSimulatedCallNumber(`${label} (${phone})`);
    setTimeout(() => {
      setSimulatedCallNumber(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 px-4 pt-4 pb-8" id="dashboard-container">
      {/* 1. Welcome Card featuring Green/Blue Wave */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B47AB] via-[#0b419c] to-[#008C45] text-white rounded-2xl p-5 shadow-md border-b-4 border-[#008C45]" id="welcome-badge-header">
        {/* Abstract design elements */}
        <div className="absolute right-[-40px] bottom-[-20px] w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
        <div className="absolute left-[25%] top-[-10px] w-24 h-24 bg-yellow-400/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[9px] bg-red-600 font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full inline-block border border-red-500">
              {userData.isRegistered ? (language === 'ta' ? 'அங்கீகரிக்கப்பட்ட உறுப்பினர்' : 'VERIFIED MEMBER') : (language === 'ta' ? 'விருந்தினர் சுயவிவரம்' : 'GUEST PROFILE')}
            </span>
            <h2 className="text-base font-black tracking-tight mt-1.5 truncate max-w-[210px] text-white">
              {language === 'ta' ? 'வணக்கம்,' : 'Welcome,'} {userData.name}!
            </h2>
            <p className="text-[10px] text-emerald-100 font-bold select-none">
              ID: {userData.isRegistered ? userData.membershipNo : 'AINK-GUEST-990'}
            </p>
          </div>

          {/* Quick profile photo circle or generic emblem */}
          <div className="relative cursor-pointer" onClick={() => setCurrentScreen('profile')}>
            <img
              src={userData.photo}
              alt="Member Avatar"
              className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm bg-slate-150"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150';
              }}
            />
            {userData.isRegistered && (
              <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-900 rounded-full p-0.5 border border-white">
                <Award className="w-3.5 h-3.5 fill-current text-slate-800" />
              </span>
            )}
          </div>
        </div>

        {/* Verification banner inside header */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-emerald-100 text-[11px]">
              {userData.isRegistered ? (language === 'ta' ? 'உறுப்பினர் சேர்க்கை தயார்!' : 'Membership fully active') : (language === 'ta' ? 'முழு உறுப்பினராகப் பதியவும்:' : 'Upgrade to life membership')}
            </span>
          </div>
          <button
            onClick={() => setCurrentScreen(userData.isRegistered ? 'idcard' : 'register')}
            className="flex items-center gap-1 text-[11px] font-black text-yellow-300 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-white/10 hover:bg-white/15"
          >
            <span>{userData.isRegistered ? (language === 'ta' ? 'கார்டைப் பார்' : 'View ID') : (language === 'ta' ? 'இப்போதே சேர்' : 'Register')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Emergency Call Alert Overlay feedback */}
      {simulatedCallNumber && (
        <div className="bg-red-50 border-l-4 border-red-600 p-3.5 rounded-xl shadow-md text-slate-800 text-xs flex items-center gap-3 animate-bounce">
          <PhoneCall className="w-5 h-5 text-red-650 animate-pulse shrink-0" />
          <div>
            <p className="font-extrabold text-red-700">{language === 'ta' ? 'அழைப்பு செய்யப்படுகிறது...' : 'Calling Emergency Center...'}</p>
            <p className="text-[10px] text-slate-600 font-semibold">{simulatedCallNumber}</p>
          </div>
        </div>
      )}

      {/* 3. Quick Actions Section (Rounded Grid Layout) */}
      <div className="space-y-3">
        <h3 className="text-slate-800 font-extrabold text-xs select-none uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-4 bg-[#0B47AB] rounded-full inline-block"></span>
          <span>{language === 'ta' ? 'விரைவுச் செயல்பாடுகள்' : 'Quick Actions Portal'}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3" id="dashboard-actions-grid">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => setCurrentScreen(action.id)}
              className="group relative overflow-hidden bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-4 text-left shadow-xs hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col items-start gap-2 h-[115px] justify-between min-h-[48px]"
              id={`dashboard-btn-${action.id}`}
            >
              <div className={`${action.color} text-white p-2.5 rounded-xl transition-transform group-hover:scale-105 shadow-xs`}>
                {action.icon}
              </div>
              <div className="w-full">
                <h4 className="font-bold text-slate-800 text-xs line-clamp-1">
                  {language === 'ta' ? action.titleTa : action.titleEn}
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight line-clamp-2 font-medium mt-0.5">
                  {language === 'ta' ? action.descTa : action.descEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Latest News section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none">
          <h3 className="text-slate-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-red-600 rounded-full inline-block"></span>
            <span>{language === 'ta' ? 'முக்கிய செய்திகள்' : 'Latest Party News'}</span>
          </h3>
          <button
            onClick={() => setCurrentScreen('news')}
            className="text-xs font-bold text-[#0B47AB] hover:text-blue-800 flex items-center gap-1 bg-blue-50/50 py-1.5 px-3 rounded-lg border border-blue-100 min-h-[48px]"
          >
            <span>{language === 'ta' ? 'அனைத்தும்' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight Banner of News */}
        <div
          onClick={() => setCurrentScreen('news')}
          className="relative h-[160px] rounded-xl overflow-hidden cursor-pointer shadow-xs border border-slate-100 group"
          id="btn-news-hero-banner"
        >
          <img
            src={newsItems[0]?.image || "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=400"}
            alt="Hero News"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent flex flex-col justify-end p-4">
            <span className="self-start text-[9px] bg-red-600 text-white font-extrabold uppercase px-2 py-0.5 rounded-md mb-1.5">
              {language === 'ta' ? newsItems[0]?.categoryTa : newsItems[0]?.categoryEn}
            </span>
            <h4 className="text-white font-extrabold text-xs line-clamp-2 group-hover:text-yellow-300 transition-colors leading-snug">
              {language === 'ta' ? newsItems[0]?.titleTa : newsItems[0]?.titleEn}
            </h4>
          </div>
        </div>
      </div>

      {/* 5. Live Announcements Bulletin Ticker */}
      <div className="bg-[#0B47AB]/5 border border-[#0B47AB]/10 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-[#0B47AB] font-black uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0B47AB] animate-ping"></span>
          <span>{language === 'ta' ? 'உடனடி அறிவிப்புகள்' : 'Live Announcements'}</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-lg p-3 text-slate-700 text-xs font-semibold leading-relaxed shadow-xs">
          {language === 'ta' ? (
            <span>📢 **ஜೂன் 25**: மதுரையில் நடைபெற உள்ள கட்சியின் இளைஞர் பாசறை மாநில கருத்தரங்கிற்கு அனைத்து சட்டமன்ற தொகுதி ஒருங்கிணைப்பாளர்களும் உறுப்பினர்களை உடனடியாக பதிவு செய்ய வேண்டுகிறோம்!</span>
          ) : (
            <span>📢 **June 25**: We urge all Assembly Constituency Coordinators to register members immediately for the upcoming State Youth Conclave in Madurai!</span>
          )}
        </div>
      </div>

      {/* 6. Upcoming Events Screen Widget */}
      <div className="space-y-3">
        <div className="flex justify-between items-center select-none">
          <h3 className="text-slate-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-[#0B47AB] rounded-full inline-block"></span>
            <span>{language === 'ta' ? 'எதிர்வரும் நிகழ்வுகள்' : 'Upcoming Gatherings'}</span>
          </h3>
          <button
            onClick={() => setCurrentScreen('events')}
            className="text-xs font-bold text-[#0B47AB] hover:text-blue-800 flex items-center gap-1 min-h-[48px]"
          >
            <span>{language === 'ta' ? 'முகாம்கள்' : 'View Events'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4 items-start shadow-xs hover:bg-slate-50 transition-all cursor-pointer" onClick={() => setCurrentScreen('events')}>
          <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 text-orange-800 flex flex-col items-center justify-center font-extrabold shrink-0 shadow-xs leading-none">
            <span className="text-[9px] uppercase tracking-wider text-orange-700 font-extrabold">JUNE</span>
            <span className="text-base font-black mt-1">25</span>
          </div>
          <div>
            <span className="text-[9px] text-[#0B47AB] bg-blue-100 font-extrabold tracking-wider px-2 py-0.5 rounded-md">MADURAI / மதுரை</span>
            <h4 className="font-extrabold text-slate-850 text-xs mt-1.5 line-clamp-1">
              {language === 'ta' ? eventItems[0]?.titleTa : eventItems[0]?.titleEn}
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 flex items-center gap-1 font-semibold">
              <MapPin className="w-3 h-3 text-[#008C45]" />
              <span>{language === 'ta' ? eventItems[0]?.locationTa : eventItems[0]?.locationEn}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 7. Government Schemes Helpdesk Card Section */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-4 shadow-xs" id="schemes-section">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <div className="p-2 rounded-lg bg-[#008C45]/10 text-[#008C45]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
              {language === 'ta' ? 'அரசு நலத்திட்டங்கள் உதவி மையம்' : 'TN Government Schemes help desk'}
            </h3>
            <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
              {language === 'ta' ? 'எப்படி விண்ணப்பிப்பது என்ற வழிகாட்டி' : 'Step-by-step applying support'}
            </p>
          </div>
        </div>

        {/* Schemes tabs */}
        <div className="flex bg-slate-50 rounded-lg p-0.5 text-[11px] font-bold select-none border border-slate-150">
          <button
            onClick={() => setActiveTabScheme('women')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeTabScheme === 'women'
                ? 'bg-[#008C45] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ta' ? 'மகளிர்' : 'Women'}
          </button>
          <button
            onClick={() => setActiveTabScheme('education')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeTabScheme === 'education'
                ? 'bg-[#008C45] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ta' ? 'கல்வி' : 'Education'}
          </button>
          <button
            onClick={() => setActiveTabScheme('health')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeTabScheme === 'health'
                ? 'bg-[#008C45] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {language === 'ta' ? 'மருத்துவம்' : 'Health'}
          </button>
        </div>

        {/* Tab content */}
        <div className="text-xs space-y-3">
          {activeTabScheme === 'women' && (
            <div className="space-y-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 animate-fadeIn">
              <h4 className="font-extrabold text-slate-800 text-[11px] flex items-center gap-1.5 text-[#008C45]">
                <CheckCircle2 className="w-4 h-4" />
                <span>கலைஞர் மகளிர் உரிமைத் தொகை</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                {language === 'ta'
                  ? 'தகுதி வாய்ந்த தமிழ்நாட்டு குடும்பத் தலைவிகளுக்கு மாதம் ரூ.1,000 உரிமைத் தொகை வழங்கும் திட்டம். எங்கள் கிளை அலுவலகம் மூலம் விண்ணப்பிக்கலாம்.'
                  : 'Provides Rs. 1,000/month to eligible women heads of families. Reach out to our nearest party branch for registration assistance.'}
              </p>
              <div className="text-[10px] bg-white px-2 py-1 rounded border border-emerald-150 text-[#008C45] font-bold">
                {language === 'ta' ? 'தேவையானவை: ரேஷன் கார்டு, ஆதார், வங்கி கணக்கு புத்தகம்.' : 'Required: Ration ID, Aadhaar card, Bank Passbook.'}
              </div>
            </div>
          )}

          {activeTabScheme === 'education' && (
            <div className="space-y-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 animate-fadeIn">
              <h4 className="font-extrabold text-slate-800 text-[11px] flex items-center gap-1.5 text-[#008C45]">
                <CheckCircle2 className="w-4 h-4" />
                <span>புதுமைப் பெண் திட்டம்</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                {language === 'ta'
                  ? 'அரசுப் பள்ளிகளில் 6 முதல் 12-ம் வகுப்பு வரை படித்து உயர்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ரூ.1,000 உதவித்தொகை.'
                  : 'Financial assistance of Rs. 1,000/month for female college students who studied from classes 6 to 12 in government schools.'}
              </p>
              <div className="text-[10px] bg-white px-2 py-1 rounded border border-emerald-150 text-[#008C45] font-bold">
                {language === 'ta' ? 'தேவையானவை: பள்ளி மாற்று சான்றிதழ், கல்லூரி சேர்க்கை ஆவணம்.' : 'Required: School TC, College admission slip.'}
              </div>
            </div>
          )}

          {activeTabScheme === 'health' && (
            <div className="space-y-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 animate-fadeIn">
              <h4 className="font-extrabold text-slate-800 text-[11px] flex items-center gap-1.5 text-[#008C45]">
                <CheckCircle2 className="w-4 h-4 text-[#008C45]" />
                <span>மக்களைத் தேடி மருத்துவம்</span>
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                {language === 'ta'
                  ? 'வீடுகளுக்கே நேரடியாகச் சென்று சர்க்கரை நோய், இரத்த அழுத்த பரிசோதனைகள் மற்றும் இலவச மருந்துகள் வழங்கும் அரசு திட்டம்.'
                  : 'Doorstep medical check-ups and generic drug distribution directly at home for chronic patients.'}
              </p>
              <div className="text-[10px] bg-white px-2 py-1 rounded border border-emerald-150 text-[#008C45] font-bold">
                {language === 'ta' ? 'பயன்பெற: இலவச எண் 104 அல்லது உங்கள் பகுதி ஊராட்சி மருத்துவரை நாடவும்.' : 'To request: Dial 104 or consult local Panchayat PHC doctors.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 8. Emergency Public Contacts Support section */}
      <div className="space-y-3 p-4 bg-red-50/50 border border-red-100 rounded-xl">
        <h3 className="text-red-800 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{language === 'ta' ? 'அவசர உதவி அழைப்பு எண்கள்' : 'Emergency State Contacts'}</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleCallSimulation(language === 'ta' ? 'மாநில மகளிர் உதவி' : 'Women Helpline', '181')}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-100 hover:bg-slate-100 text-left min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-red-650" />
            <div>
              <p className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">Women Helpline</p>
              <p className="text-xs font-black text-rose-700">181</p>
            </div>
          </button>

          <button
            onClick={() => handleCallSimulation(language === 'ta' ? 'ஆம்புலன்ஸ் சேவை' : 'Panchayat Health Line', '108')}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-100 hover:bg-slate-100 text-left min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-red-650" />
            <div>
              <p className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">Ambulance Cell</p>
              <p className="text-xs font-black text-rose-700">108</p>
            </div>
          </button>

          <button
            onClick={() => handleCallSimulation(language === 'ta' ? 'முதியோர் பாதுகாப்பு' : 'Elders Protection', '14567')}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-100 hover:bg-slate-100 text-left min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-red-650" />
            <div>
              <p className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">Senior Citizen</p>
              <p className="text-xs font-black text-rose-700">14567</p>
            </div>
          </button>

          <button
            onClick={() => handleCallSimulation(language === 'ta' ? 'கட்சி சட்ட உதவி' : 'AINK Legal Rights Desk', '044-2450-1234')}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-100 hover:bg-slate-100 text-left min-h-[48px]"
          >
            <Phone className="w-4 h-4 text-red-650" />
            <div>
              <p className="text-[7.5px] uppercase tracking-wider text-slate-400 font-bold">AINK Legal Desk</p>
              <p className="text-[10px] font-black text-rose-700">044-AIN-LAW</p>
            </div>
          </button>
        </div>
      </div>

      {/* 9. Party President Message Quote Card */}
      <div className="bg-white border border-slate-100 rounded-xl p-5 relative overflow-hidden shadow-xs">
        <div className="absolute top-2 right-4 text-emerald-800/10">
          <MessageSquare className="w-16 h-16 fill-current" />
        </div>

        <div className="flex items-center gap-3 select-none">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
            alt="State President Dr. A.I.N. Karthikeyan"
            className="w-11 h-11 rounded-full border-2 border-emerald-600 object-cover shadow"
          />
          <div>
            <h4 className="font-extrabold text-slate-800 text-xs">
              {language === 'ta' ? PARTY_PRESIDENT_MESSAGE.nameTa : PARTY_PRESIDENT_MESSAGE.nameEn}
            </h4>
            <span className="text-[9px] text-[#0B47AB] bg-blue-50 font-black tracking-wider uppercase px-1.5 py-0.5 rounded border border-blue-100">
              {language === 'ta' ? PARTY_PRESIDENT_MESSAGE.designationTa : PARTY_PRESIDENT_MESSAGE.designationEn}
            </span>
          </div>
        </div>

        <blockquote className="mt-4 text-xs italic text-slate-600 font-medium leading-relaxed border-l-2 border-[#0B47AB] pl-3">
          "{language === 'ta' ? PARTY_PRESIDENT_MESSAGE.messageTa : PARTY_PRESIDENT_MESSAGE.messageEn}"
        </blockquote>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold select-none text-[#008C45]">
          <span>{language === 'ta' ? 'நீதி • முன்னேற்றம் • நம்பிக்கை' : 'JUSTICE • PROGRESS • TRUST'}</span>
          <span className="font-mono text-[9px] text-slate-400">#AINK2026</span>
        </div>
      </div>

      {/* 10. Important links & official public portals */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3.5 shadow-xs">
        <h4 className="text-xs font-extrabold text-slate-850 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
          <Link className="w-4 h-4 text-[#0B47AB]" />
          <span>{language === 'ta' ? 'முக்கிய அரசு இணையதளங்கள்' : 'Important Public Links'}</span>
        </h4>
        
        <div className="space-y-2 text-xs">
          <a
            href="https://www.tn.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors font-semibold"
          >
            <span className="truncate">{language === 'ta' ? 'தமிழ்நாடு அரசு இணையதளம் (TN Portal)' : 'Govt of Tamil Nadu Website'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors font-semibold"
          >
            <span className="truncate">{language === 'ta' ? 'தேர்தல் ஆணையம் வாக்காளர் சேவை' : 'ECI Voter Services Desk'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>

          <a
            href="https://cmhelpline.tnega.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors font-semibold"
          >
            <span className="truncate">{language === 'ta' ? 'முதலமைச்சரின் உதவி மையம் (1100)' : 'State CM Helpline & Redressal'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </a>
        </div>
      </div>

      {/* Security standard seal */}
      <div className="text-center py-2 flex items-center justify-center gap-1.5 text-slate-400 text-[10px] font-semibold tracking-wider">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>REGULATED UNDER ELECTION RULES #AINK-2026</span>
      </div>
    </div>
  );
}
