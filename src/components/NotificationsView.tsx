/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bell, CreditCard, Award, Calendar, Megaphone, Trash2, CheckSquare } from 'lucide-react';
import { Language, PartyNotification } from '../types';

interface NotificationsViewProps {
  language: Language;
  notifications: PartyNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<PartyNotification[]>>;
}

export default function NotificationsView({ language, notifications, setNotifications }: NotificationsViewProps) {
  
  const handleToggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => {
        if (n.id === id) {
          return { ...n, isRead: !n.isRead };
        }
        return n;
      })
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="px-4 py-4 space-y-4" id="notifications-deck-view">
      
      {/* Notifications Header Control */}
      <div className="flex justify-between items-center select-none border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-xs">
          <Bell className="w-4.5 h-4.5 text-orange-600 animate-swing" />
          <span>{language === 'ta' ? 'அறிவிப்புப் பெட்டி' : 'My Notifications'}</span>
        </div>

        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllRead}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 py-1.5 px-3 rounded-lg border border-blue-105"
            id="btn-notif-mark-all-read"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'அனைத்தும் படித்தவை' : 'Mark all read'}</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        /* Empty states */
        <div className="text-center py-12 space-y-3 select-none">
          <div className="w-14 h-14 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400">
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-xs">{language === 'ta' ? 'அறிவிப்புகள் ஏதுமில்லை' : 'No Notifications'}</h4>
            <p className="text-[10px] text-slate-450">{language === 'ta' ? 'புதிய தகவல்கள் வரும்போது உங்களுக்குத் தெரிவிக்கப்படும்.' : 'Check back later for newly published policy updates.'}</p>
          </div>
        </div>
      ) : (
        /* Notification layout loop */
        <div className="space-y-3" id="notifications-grid-container">
          {notifications.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => handleToggleRead(item.id)}
                className={`relative border rounded-2xl p-4 transition-all cursor-pointer flex gap-3 shadow-xs ${
                  item.isRead
                    ? 'bg-slate-50 border-slate-150 text-slate-600'
                    : 'bg-white border-blue-200 ring-1 ring-blue-100 hover:bg-blue-50/20'
                }`}
                id={`notification-card-${item.id}`}
              >
                {/* Visual Category symbol icon badge */}
                <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${
                  item.category === 'membership'
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.category === 'event'
                      ? 'bg-red-100 text-red-655 text-red-600'
                      : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.category === 'membership' && <CreditCard className="w-5 h-5" />}
                  {item.category === 'event' && <Calendar className="w-5 h-5" />}
                  {item.category === 'announcement' && <Megaphone className="w-5 h-5" />}
                </div>

                {/* Text blocks */}
                <div className="flex-1 space-y-1 overflow-hidden font-semibold">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-xs leading-snug line-clamp-2 truncate max-w-[130px] font-extrabold ${item.isRead ? 'text-slate-700' : 'text-slate-905 text-slate-900 font-extrabold'}`}>
                      {language === 'ta' ? item.titleTa : item.titleEn}
                    </h4>
                    {/* Unread circle dot */}
                    {!item.isRead && (
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 animate-pulse mt-1" title="Unread Announcement"></span>
                    )}
                  </div>

                  <p className="text-[10.5px] text-slate-450 leading-relaxed font-semibold">
                    {language === 'ta' ? item.bodyTa : item.bodyEn}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold select-none pt-2.5">
                    <span>{language === 'ta' ? item.timeTa : item.timeEn}</span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearNotification(item.id);
                      }}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100/80 active:scale-90 transition-all flex items-center gap-1"
                      title="Dismiss Alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
