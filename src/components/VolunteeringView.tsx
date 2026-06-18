/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Clock, Users, ArrowRight, Star } from 'lucide-react';
import { Language, VolunteerData } from '../types';

interface VolunteeringViewProps {
  language: Language;
  volunteerData: VolunteerData;
  setVolunteerData: React.Dispatch<React.SetStateAction<VolunteerData>>;
}

const AVAILABLE_SKILLS = [
  { id: 'sm', labelTa: 'சமூக வலைத்தளப் பிரச்சாரம் (Social Media)', labelEn: 'Social Media Campaigning' },
  { id: 'ps', labelTa: 'மேடைப்பேச்சு & பரப்புரை (Public Speaking)', labelEn: 'Public Speaking & Debate' },
  { id: 'or', labelTa: 'முகாம்கள் & விழா ஒருங்கிணைப்பு (Organizing)', labelEn: 'Event & Rally Management' },
  { id: 'tr', labelTa: 'மொழிபெயர்ப்பு & எழுத்துப் பணி (Translation)', labelEn: 'Translation & Documentation' },
  { id: 'it', labelTa: 'டிஜிட்டல் மற்றும் தகவல் தொழில்நுட்பம் (IT Wing)', labelEn: 'Software & IT Tech Support' }
];

const AVAILABLE_WING = [
  { id: 'youth', labelTa: 'இளைஞர் அணி (Youth Wing)', labelEn: 'Youth Wing' },
  { id: 'farmers', labelTa: 'விவசாயிகள் பாதுகாப்பு அணி (Farmers Wing)', labelEn: 'Farmers Wing' },
  { id: 'women', labelTa: 'மகளிர் மேம்பாட்டு அணி (Women Wing)', labelEn: 'Women Wing' },
  { id: 'students', labelTa: 'மாணவர் அணி (Students Wing)', labelEn: 'Students Wing' }
];

export default function VolunteeringView({ language, volunteerData, setVolunteerData }: VolunteeringViewProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(volunteerData.skills || []);
  const [selectedWing, setSelectedWing] = useState<string>(volunteerData.interest || AVAILABLE_WING[0].id);
  const [availability, setAvailability] = useState<string>(volunteerData.availability || 'Weekends');
  const [success, setSuccess] = useState(false);

  const handleCheckboxChange = (id: string) => {
    if (selectedSkills.includes(id)) {
      setSelectedSkills(prev => prev.filter(x => x !== id));
    } else {
      setSelectedSkills(prev => [...prev, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerData({
      skills: selectedSkills,
      availability: availability,
      interest: selectedWing,
      isRegistered: true
    });
    setSuccess(true);
  };

  return (
    <div className="px-4 py-4 space-y-4" id="volunteer-registration-view">
      
      {/* Visual Top Highlight Bar */}
      <div className="bg-gradient-to-br from-[#0047AB] to-[#008C45] text-white p-5 rounded-2xl shadow relative overflow-hidden select-none">
        {/* Decorative badge */}
        <div className="absolute right-[-15px] bottom-[-15px] opacity-10 pointer-events-none">
          <HeartHandshake className="w-28 h-28" />
        </div>
        
        <span className="text-[9px] bg-red-600 font-bold px-2.5 py-0.5 rounded-full uppercase select-none inline-block mb-1.5">
          {language === 'ta' ? 'மக்கள் சமுதாயப் பணி' : 'SOCIAL SERVICE WING'}
        </span>
        <h2 className="text-sm font-black tracking-tight uppercase leading-snug">
          {language === 'ta' ? 'அறப் போர் தன்னார்வலர் சேர்க்கை' : 'Volunteer Wing Recruitment'}
        </h2>
        <p className="text-[10px] text-blue-100 leading-relaxed font-semibold mt-1 select-none">
          {language === 'ta'
            ? 'மாற்றத்தை முன்னெடுக்கும் உங்களின் திறன்களைக் கொண்டு புதிய, லஞ்சமற்ற நேர்மையான தமிழகத்தின் வளர்ச்சிக்கு உதவுங்கள்!'
            : 'Contribute your expert skills to assist our volunteers during local polls, welfare distributions, and cyber campaigns.'}
        </p>
      </div>

      {success || volunteerData.isRegistered ? (
        /* SUCCESS PORTRAIT */
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center space-y-4 animate-fade-in" id="volunteer-badge-registered">
          <div className="w-14 h-14 bg-[#008C45] text-white rounded-full mx-auto flex items-center justify-center shadow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-extrabold text-emerald-950 text-sm">
              {language === 'ta' ? 'தன்னார்வலர் சேர்க்கை முடிந்தது!' : 'You are now a Registered Volunteer'}
            </h3>
            <p className="text-[10.5px] text-emerald-850 font-medium">
              {language === 'ta'
                ? 'உங்கள் விண்ணப்பம் பரிசீலிக்கப்பட்டது. மாவட்டத் தகவல் தொழில்நுட்ப அணி பொறுப்பாளர்கள் உங்களை விரைவில் குழுவில் சேர்ப்பர்.'
                : 'Your interest has been logged. Our district representatives will reach out to integrate you into localized wings.'}
            </p>
          </div>

          {/* Volunteer digital credential card */}
          <div className="bg-white rounded-xl p-3 border border-slate-205 text-left text-[11px] font-semibold space-y-1.5 select-text">
            <div className="flex justify-between border-b pb-1 text-slate-400">
              <span>WID / STATUS</span>
              <span className="text-emerald-600 font-bold">APPROVED</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[9px] block">ASSIGNED SECTION</span>
              <span className="text-slate-800 font-extrabold text-xs block truncate">
                {AVAILABLE_WING.find(w => w.id === selectedWing || w.id === volunteerData.interest)?.labelEn}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[9px] block">ACTIVE SCHEDULE</span>
              <span className="text-slate-700 block">
                {volunteerData.availability || availability}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setVolunteerData(prev => ({ ...prev, isRegistered: false }));
            }}
            className="text-xs font-bold text-red-600 underline"
          >
            {language === 'ta' ? 'விண்ணப்பத்தைத் திருத்து' : 'Update Volunteer File'}
          </button>
        </div>
      ) : (
        /* INPUT FORM MODULE */
        <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-xs" id="form-volunteer">
          
          {/* wing section selection */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-120">
            <label className="text-slate-700 font-extrabold text-xs flex items-center gap-1.5 select-none">
              <Users className="w-4 h-4 text-[#0047AB]" />
              <span>{language === 'ta' ? 'விருப்பமுள்ள அணி' : 'Select Party Wing'}</span>
            </label>
            <div className="space-y-2">
              {AVAILABLE_WING.map(wing => (
                <label
                  key={wing.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedWing === wing.id
                      ? 'border-[#008C45] bg-[#008C45]/5 text-[#008C45] font-black'
                      : 'border-slate-200 bg-white text-slate-650'
                  }`}
                >
                  <input
                    type="radio"
                    name="wingSelection"
                    className="accent-emerald-700 w-4 h-4"
                    checked={selectedWing === wing.id}
                    onChange={() => setSelectedWing(wing.id)}
                  />
                  <span>{language === 'ta' ? wing.labelTa : wing.labelEn}</span>
                </label>
              ))}
            </div>
          </div>

          {/* skills checkboxes section */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-120">
            <label className="text-slate-700 font-extrabold text-xs flex items-center gap-1.5 select-none">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'பரப்புரை திறன்கள்' : 'Skills / Capabilities'}</span>
            </label>
            <div className="space-y-2">
              {AVAILABLE_SKILLS.map(skill => {
                const isChecked = selectedSkills.includes(skill.id);
                return (
                  <label
                    key={skill.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
                      isChecked ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-extrabold' : 'border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-blue-650 w-4 h-4 rounded"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(skill.id)}
                    />
                    <span>{language === 'ta' ? skill.labelTa : skill.labelEn}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* schedule selection */}
          <div className="space-y-1">
            <label className="text-slate-650 font-bold text-xs flex items-center gap-1 bg-white select-none">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{language === 'ta' ? 'நேர ஒதுக்கீடு (Availability)' : 'Time Commitment Schedule'}</span>
            </label>
            <select
              className="block w-full px-3.5 py-3 bg-slate-50 border border-slate-200 focus:bg-white rounded-xl outline-none"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="Weekends">{language === 'ta' ? 'வார இறுதி நாட்கள் மட்டும் (Weekends Only)' : 'Weekends Only'}</option>
              <option value="Evenings">{language === 'ta' ? 'மாலை நேரங்கள் மட்டும் (Evenings Only)' : 'Evenings Only'}</option>
              <option value="Full-time">{language === 'ta' ? 'முழு நேரப் பணி (Full-time Support)' : 'Full-time / Active Campaigns'}</option>
            </select>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-[#008C45] hover:bg-[#007439] active:scale-95 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-2 border-b-2 border-emerald-800 cursor-pointer"
            id="btn-volunteer-submit"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>{language === 'ta' ? 'தன்னார்வலராகப் பதிவு செய்' : 'Register with Volunteer Wing'}</span>
          </button>

        </form>
      )}

    </div>
  );
}
