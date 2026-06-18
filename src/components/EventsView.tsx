/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle2, AlertCircle, Share2, Sparkles, RefreshCw, Star } from 'lucide-react';
import { Language, EventItem } from '../types';

interface EventsViewProps {
  language: Language;
  eventItems: EventItem[];
  setEventItems: React.Dispatch<React.SetStateAction<EventItem[]>>;
}

export default function EventsView({ language, eventItems, setEventItems }: EventsViewProps) {
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState('');

  const handleRegisterToggle = (eventId: string, isCurrentlyRegistered: boolean) => {
    setRegisteringId(eventId);
    setSuccessBanner('');

    setTimeout(() => {
      // Toggle state helper
      setEventItems(prev =>
        prev.map(item => {
          if (item.id === eventId) {
            return { ...item, isRegistered: !isCurrentlyRegistered };
          }
          return item;
        })
      );

      const targetEvent = eventItems.find(e => e.id === eventId);
      if (targetEvent) {
        if (!isCurrentlyRegistered) {
          setSuccessBanner(
            language === 'ta'
              ? `வாழ்த்துகள்! "${targetEvent.titleTa}" நிகழ்விற்கான உங்கள் டிஜிட்டல் இருக்கை வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது.`
              : `Reservation successful! Your QR code for "${targetEvent.titleEn}" has been updated.`
          );
        } else {
          setSuccessBanner(
            language === 'ta'
              ? `உங்களது முன்பதிவு வெற்றிகரமாக ரத்து செய்யப்பட்டது.`
              : `Your reservation has been cancelled.`
          );
        }
      }

      setRegisteringId(null);
      // Auto clear banner
      setTimeout(() => setSuccessBanner(''), 5000);
    }, 1000);
  };

  return (
    <div className="px-4 py-4 space-y-4 font-medium" id="events-list-canvas">
      
      {/* Banner Slogan */}
      <div className="bg-[#0047AB]/5 border border-[#0047AB]/10 p-3.5 rounded-2xl flex items-center gap-3 select-none">
        <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
        <p className="text-[10.5px] leading-relaxed text-[#0047AB] font-bold">
          {language === 'ta'
            ? 'அறம் சார்ந்த கொள்கை விளக்க கூட்டங்கள் மற்றும் களப்பணிகள். உங்கள் இடத்தை முன்பதிவு செய்து எங்களோடு கைகோருங்கள்!'
            : 'Pre-book your digital seat to participate in core party conferences, welfare distribution drives, and state assemblies.'}
        </p>
      </div>

      {successBanner && (
        <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-3.5 rounded-xl text-xs font-bold animate-fade-in flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#008C45] shrink-0 mt-0.5" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Events loop list */}
      <div className="space-y-4" id="events-cards-grid">
        {eventItems.map((event) => {
          const isLg = registeringId === event.id;

          return (
            <div
              key={event.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              id={`event-box-${event.id}`}
            >
              {/* Event Cover Photo with Date Stamp */}
              <div className="relative h-[130px] w-full bg-slate-100 shrink-0 select-none">
                <img src={event.image} alt={event.titleEn} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 rounded-xl p-2 text-center shadow font-black shrink-0 leading-tight border border-slate-100 min-w-[50px]">
                  <span className="text-[10px] text-[#0047AB] block font-black uppercase">
                    {event.date.split('-')[1] === '06' ? (language === 'ta' ? 'ஜூன்' : 'JUN') : (language === 'ta' ? 'ஜூலை' : 'JUL')}
                  </span>
                  <span className="text-sm font-black text-slate-800">{event.date.split('-')[2]}</span>
                </div>
              </div>

              {/* Event text details */}
              <div className="p-4 space-y-3">
                <h3 className="font-extrabold text-slate-800 text-xs leading-snug line-clamp-2">
                  {language === 'ta' ? event.titleTa : event.titleEn}
                </h3>

                {/* Date/Time and Location parameters */}
                <div className="space-y-1.5 text-[10.5px] text-slate-500 font-semibold select-text">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{language === 'ta' ? event.timeTa : event.timeEn}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{language === 'ta' ? event.locationTa : event.locationEn}</span>
                  </div>
                </div>

                <p className="text-[10.5px] text-slate-450 leading-relaxed line-clamp-3 select-text border-l-2 border-slate-100 pl-2.5">
                  {language === 'ta' ? event.descriptionTa : event.descriptionEn}
                </p>

                {/* RSVP control CTA row */}
                <div className="pt-2 border-t border-slate-50 flex gap-2 select-none">
                  <button
                    onClick={() => handleRegisterToggle(event.id, event.isRegistered)}
                    disabled={registeringId !== null}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      event.isRegistered
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-[#0047AB] hover:bg-[#003B91] border-b-2 border-blue-900 text-white'
                    }`}
                    id={`btn-event-rsvp-${event.id}`}
                  >
                    {isLg ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-current" />
                    ) : event.isRegistered ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008C45]" />
                    ) : (
                      <Calendar className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isLg
                        ? (language === 'ta' ? 'அறிவிக்கப்படுகிறது...' : 'Rsvping...')
                        : event.isRegistered
                          ? (language === 'ta' ? 'முன்பதிவு செய்யப்பட்டுள்ளது' : 'Registered / RSVP’d')
                          : (language === 'ta' ? 'சேர்க்கை பெறுக (RSVP)' : 'Reserve My Seat')}
                    </span>
                  </button>

                  <button
                    onClick={() => alert(`Share Event Link: needhikatchi.org/events/${event.id}`)}
                    className="p-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 text-slate-500 rounded-xl"
                    title="Share Event Details"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
