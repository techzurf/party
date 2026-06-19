/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, ShieldAlert, KeyRound, CheckCircle, RefreshCw, Sparkles, LogIn } from 'lucide-react';
import { Language } from '../types';

interface LoginViewProps {
  language: Language;
  onLoginSuccess: (mobileNum: string) => void;
  onJoinPartyClick: () => void;
}

export default function LoginView({ language, onLoginSuccess, onJoinPartyClick }: LoginViewProps) {
  const [mobile, setMobile] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sentOtp, setSentOtp] = useState('123456');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Simple 10-digit validation
    const digitsOnly = mobile.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setErrorMsg(
        language === 'ta'
          ? 'தயவுசெய்து சரியான 10-இலக்க செல்போன் எண்ணை உள்ளிடவும்!'
          : 'Please enter a valid 10-digit mobile number!'
      );
      return;
    }

    setLoading(true);
    // Simulate API request trigger
    setTimeout(() => {
      setLoading(false);
      // Generate random mock code
      const generatedCode = String(Math.floor(100000 + Math.random() * 900000));
      setSentOtp(generatedCode);
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const typedCode = otpCode.join('');
    
    if (typedCode.length < 6) {
      setErrorMsg(
        language === 'ta'
          ? '6-இலக்க ஓடிபி குறியீட்டையும் சரியாக உள்ளிடவும்!'
          : 'Please enter all 6 digits of the OTP!'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typedCode === sentOtp || typedCode === '123456') {
        onLoginSuccess(mobile);
      } else {
        setErrorMsg(
          language === 'ta'
            ? 'தவறான ஓடிபி குறியீடு! மீண்டும் முயற்சிக்கவும்.'
            : 'Incorrect OTP! Please try again.'
        );
      }
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col justify-between" id="login-view-container">
      {/* Dynamic Top Header Card */}
      <div className="relative shrink-0 text-slate-800 bg-white/75 backdrop-blur-md px-5 pt-8 pb-10 rounded-b-[36px] overflow-hidden shadow-xs border-b border-slate-100">
        {/* Decorative elements */}
        <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-blue-500/5 rounded-full pointer-events-none"></div>
        <div className="absolute -left-10 bottom-2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md p-1.5 border border-slate-200 shrink-0">
            <img 
              src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
              alt="AINK Logo" 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#0047AB]">
              {language === 'ta' ? 'அகில இந்தியா நீதி கட்சி' : 'Akhila India Needhi Katchi'}
            </h2>
            <p className="text-[9px] text-[#008C45] font-extrabold tracking-wider uppercase">
              {language === 'ta' ? 'நீதி • முன்னேற்றம் • நம்பிக்கை' : 'JUSTICE • PROGRESS • FAITH'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            {step === 'phone'
              ? language === 'ta'
                ? 'வணக்கம், செயலிக்குள் நுழைக!'
                : 'Welcome, Login to App!'
              : language === 'ta'
                ? 'ஓடிபி சரிபார்ப்பு'
                : 'OTP Verification'}
          </h1>
          <p className="text-xs text-slate-600 mt-1 select-none">
            {step === 'phone'
              ? language === 'ta'
                ? 'உறுப்பினர் கணக்குடன் இணைந்து கட்சியின் அறிவிப்புகள் மற்றும் டிஜிட்டல் உறுப்பினர் அட்டையை உடனடியாகப் பெருங்கள்!'
                : 'Join our clean movement and access your verified digital identity card instantly.'
              : language === 'ta'
                ? `${mobile} எண்ணிற்கு அனுப்பப்பட்ட 6 இலக்க ரகசிய குறியீட்டை உள்ளிடவும்.`
                : `Enter the secret 6-digit confirmation code sent to ${mobile}.`}
          </p>
        </div>
      </div>

      {/* Main Form Fields Container */}
      <div className="px-5 py-6 flex-1 flex flex-col justify-start">
        {errorMsg && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-2.5 text-xs">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {step === 'phone' ? (
          /* Phone state form */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-slate-700 font-bold text-xs flex items-center gap-1.5" htmlFor="login-mobile-input">
                <Smartphone className="w-4 h-4 text-[#0047AB]" />
                <span>{language === 'ta' ? 'கைப்பேசி எண்' : 'Mobile Number'}</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-slate-500 text-sm font-bold border-r border-slate-200/60 pr-2">+91</span>
                </div>
                <input
                  type="tel"
                  id="login-mobile-input"
                  maxLength={10}
                  className="block w-full pl-14 pr-4 py-3.5 glass-input rounded-xl text-slate-800 text-sm font-semibold tracking-wider placeholder-slate-400 shadow-xs"
                  placeholder="98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-btn-primary hover:opacity-95 active:scale-95 text-white font-extrabold text-sm py-4 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              id="btn-login-o-send"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending OTP...'}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'ta' ? 'ஓடிபி (OTP) பெறுக' : 'Send OTP verification'}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* OTP state form */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* Auto generated OTP visual helper */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-[11px] font-medium mb-3 flex items-center justify-between shadow-xs">
              <span className="flex items-center gap-1.5 text-emerald-900">
                <KeyRound className="w-4 h-4 text-[#008C45]" />
                <strong>{language === 'ta' ? 'சிமுலேட்டட் ஓடிபி:' : 'Simulated OTP:'}</strong>
              </span>
              <span className="bg-[#008C45] text-white px-2.5 py-0.5 rounded-lg font-mono font-bold tracking-widest text-xs">
                {sentOtp}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-slate-600 font-bold text-xs text-center block">
                {language === 'ta' ? 'குறியீட்டை உள்ளிடவும்' : 'Enter 6-digit PIN'}
              </label>
              
              {/* Digit Inputs Group */}
              <div className="flex gap-2 justify-center" id="otp-inputs-grid">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-10 h-12 text-center glass-input rounded-lg text-slate-800 font-black text-lg outline-none transition-all shadow-xs"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    disabled={loading}
                    required
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full glass-btn-green hover:opacity-95 active:scale-95 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10 animate-pulse"
              id="btn-login-otp-verify"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              <span>{language === 'ta' ? 'குறியீட்டைச் சரிபார்' : 'Verify & Enter App'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtpCode(['', '', '', '', '', '']);
              }}
              className="w-full text-center text-xs text-slate-500 font-semibold hover:text-[#0047AB] py-1 underline"
            >
              {language === 'ta' ? 'தொலைபேசி எண்ணை மாற்று' : 'Change Mobile Number'}
            </button>
          </form>
        )}
      </div>

      {/* Dynamic Red Accent Block: Register/Join Party CTA */}
      <div className="p-5 border-t border-slate-100 bg-white/40 backdrop-blur-md rounded-t-[32px] shrink-0 space-y-3 shadow-sm border border-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-650 animate-ping"></span>
          <p className="text-[11px] text-slate-600 font-bold">
            {language === 'ta' ? 'புதிய உறுப்பினரா?' : 'Are you a new member?'}
          </p>
        </div>

        <button
          onClick={onJoinPartyClick}
          className="w-full text-white bg-red-650 hover:bg-red-700 active:scale-95 py-3.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-red-500/20 text-center flex items-center justify-center gap-2 border-b-2 border-red-800 cursor-pointer"
          id="btn-login-join-party"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span>{language === 'ta' ? 'கட்சியில் சேர புதிய விண்ணப்பம்' : 'Apply & Join Party Now'}</span>
        </button>
      </div>
    </div>
  );
}
