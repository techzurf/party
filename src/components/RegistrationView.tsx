/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, ShieldAlert, Sparkles, AlertCircle, MapPin, Calendar, Mail, FileText, Camera, UploadCloud, CheckCircle } from 'lucide-react';
import { Language, UserData } from '../types';
import { TN_DISTRICTS_AND_CONSTITUENCIES } from '../data';

interface RegistrationViewProps {
  language: Language;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onSubmitSuccess: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150', // Female Preset
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150', // Male Preset
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', // Female Preset 2
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150', // Male Preset 2
];

export default function RegistrationView({ language, userData, setUserData, onSubmitSuccess }: RegistrationViewProps) {
  const [formData, setFormData] = useState({
    name: userData.name || '',
    guardian: userData.guardian || '',
    mobile: userData.mobile || '',
    email: userData.email || '',
    gender: userData.gender || 'Male',
    dob: userData.dob || '1998-05-12',
    district: userData.district || 'Chennai / சென்னை',
    constituency: userData.constituency || '',
    address: userData.address || '',
    photo: userData.photo || PRESET_AVATARS[1]
  });

  const [warningMessage, setWarningMessage] = useState('');
  const [constituencyList, setConstituencyList] = useState<string[]>([]);

  // When district changes, update the assembly constituency options list
  useEffect(() => {
    const list = TN_DISTRICTS_AND_CONSTITUENCIES[formData.district] || [];
    setConstituencyList(list);
    // Auto set first constituency of the chosen district if not preset
    if (list.length > 0 && !list.includes(formData.constituency)) {
      setFormData(prev => ({ ...prev, constituency: list[0] }));
    }
  }, [formData.district]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (url: string) => {
    setFormData(prev => ({ ...prev, photo: url }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setWarningMessage(language === 'ta' ? 'படம் 2MB அளவுக்குள் இருக்க வேண்டும்!' : 'Image file must be under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWarningMessage('');

    if (!formData.name.trim()) {
      setWarningMessage(language === 'ta' ? 'தயவுசெய்து உங்கள் முழுப் பெயரை உள்ளிடவும்!' : 'Please enter your full name!');
      return;
    }

    if (formData.mobile.length < 10) {
      setWarningMessage(language === 'ta' ? 'சரியான கைப்பேசி எண்ணைப் பதியவும்!' : 'Please enter a valid 10-digit mobile phone number!');
      return;
    }

    // Generate random mock membership No
    const secureIdNum = 'AINK-' + String(Math.floor(100000 + Math.random() * 900000));
    const cleanDate = new Date().toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Save states globally
    setUserData({
      ...formData,
      membershipNo: secureIdNum,
      joinDate: cleanDate,
      isRegistered: true,
      isLoggedIn: true
    });

    onSubmitSuccess();
  };

  return (
    <div className="px-5 py-5 space-y-5" id="registration-form-view">
      {/* Visual top indicator */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-inner select-none">
        <div>
          <h3 className="font-extrabold text-slate-800 text-xs">
            {language === 'ta' ? 'டிஜிட்டல் உறுப்பினர் சேர்க்கை' : 'Digital Member Registration'}
          </h3>
          <p className="text-[10px] text-slate-500 font-medium">
            {language === 'ta' ? 'அகில இந்தியா நீதி கட்சியின் அதிகாரப்பூர்வ பதிவு' : 'Official registration with full election support'}
          </p>
        </div>
        <div className="bg-[#0047AB] text-white p-2.5 rounded-xl shadow">
          <FileText className="w-5 h-5" />
        </div>
      </div>

      {warningMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-start gap-2.5 text-xs">
          <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
          <span className="font-semibold">{warningMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" id="aink-registration-actual-form">
        
        {/* Profile Picture Upload and Preset selection */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-120">
          <label className="text-xs font-bold text-slate-700 block select-none">
            {language === 'ta' ? 'சுயவிவரப் புகைப்படம் (Profile Photo)' : 'Member Profile Photo'}
          </label>
          
          <div className="flex flex-col items-center gap-3">
            {/* Display active photo */}
            <div className="relative">
              <img
                src={formData.photo}
                alt="Form Preview"
                className="w-20 h-20 rounded-full border-2 border-[#0047AB] object-cover bg-slate-200 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRESET_AVATARS[1];
                }}
              />
              <label htmlFor="file-image-picker" className="absolute bottom-0 right-0 p-1.5 rounded-full bg-red-650 hover:bg-red-700 text-white bg-red-605 cursor-pointer shadow border border-white">
                <Camera className="w-3.5 h-3.5" />
                <input
                  type="file"
                  id="file-image-picker"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Quick Presets Selection */}
            <div className="w-full">
              <p className="text-[10px] text-center text-slate-400 font-bold mb-1.5">
                {language === 'ta' ? 'விரைவு அவதார்கள்:' : 'Or Select Model Preset:'}
              </p>
              <div className="flex justify-center gap-2">
                {PRESET_AVATARS.map((avatar, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                      formData.photo === avatar ? 'border-[#008C45] scale-110 shadow-md' : 'border-slate-350 opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={avatar} alt={`Avatar Preset ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-650 flex items-center gap-1 bg-white select-none" fontSize="11px">
            <User className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>{language === 'ta' ? 'முழுப் பெயர் (ஆவணப்படி)' : 'Full Name (As in ID)'}</span>
          </label>
          <input
            type="text"
            name="name"
            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-xl outline-none text-xs font-semibold text-slate-800"
            placeholder={language === 'ta' ? 'ஜெகதீசன் கார்த்தி' : 'Karthik Jagadeesan'}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Guardian Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-650 flex items-center gap-1 select-none">
            <User className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>{language === 'ta' ? 'தந்தை / கணவர் / காப்பாளர் பெயர்' : 'Father / Spouse Name'}</span>
          </label>
          <input
            type="text"
            name="guardian"
            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-xl outline-none text-xs font-semibold text-slate-800"
            placeholder={language === 'ta' ? 'முத்துசாமி' : 'Muthusamy'}
            value={formData.guardian}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mobile Input (prefilled and customizable) */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-650 flex items-center gap-1 select-none">
            <User className="w-3.5 h-3.5 text-[#0047AB]" />
            <span>{language === 'ta' ? 'கைப்பேசி எண்' : 'Mobile Number'}</span>
          </label>
          <input
            type="tel"
            name="mobile"
            maxLength={10}
            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-xl outline-none text-xs font-semibold text-slate-800"
            placeholder="9876543210"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-650 flex items-center gap-1 select-none">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}</span>
          </label>
          <input
            type="email"
            name="email"
            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-xl outline-none text-xs font-semibold text-slate-800"
            placeholder="member@needhikatchi.org"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Gender & DOB Panel */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-650 block select-none">
              {language === 'ta' ? 'பாலினம்' : 'Gender'}
            </label>
            <select
              name="gender"
              className="block w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-semibold text-slate-800"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">{language === 'ta' ? 'ஆண்' : 'Male'}</option>
              <option value="Female">{language === 'ta' ? 'பெண்' : 'Female'}</option>
              <option value="Transgender">{language === 'ta' ? 'திருநங்கை / திருநம்பி' : 'Transgender'}</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-650 flex items-center gap-1 select-none">
              <Calendar className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>{language === 'ta' ? 'பிறந்த தேதி' : 'Date of Birth'}</span>
            </label>
            <input
              type="date"
              name="dob"
              className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-semibold text-slate-805"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* District & Assembly Constituencies Dynamic selects */}
        <div className="space-y-4 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100">
          <h4 className="text-xs font-black text-emerald-900 select-none flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#008C45]" />
            <span>{language === 'ta' ? 'தொகுதி விபரங்கள்' : 'Constituency & Zone'}</span>
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {/* District */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-650 block">
                {language === 'ta' ? 'மாவட்டம்' : 'District'}
              </label>
              <select
                name="district"
                className="block w-full px-3.5 py-3 bg-white border border-emerald-250 rounded-xl outline-none text-xs font-semibold text-slate-800"
                value={formData.district}
                onChange={handleInputChange}
                required
              >
                {Object.keys(TN_DISTRICTS_AND_CONSTITUENCIES).map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            {/* Assembly Constituency */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-650 block">
                {language === 'ta' ? 'சட்டமன்றத் தொகுதி' : 'Assembly Constituency'}
              </label>
              <select
                name="constituency"
                className="block w-full px-3.5 py-3 bg-white border border-emerald-250 rounded-xl outline-none text-xs font-semibold text-slate-850"
                value={formData.constituency}
                onChange={handleInputChange}
                required
              >
                {constituencyList.map(constituency => (
                  <option key={constituency} value={constituency}>{constituency}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Complete Address */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-650 block select-none">
            {language === 'ta' ? 'முழு முகவரி (அஞ்சல் குறியீட்டுடன்)' : 'Communication Address (With Pincode)'}
          </label>
          <textarea
            name="address"
            rows={3}
            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded-xl outline-none text-xs font-semibold text-slate-800"
            placeholder={language === 'ta' ? 'கதவு எண் 4, நேதாஜி ரோடு, மயிலாப்பூர், சென்னை - 600004' : 'No 4, Netaji Road, Mylapore, Chennai - 600004'}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* ECI Compliance Declaration Box */}
        <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl flex gap-2 text-[10px] leading-relaxed text-orange-950 font-medium my-2">
          <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 select-none mt-0.5" />
          <p>
            {language === 'ta' ? 'அறிவிப்பு: நான் அ.இ.நீ.க கட்சியின் கோட்பாடுகளை ஏற்றுக்கொண்டு இதர அரசியல் அமைப்புகளுடன் தொடர்புடையதாக இல்லை என உறுதி கூறுகிறேன்.' : 'Verification: I attest that I am voluntarily registering with AINK and am not actively associated/joined with any other recognized political parties.'}
          </p>
        </div>

        {/* Submit Register Button */}
        <button
          type="submit"
          className="w-full bg-[#008C45] hover:bg-[#007439] active:scale-95 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 border-b-2 border-emerald-800 cursor-pointer"
          id="btn-submit-registration"
        >
          <CheckCircle className="w-5 h-5 text-white" />
          <span>{language === 'ta' ? 'விண்ணப்பத்தைப் பதிவு செய்' : 'Submit & Connect Digital ID'}</span>
        </button>

      </form>
    </div>
  );
}
