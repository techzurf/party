/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Newspaper, Heart, Share2, Eye, Award, Image as ImageIcon, Flame, Megaphone } from 'lucide-react';
import { Language, NewsItem } from '../types';

interface NewsViewProps {
  language: Language;
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=400',
    titleTa: 'மாபெரும் சென்னை பேரணி நிகழ்வு',
    titleEn: 'Mega Chennai Rally Event'
  },
  {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400',
    titleTa: 'இலவச கணினி பயிற்சி வகுப்பு முகாம்',
    titleEn: 'Free Computer Camp Class'
  },
  {
    url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=400',
    titleTa: 'விவசாயிகள் தண்ணீர் பங்கீட்டுக்கூட்டம்',
    titleEn: 'Farmers Water Allocation Meeting'
  },
  {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
    titleTa: 'மதுரை தன்னார்வலர் குழுவினர்',
    titleEn: 'Madurai Volunteer Team Organizers'
  }
];

export default function NewsView({ language, newsItems, setNewsItems }: NewsViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'gallery'>('all');
  const [likes, setLikes] = useState<{ [id: string]: number }>({});
  const [localViews, setLocalViews] = useState<{ [id: string]: number }>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleIncrementViews = (id: string) => {
    setLocalViews(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="space-y-4 px-4 pt-4 pb-8" id="party-news-updates-view">
      
      {/* Category selector pill bar */}
      <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-150 select-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#0047AB] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          id="btn-news-tab-all"
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'செய்திகள்' : 'Latest News'}</span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'gallery'
              ? 'bg-[#0047AB] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          id="btn-news-tab-gallery"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'புகைப்படங்கள்' : 'Campaign Gallery'}</span>
        </button>
      </div>

      {activeTab === 'all' ? (
        /* News Cards List */
        <div className="space-y-4" id="news-articles-list">
          {newsItems.map((article) => {
            const isLiked = (likes[article.id] || 0) > 0;
            const extraLikes = likes[article.id] || 0;
            const extraViews = localViews[article.id] || 0;

            return (
              <div
                key={article.id}
                onClick={() => handleIncrementViews(article.id)}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
                id={`news-card-${article.id}`}
              >
                {/* News Image Header with category indicator */}
                <div className="relative h-[150px] w-full bg-slate-100 shrink-0 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#008C45] text-white font-black text-[9px] uppercase px-2.5 py-0.5 rounded-md tracking-wider">
                    {language === 'ta' ? article.categoryTa : article.categoryEn}
                  </span>
                </div>

                {/* News details content body */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold select-none">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{article.date}</span>
                    <span className="font-mono text-slate-400 font-extrabold uppercase text-[9px]">AINK NEWS RELEASE</span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-xs leading-snug group-hover:text-[#0047AB] transition-colors line-clamp-2">
                    {language === 'ta' ? article.titleTa : article.titleEn}
                  </h3>

                  <p className="text-[10.5px] text-slate-500 leading-relaxed line-clamp-3">
                    {language === 'ta' ? article.contentTa : article.contentEn}
                  </p>

                  {/* Actions buttons footer panel inside card */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs select-none">
                    {/* Like counter clicker */}
                    <button
                      onClick={(e) => handleLike(article.id, e)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold transition-all active:scale-90 ${
                        isLiked
                          ? 'bg-red-50 text-red-655 text-red-600 font-black'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                      id={`btn-news-like-${article.id}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-600' : ''}`} />
                      <span>{142 + extraLikes}</span>
                    </button>

                    {/* Views counter display */}
                    <span className="flex items-center gap-1 text-slate-450 font-bold">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>{article.views + extraViews}</span>
                    </span>

                    {/* Quick share button mockup */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(language === 'ta' ? 'இந்த செய்தியின் லிங்க் நகலெடுக்கப்பட்டது!' : 'News release URL copied to your device!');
                      }}
                      className="text-slate-500 hover:text-[#008C45] p-1 rounded-lg hover:bg-slate-50"
                      title="Share Article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Image Campaign Grid Gallery list */
        <div className="space-y-4" id="news-gallery-canvas animate-fade-in">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-[11px] leading-relaxed text-orange-950 font-medium">
            {language === 'ta'
              ? 'கட்சியின் பொதுப் பேரணிகள், மகளிர் அணி மாநாடுகள் மற்றும் தலைவர் பங்கேற்ற மக்கள் நலத்திட்டப் புகைப்படத் தொகுப்பு!'
              : 'Historical moments & action highlights showcasing state conferences, social relief activities, and ECI registration walks.'}
          </div>

          <div className="grid grid-cols-2 gap-3" id="gallery-bento-grid">
            {GALLERY_PHOTOS.map((photo, index) => (
              <div
                key={index}
                className="relative h-[130px] rounded-2xl overflow-hidden shadow-xs border border-slate-150 group cursor-zoom-in"
                onClick={() => alert(`Enlarged View: ${language === 'ta' ? photo.titleTa : photo.titleEn}`)}
                id={`gallery-item-${index}`}
              >
                <img
                  src={photo.url}
                  alt={photo.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Visual hover caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5 opacity-90">
                  <h4 className="text-[10px] font-black text-white line-clamp-1 truncate select-none">
                    {language === 'ta' ? photo.titleTa : photo.titleEn}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Slogan badge decoration at bottom of gallery */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 text-center select-none space-y-1.5 relative overflow-hidden">
            <div className="absolute top-[-10px] left-[-10px] w-12 h-12 bg-blue-500/15 rounded-full blur-xl"></div>
            <p className="text-[#008C45] text-[10px] font-black tracking-widest uppercase">
              {language === 'ta' ? 'அகில இந்தியா நீதி கட்சி' : 'AKHILA INDIA NEEDHI KATCHI'}
            </p>
            <h4 className="text-xs font-black text-yellow-300">
              {language === 'ta' ? 'நீதி • முன்னேற்றம் • நம்பிக்கை' : 'JUSTICE • PROGRESS • FAITH'}
            </h4>
          </div>

        </div>
      )}

    </div>
  );
}
