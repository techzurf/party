/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldAlert, BadgeCheck, Phone, Mail, Award, Check, Settings, MapPin, Edit3, Save, Compass, Sparkles, RefreshCw, LogOut } from 'lucide-react';
import { Language, UserData } from '../types';

interface ProfileViewProps {
  language: Language;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onLogout: () => void;
  onPrefill: () => void;
  onReset: () => void;
}

export default function ProfileView({ language, userData, setUserData, onLogout, onPrefill, onReset }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedEmail, setEditedEmail] = useState(userData.email);
  const [editedMobile, setEditedMobile] = useState(userData.mobile);
  const [editedAddress, setEditedAddress] = useState(userData.address);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!editedName.trim()) {
      return;
    }

    setUserData(prev => ({
      ...prev,
      name: editedName,
      email: editedEmail,
      mobile: editedMobile,
      address: editedAddress
    }));

    setIsEditing(false);
    setSuccessMsg(
      language === 'ta'
        ? 'சுயவிவர மாற்றங்கள் வெற்றிகரமாக சேமிக்கப்பட்டது!'
        : 'Profile details successfully updated and secured!'
    );

    // Auto clear success banner
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="px-4 py-4 space-y-4" id="member-profile-view">
      
      {/* Top Banner (Avatar & Status) */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
        <div className="relative z-10 flex items-center gap-4">
          <img
            src={userData.photo}
            alt={userData.name}
            className="w-16 h-16 rounded-full border-2 border-[#008C45] object-cover shadow"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
            }}
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[130px]">{userData.name}</h2>
              {userData.isRegistered && (
                <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-slate-350 mt-0.5">
              ID: {userData.isRegistered ? userData.membershipNo : 'AINK-GUEST-001'}
            </p>
            <div className="inline-block mt-1">
              <span className="bg-blue-600/30 text-blue-300 text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md border border-blue-500/30">
                {language === 'ta' ? 'மாநிலத் தொண்டர்' : 'STATE WORKER'}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative corner circles */}
        <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-[#008C45]/15 rounded-full pointer-events-none"></div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-3 rounded-xl text-xs font-bold animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-[#008C45]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Profile Editing State Form */}
      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm" id="edit-profile-form">
          <h3 className="font-extrabold text-slate-800 text-xs border-b border-slate-100 pb-2 select-none uppercase tracking-wide flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-[#0047AB]" />
            <span>{language === 'ta' ? 'விபரங்களைத் திருத்துக' : 'Edit Member Data'}</span>
          </h3>

          {/* Edit Name */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">{language === 'ta' ? 'முழுப் பெயர்' : 'Full Name'}</label>
            <input
              type="text"
              className="text-xs font-semibold text-slate-800 block w-full px-3 py-2 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              required
            />
          </div>

          {/* Edit Email */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">{language === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}</label>
            <input
              type="email"
              className="text-xs font-semibold text-slate-800 block w-full px-3 py-2 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </div>

          {/* Edit Mobile */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">{language === 'ta' ? 'கைப்பேசி எண்' : 'Mobile Number'}</label>
            <input
              type="tel"
              maxLength={10}
              className="text-xs font-semibold text-slate-800 block w-full px-3 py-2 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              value={editedMobile}
              onChange={(e) => setEditedMobile(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          {/* Edit Address */}
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase block">{language === 'ta' ? 'முழு முகவரி' : 'Postal Address'}</label>
            <input
              type="text"
              className="text-xs font-semibold text-slate-800 block w-full px-3 py-2 bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
            />
          </div>

          {/* Save & Cancel buttons */}
          <div className="flex gap-2 pt-1 font-bold">
            <button
              type="submit"
              className="flex-1 bg-[#008C45] text-white py-2.5 rounded-xl text-xs hover:bg-[#007439] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              id="btn-profile-save"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'ta' ? 'மாற்றங்களை சேமி' : 'Save Details'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 border border-slate-200 text-slate-600 bg-slate-50 py-2.5 rounded-xl text-xs hover:bg-slate-100 text-center"
            >
              {language === 'ta' ? 'ரத்து செய்' : 'Cancel'}
            </button>
          </div>
        </form>
      ) : (
        /* Regular Profile Info List */
        <div className="space-y-4">
          
          {/* Section 1: Member parameters cards */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3.5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wide flex items-center gap-1.5 select-none">
                <Compass className="w-4 h-4 text-[#0047AB]" />
                <span>{language === 'ta' ? 'உறுப்பினர் விபரங்கள்' : 'Membership File'}</span>
              </h3>
              
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 py-1.5 px-3 rounded-lg border border-blue-100 transition-all active:scale-95 cursor-pointer"
                id="btn-profile-edit-toggle"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'தொகு' : 'Edit'}</span>
              </button>
            </div>

            {/* Parameter Items */}
            <div className="space-y-3 font-medium text-xs">
              
              {/* Full Name display */}
              <div className="flex justify-between items-start gap-4 p-1.5 hover:bg-slate-50 rounded-lg">
                <span className="text-slate-450 uppercase text-[10px] tracking-wider font-bold shrink-0">{language === 'ta' ? 'முழுப் பெயர்:' : 'Full Name:'}</span>
                <span className="text-slate-800 font-extrabold text-right">{userData.name}</span>
              </div>

              {/* Guardian display */}
              <div className="flex justify-between items-start gap-4 p-1.5 hover:bg-slate-50 rounded-lg">
                <span className="text-slate-450 uppercase text-[10px] tracking-wider font-bold shrink-0">{language === 'ta' ? 'தந்தை / காப்பாளர்:' : 'Fathers/Guardian:'}</span>
                <span className="text-slate-800 font-bold text-right">{userData.guardian || '---'}</span>
              </div>

              {/* District & constituency display */}
              <div className="flex justify-between items-start gap-4 p-1.5 hover:bg-slate-50 rounded-lg">
                <span className="text-slate-450 uppercase text-[10px] tracking-wider font-bold shrink-0">{language === 'ta' ? 'வசிப்பிடம் / தொகுதி:' : 'Division/District:'}</span>
                <span className="text-slate-800 font-bold text-right select-none">{userData.district ? userData.district : '---'}</span>
              </div>

              {/* Mobil phone */}
              <div className="flex justify-between items-center gap-4 p-1.5 hover:bg-slate-50 rounded-lg">
                <span className="text-slate-450 uppercase text-[10px] tracking-wider font-bold shrink-0 flex items-center gap-1 select-none">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'ta' ? 'பேசி எண்:' : 'Mobile Num:'}</span>
                </span>
                <span className="text-slate-800 font-mono font-bold">+91 {userData.mobile}</span>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center gap-4 p-1.5 hover:bg-slate-50 rounded-lg">
                <span className="text-slate-450 uppercase text-[10px] tracking-wider font-bold shrink-0 flex items-center gap-1 select-none">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'ta' ? 'மின்னஞ்சல்:' : 'Email address:'}</span>
                </span>
                <span className="text-slate-700 font-bold truncate max-w-[170px]">{userData.email || '---'}</span>
              </div>

            </div>
          </div>

          {/* Section 2: Membership Badging details */}
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 shadow-sm space-y-3">
            <h4 className="text-xs font-black text-amber-900 select-none flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>{language === 'ta' ? 'தேர்தல் கட்சி அத்தாட்சி' : 'ECI Party Credentials'}</span>
            </h4>

            <div className="space-y-2 text-[11px] leading-relaxed text-amber-950 font-medium font-semibold">
              <p>
                {language === 'ta'
                  ? '• பதிவு விபரம்: உங்கள் கைப்பேசி எண் மற்றும் ஆதார் விவரங்கள் பாதுகாப்பாக உள்கட்டமைப்பில் பதிந்துள்ளன.'
                  : '• Ledger status: Cryptographically mapped in server node. Complete backup is available.'}
              </p>
              <p>
                {language === 'ta'
                  ? '• இந்த செயலியின் மூலம் கட்சியின் அனைத்து பொதுக் கூட்டங்களுக்கும் உங்களுக்கு முன்வரிசை முன்னுரிமை வழங்கப்படும்.'
                  : '• Pass advantage: Verified digital gate credentials for State Committee & General Assembly meetups.'}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Simulation Tools (In-App Playground controls) */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs" id="simulation-tools-panel">
        <h3 className="font-extrabold text-[10px] text-slate-700 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 pb-2 select-none">
          <Settings className="w-3.5 h-3.5 text-slate-500" />
          <span>{language === 'ta' ? 'அபிவிருத்தி சோதனை கருவிகள்' : 'Developer Simulation Panel'}</span>
        </h3>

        <div className="flex flex-col gap-2">
          {!userData.isRegistered ? (
            <button
              onClick={onPrefill}
              className="w-full bg-gradient-to-r from-[#0B47AB] to-[#008C45] text-white py-3 px-3 rounded-xl text-xs font-black active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[48px]"
              id="profile-btn-prefill"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>{language === 'ta' ? 'மாதிரி உறுப்பினர் தகவல் பூர்த்தியிடுக' : 'Instant Auto-Fill & Register'}</span>
            </button>
          ) : (
            <div className="text-center py-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-extrabold border border-emerald-150 select-none">
              {language === 'ta' ? '✓ மாதிரி உறுப்பினர் பதிவு செய்யப்பட்டுள்ளது' : '✓ Demo Member Details Successfully Loaded'}
            </div>
          )}

          <div className="flex gap-2 font-black">
            <button
              onClick={onReset}
              className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[48px]"
              id="profile-btn-reset"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'ta' ? 'மீளமை' : 'Reset'}</span>
            </button>

            <button
              onClick={onLogout}
              className="flex-1 border border-red-200 bg-red-55 bg-red-50 hover:bg-red-100 text-red-650 text-red-600 py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold min-h-[48px]"
              id="profile-btn-logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'வெளியேறு' : 'Logout Unit'}</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
