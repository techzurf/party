/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  Newspaper,
  Calendar,
  Phone,
  Settings,
  Bell,
  Trash2,
  Edit2,
  Plus,
  Search,
  Download,
  CreditCard,
  UserCheck,
  Send,
  ArrowRight,
  TrendingUp,
  MapPin,
  Lock,
  PlusCircle,
  Briefcase,
  Layers,
  Printer,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Shield,
  FileSpreadsheet,
  RefreshCw,
  LogOut,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { Language, NewsItem, EventItem, PartyNotification, UserData, VolunteerData } from '../types';

interface AdminPortalViewProps {
  language: Language;
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  eventItems: EventItem[];
  setEventItems: React.Dispatch<React.SetStateAction<EventItem[]>>;
  notifications: PartyNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<PartyNotification[]>>;
  currentUserData: UserData;
  setCurrentScreen: (screen: any) => void;
}

// Compact structure for Admin User
interface AdminUser {
  id: string;
  name: string;
  role: string;
  district: string;
}

// Initial Mock Members
const INITIAL_MEMBERS: UserData[] = [
  {
    name: 'கோகுல கிருஷ்ணன் (Gokul)',
    guardian: 'ராஜசேகர்',
    mobile: '9845012345',
    email: 'gokul@needhikatchi.org',
    gender: 'Male',
    dob: '1998-08-24',
    district: 'Chennai / சென்னை',
    constituency: 'Mylapore / மயிலாப்பூர்',
    address: 'கதவு எண் 12, காந்தி தெரு, மயிலாப்பூர், சென்னை - 600004',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    membershipNo: 'AINK-240915',
    joinDate: '2026-06-18',
    isRegistered: true,
    isLoggedIn: true
  },
  {
    name: 'செல்வி. அஞ்சலி தேவி (Anjali Devi)',
    guardian: 'முனுசாமி',
    mobile: '9444055667',
    email: 'anjali@needhikatchi.org',
    gender: 'Female',
    dob: '2001-11-04',
    district: 'Chennai / சென்னை',
    constituency: 'Chepauk-Thiruvallikeni / சேப்பாக்கம்-திருவல்லிக்கேணி',
    address: 'கதவு எண் 7, பவழக்குறிச்சி, சென்னை - 600005',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    membershipNo: 'AINK-859423',
    joinDate: '2026-06-18',
    isRegistered: true,
    isLoggedIn: false
  },
  {
    name: 'சுபாஷ் சந்திரன் (Subash Chandran)',
    guardian: 'நடராஜன்',
    mobile: '9894012121',
    email: 'subash@needhikatchi.org',
    gender: 'Male',
    dob: '1992-05-15',
    district: 'Coimbatore / கோயம்புத்தூர்',
    constituency: 'Coimbatore South / கோவை தெற்கு',
    address: '45, பாரதி வீதி, கோயம்புத்தூர் - 641001',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    membershipNo: 'AINK-112233',
    joinDate: '2026-06-10',
    isRegistered: true,
    isLoggedIn: false
  },
  {
    name: 'மீனாட்சி பழனிவேல் (Meenakshi)',
    guardian: 'முத்துவேல்',
    mobile: '9042088990',
    email: 'meenapv@gmail.com',
    gender: 'Female',
    dob: '1995-12-08',
    district: 'Madurai / மதுரை',
    constituency: 'Madurai West / மதுரை மேற்கு',
    address: '22A, பெருமாள் கோவில் தெரு, மதுரை - 625001',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    membershipNo: 'AINK-PEND-445',
    joinDate: '2026-06-19',
    isRegistered: false, // Pending Appr
    isLoggedIn: false
  },
  {
    name: 'ராமசாமி குப்புசாமி (Ramasamy)',
    guardian: 'குப்புசாமி',
    mobile: '9785044332',
    email: 'ramasamy@yahoo.com',
    gender: 'Male',
    dob: '1970-03-01',
    district: 'Trichy / திருச்சி',
    constituency: 'Srirangam / ஸ்ரீரங்கம்',
    address: '8, வைகை வீதி, திருவரங்கம், திருச்சி - 620006',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150',
    membershipNo: 'AINK-SUSP-778',
    joinDate: '2026-05-20',
    isRegistered: true, // Suspended handled as status state
    isLoggedIn: false
  }
];

// Seed Contact inquiries
interface ContactQuery {
  id: string;
  name: string;
  mobile: string;
  subject: string;
  message: string;
  date: string;
  status: 'Pending' | 'Responded' | 'Closed';
  response?: string;
}

const INITIAL_CONTACT_QUERIES: ContactQuery[] = [
  {
    id: 'query-1',
    name: 'முத்து குமார் (Muthu Kumar)',
    mobile: '9840123456',
    subject: 'உறுப்பினர் அட்டை பதிவிறக்கப் பிழை',
    message: 'My ID card is showing my photo in draft scale. Can I replace my photo using the profile editor?',
    date: '2026-06-18',
    status: 'Pending'
  },
  {
    id: 'query-2',
    name: 'கவிதா சண்முகம் (Kavitha S.)',
    mobile: '9443210987',
    subject: 'மதுரை முகாம் இளைஞர் அணி தன்னார்வலர் சேர்க்கை',
    message: 'I want to enlist 15 volunteers from our local community colleges for the upcoming Madurai mega membership drive.',
    date: '2026-06-17',
    status: 'Responded',
    response: 'Approved. Forwarded detailed campaign flyer packs and badge allocation guides.'
  },
  {
    id: 'query-3',
    name: 'ஆனந்த கிருஷ்ணன் (Ananda)',
    mobile: '9003554411',
    subject: 'நீதி இலவச டிஜிட்டல் கல்வித் திட்டம்',
    message: 'Requesting to open a branch for computational literacy at Chepauk district.',
    date: '2026-06-15',
    status: 'Closed',
    response: 'Opened secondary computer service center inside block 3 Chepauk.'
  }
];

// Volunteer task coordinators and tasks
interface VolunteerCoordinator {
  id: string;
  name: string;
  mobile: string;
  district: string;
  interest: string;
  tasksCount: number;
  performanceScore: number; // Max 100
  skills: string[];
}

const INITIAL_VOLUNTEERS: VolunteerCoordinator[] = [
  {
    id: 'vol-1',
    name: 'கார்த்திக் விஸ்வநாதன் (Karthik)',
    mobile: '9653011223',
    district: 'Chennai / சென்னை',
    interest: 'youth',
    tasksCount: 3,
    performanceScore: 92,
    skills: ['Social Media', 'Flyer Design']
  },
  {
    id: 'vol-2',
    name: 'ரேவதி அன்பழகன் (Revathi)',
    mobile: '9322044556',
    district: 'Madurai / மதுரை',
    interest: 'women',
    tasksCount: 5,
    performanceScore: 95,
    skills: ['Crowd Management', 'Public Address']
  },
  {
    id: 'vol-3',
    name: 'சரவணன் துரைராஜ் (Saravanan)',
    mobile: '9043223344',
    district: 'Coimbatore / கோயம்புத்தூர்',
    interest: 'environment',
    tasksCount: 2,
    performanceScore: 84,
    skills: ['Logistics', 'Tree Nursery Support']
  }
];

export default function AdminPortalView({
  language,
  newsItems,
  setNewsItems,
  eventItems,
  setEventItems,
  notifications,
  setNotifications,
  currentUserData,
  setCurrentScreen
}: AdminPortalViewProps) {
  
  // Auth state
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [adminPhone, setAdminPhone] = useState<string>('9999912345');
  const [adminPass, setAdminPass] = useState<string>('password123');
  const [loginError, setLoginError] = useState<string>('');
  
  // Selected Admin Role
  const [activeRole, setActiveRole] = useState<'Super Admin' | 'State Admin' | 'District Admin' | 'Constituency Admin' | 'Volunteer Admin'>('Super Admin');
  
  // Portal Navigation
  const [activeTab, setActiveTab] = useState<'dashboard' | 'members' | 'news' | 'events' | 'volunteers' | 'broadcast' | 'contacts' | 'settings'>('dashboard');

  // Shared Data States in Local Variables inside portal (so changes don't lose on viewport switch)
  const [members, setMembers] = useState<UserData[]>(INITIAL_MEMBERS);
  const [volunteers, setVolunteers] = useState<VolunteerCoordinator[]>(INITIAL_VOLUNTEERS);
  const [contactQueries, setContactQueries] = useState<ContactQuery[]>(INITIAL_CONTACT_QUERIES);

  // States for Modals and Forms
  const [searchMemberQuery, setSearchMemberQuery] = useState<string>('');
  const [filterDistrict, setFilterDistrict] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Selected Member for Card or Edit modal
  const [selectedMember, setSelectedMember] = useState<UserData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

  // Form states - Edit Member
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editConstituency, setEditConstituency] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // Form states - Create News Item
  const [newNewsTitleTa, setNewNewsTitleTa] = useState('');
  const [newNewsTitleEn, setNewNewsTitleEn] = useState('');
  const [newNewsContentTa, setNewNewsContentTa] = useState('');
  const [newNewsContentEn, setNewNewsContentEn] = useState('');
  const [newNewsCatTa, setNewNewsCatTa] = useState('அறிவிப்பு');
  const [newNewsCatEn, setNewNewsCatEn] = useState('Announcement');
  const [newsAlertMsg, setNewsAlertMsg] = useState('');

  // Form states - Create Event Item
  const [newEventTitleTa, setNewEventTitleTa] = useState('');
  const [newEventTitleEn, setNewEventTitleEn] = useState('');
  const [newEventLocTa, setNewEventLocTa] = useState('');
  const [newEventLocEn, setNewEventLocEn] = useState('');
  const [newEventDescTa, setNewEventDescTa] = useState('');
  const [newEventDescEn, setNewEventDescEn] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [eventAlertMsg, setEventAlertMsg] = useState('');

  // Form states - Circular Broadcast
  const [alertTitleTa, setAlertTitleTa] = useState('');
  const [alertTitleEn, setAlertTitleEn] = useState('');
  const [alertBodyTa, setAlertBodyTa] = useState('');
  const [alertBodyEn, setAlertBodyEn] = useState('');
  const [alertCategory, setAlertCategory] = useState<'announcement' | 'event' | 'membership'>('announcement');
  const [broadcastTarget, setBroadcastTarget] = useState<'all' | 'district' | 'volunteer'>('all');
  const [broadcastAlertMsg, setBroadcastAlertMsg] = useState('');

  // Form states - Task Assign Modal
  const [selectedVolId, setSelectedVolId] = useState<string | null>(null);
  const [taskText, setTaskText] = useState('');
  const [volSuccessMsg, setVolSuccessMsg] = useState('');

  // Contact Response Modal state
  const [activeQuery, setActiveQuery] = useState<ContactQuery | null>(null);
  const [responseText, setResponseText] = useState('');

  // Settings mock variables
  const [partyInfoEmail, setPartyInfoEmail] = useState('contact@needhikatchi.org');
  const [partyInfoHeadquarters, setPartyInfoHeadquarters] = useState('Door No. 45, Anna Salai, Sholinganallur, Chennai - 600119');
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Authentication logic
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPhone) {
      setLoginError('தயவுசெய்து அலைபேசி எண்ணை உள்ளிடவும் / Please enter phone number');
      return;
    }
    if (!adminPass) {
      setLoginError('தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும் / Please enter password');
      return;
    }
    // Simple demo bypass
    setIsLogged(true);
    setLoginError('');
  };

  const handleQuickBypass = () => {
    setAdminPhone('9999912345');
    setAdminPass('password123');
    setIsLogged(true);
    setLoginError('');
  };

  // Simulated member card functions
  const openMemberCard = (member: UserData) => {
    setSelectedMember(member);
    setIsCardModalOpen(true);
  };

  // Simulated Edit Member particulars
  const openEditMemberModal = (member: UserData) => {
    setSelectedMember(member);
    setEditName(member.name);
    setEditMobile(member.mobile);
    setEditDistrict(member.district);
    setEditConstituency(member.constituency);
    setEditEmail(member.email);
    setIsEditModalOpen(true);
  };

  const saveEditedMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    
    setMembers(prev => prev.map(m => {
      if (m.membershipNo === selectedMember.membershipNo) {
        return {
          ...m,
          name: editName,
          mobile: editMobile,
          district: editDistrict,
          constituency: editConstituency,
          email: editEmail
        };
      }
      return m;
    }));

    setIsEditModalOpen(false);
    setSelectedMember(null);
  };

  // Modify member enrollment states
  const toggleMemberStatus = (memberNo: string, action: 'approve' | 'suspend' | 'activate') => {
    setMembers(prev => prev.map(m => {
      if (m.membershipNo === memberNo) {
        if (action === 'approve') {
          return { ...m, isRegistered: true, membershipNo: `AINK-${Math.floor(100000 + Math.random() * 900000)}` };
        } else if (action === 'suspend') {
          return { ...m, isRegistered: false, membershipNo: `AINK-SUSP-${m.membershipNo.replace(/[^0-9]/g, '') || '999'}` };
        } else if (action === 'activate') {
          return { ...m, isRegistered: true, membershipNo: `AINK-${m.membershipNo.replace(/[^0-9]/g, '') || Math.floor(100000 + Math.random() * 900000)}` };
        }
      }
      return m;
    }));
  };

  // Simulate downloading member list CSV
  const triggerCSVDownload = () => {
    const headers = 'Membership ID,Full Name,Mobile Number,District,Constituency,Joined Date,Verification STATUS\n';
    const rows = members.map(m => {
      const status = m.isRegistered ? (m.membershipNo.includes('SUSP') ? 'SUSPENDED' : 'APPROVED') : 'PENDING APPROVAL';
      return `"${m.membershipNo}","${m.name}","${m.mobile}","${m.district}","${m.constituency}","${m.joinDate}","${status}"`;
    }).join('\n');
    
    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aink_membership_ledger_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulation: add mock news to the global news array reactively
  const createNewsAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitleTa || !newNewsTitleEn) {
      setNewsAlertMsg('தயவுசெய்து செய்தி தலைப்புகளை உள்ளிடவும் / Please input titles');
      return;
    }
    
    const newArticle: NewsItem = {
      id: `news-created-${Date.now()}`,
      titleTa: newNewsTitleTa,
      titleEn: newNewsTitleEn,
      summaryTa: newNewsContentTa.slice(0, 100) || newNewsTitleTa,
      summaryEn: newNewsContentEn.slice(0, 100) || newNewsTitleEn,
      contentTa: newNewsContentTa || newNewsTitleTa,
      contentEn: newNewsContentEn || newNewsTitleEn,
      date: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600',
      categoryTa: newNewsCatTa,
      categoryEn: newNewsCatEn,
      views: 1
    };

    setNewsItems(prev => [newArticle, ...prev]);
    setNewNewsTitleTa('');
    setNewNewsTitleEn('');
    setNewNewsContentTa('');
    setNewNewsContentEn('');
    setNewsAlertMsg(language === 'ta' ? 'செய்தி வெற்றிகரமாக வெளியிடப்பட்டு கைபேசி பக்கத்திற்கு அனுப்பப்பட்டது!' : 'News article successfully published to Member app!');
    
    setTimeout(() => setNewsAlertMsg(''), 4000);
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(prev => prev.filter(n => n.id !== id));
  };

  // Simulation: add event to the global events array reactively
  const createCampaignEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitleTa || !newEventTitleEn) {
      setEventAlertMsg('தயவுசெய்து நிகழ்வு தலைப்பை வழங்கவும் / Please input titles');
      return;
    }

    const newProg: EventItem = {
      id: `event-created-${Date.now()}`,
      titleTa: newEventTitleTa,
      titleEn: newEventTitleEn,
      date: newEventDate || new Date().toISOString().split('T')[0],
      timeTa: 'காலை 10:00 மணி',
      timeEn: '10:00 AM',
      locationTa: newEventLocTa || 'சென்னை கலை அரங்கம்',
      locationEn: newEventLocEn || 'AINK District Hall, Chennai',
      descriptionTa: newEventDescTa || newEventTitleTa,
      descriptionEn: newEventDescEn || newEventTitleEn,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      isRegistered: false
    };

    setEventItems(prev => [newProg, ...prev]);
    setNewEventTitleTa('');
    setNewEventTitleEn('');
    setNewEventLocTa('');
    setNewEventLocEn('');
    setNewEventDescTa('');
    setNewEventDescEn('');
    setEventAlertMsg(language === 'ta' ? 'நிகழ்வு வெற்றிகரமாக சேர்க்கப்பட்டது!' : 'Campaign event successfully created!');
    
    setTimeout(() => setEventAlertMsg(''), 4000);
  };

  const deleteCampaignEvent = (id: string) => {
    setEventItems(prev => prev.filter(e => e.id !== id));
  };

  // Push Broadcast Circular Alerts real-time to active member app notifications state array
  const dispatchBroadcaster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitleTa || !alertTitleEn) {
      setBroadcastAlertMsg('தயவுசெய்து தலைப்பு வழங்கவும் / Please enter announcement headers');
      return;
    }

    const newPush: PartyNotification = {
      id: `broadcast-notif-${Date.now()}`,
      titleTa: alertTitleTa,
      titleEn: alertTitleEn,
      bodyTa: alertBodyTa || 'முக்கிய சுற்றறிக்கை',
      bodyEn: alertBodyEn || 'Circular notice broadcasted by Administrator',
      timeTa: 'இப்போது',
      timeEn: 'Just now',
      category: alertCategory,
      isRead: false
    };

    // Inject directly into Member notifications state list
    setNotifications(prev => [newPush, ...prev]);

    setAlertTitleTa('');
    setAlertTitleEn('');
    setAlertBodyTa('');
    setAlertBodyEn('');
    setBroadcastAlertMsg(language === 'ta' ? 'அறிவிப்பு வெற்றிகரமாக அனைத்து உறுப்பினர்களுக்கும் பாதுகாப்புடன் பிராட்காஸ்ட் செய்யப்பட்டது!' : 'Secure Push Broadcast dispatched to mobile members tray!');
    
    setTimeout(() => setBroadcastAlertMsg(''), 4000);
  };

  // Volunteer Task Delegator
  const assignTaskToVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVolId || !taskText) return;

    setVolunteers(prev => prev.map(v => {
      if (v.id === selectedVolId) {
        return {
          ...v,
          tasksCount: v.tasksCount + 1,
          performanceScore: Math.min(100, v.performanceScore + 2)
        };
      }
      return v;
    }));

    setTaskText('');
    setSelectedVolId(null);
    setVolSuccessMsg(language === 'ta' ? 'ஆணை வெற்றிகரமாக ஒதுக்கீடு செய்யப்பட்டது!' : 'Task assignment dispatched to the coordinator!');
    setTimeout(() => setVolSuccessMsg(''), 4000);
  };

  // Helpline desk response
  const submitQueryResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuery) return;

    setContactQueries(prev => prev.map(q => {
      if (q.id === activeQuery.id) {
        return {
          ...q,
          status: 'Responded',
          response: responseText
        };
      }
      return q;
    }));

    setResponseText('');
    setActiveQuery(null);
  };

  // Change query state
  const changeQueryStatus = (id: string, newStatus: 'Pending' | 'Responded' | 'Closed') => {
    setContactQueries(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, status: newStatus };
      }
      return q;
    }));
  };

  // Stats Counters
  const countPendingMembers = members.filter(m => !m.isRegistered && !m.membershipNo.includes('SUSP')).length;
  const countSuspendedMembers = members.filter(m => m.membershipNo.includes('SUSP')).length;
  const countActiveMembers = members.length - countPendingMembers - countSuspendedMembers;

  const filteredMembersList = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchMemberQuery.toLowerCase()) || 
                          m.mobile.includes(searchMemberQuery) ||
                          m.membershipNo.toLowerCase().includes(searchMemberQuery.toLowerCase());
    const matchesDistrict = filterDistrict === 'All' || m.district.includes(filterDistrict);
    
    let matchesStatus = true;
    if (filterStatus === 'Active') {
      matchesStatus = m.isRegistered && !m.membershipNo.includes('SUSP');
    } else if (filterStatus === 'Pending') {
      matchesStatus = !m.isRegistered && !m.membershipNo.includes('SUSP');
    } else if (filterStatus === 'Suspended') {
      matchesStatus = m.membershipNo.includes('SUSP');
    }

    return matchesSearch && matchesDistrict && matchesStatus;
  });

  // Render Login state screen if not logged
  if (!isLogged) {
    return (
      <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center px-4 py-8 relative font-semibold" id="admin-gatekeeper-auth-view">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0047AB]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#008C45]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md bg-white border border-slate-200/40 rounded-3xl p-6 md:p-8 shrink-0 shadow-2xl relative z-10" id="admin-login-shield-card">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center p-2 shadow-lg mb-4">
              <img 
                src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
                alt="AINK Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight select-none">
              அகில இந்திய நீதி கட்சி
            </h1>
            <p className="text-[11px] text-[#0047AB] font-black uppercase tracking-widest mt-0.5 select-none">
              AINK WEB ADMINISTRATION PORTAL
            </p>
            <p className="text-xs text-slate-450 mt-1.5 leading-relaxed select-none">
              Authorized central personnel terminal access. Secure dual-factor audit protocol is active.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 mt-6" id="aink-admin-login-form">
            {loginError && (
              <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-3 text-xs flex items-center gap-2" id="login-error-log">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-700 text-xs font-bold mb-1 ml-1 select-none">
                அலைபேசி எண் / Operator Phone
              </label>
              <input
                type="tel"
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
                placeholder="Enter 10-digit login ID"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 select-none">
                <label className="block text-slate-700 text-xs font-bold ml-1">
                  கடவுச்சொல் / Access Key
                </label>
                <button
                  type="button"
                  onClick={() => alert(language === 'ta' ? 'அட்மினுக்கு உங்களது முகவரி கடவுச்சொல்: key123 என ஒதுக்கப்பட்டுள்ளது.' : 'Demo administrative key is prefilled. Press bypass/quick access to auto-fill.')}
                  className="text-[#0047AB] hover:underline text-[10.5px]"
                >
                  Forgot Key?
                </button>
              </div>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0047AB] to-[#003B91] hover:brightness-105 active:scale-[0.98] text-white p-3.5 mt-2 rounded-xl transition-all shadow-lg text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer"
              id="admin-form-submit-btn"
            >
              <span>{language === 'ta' ? 'பாதுகாப்பான உள்நுழைவு ➔' : 'AUTHENTICATE SECURE SESSION ➔'}</span>
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2 align-center justify-center select-none">
            <span className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-extrabold">
              State Sandbox Tester Toolkit
            </span>
            <button
              onClick={handleQuickBypass}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-2 px-4 rounded-xl text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              id="reviewer-admin-bypass"
            >
              <UserCheck className="w-4 h-4" />
              <span>Auto-Fill Creds & Authenticate</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F4F8] flex flex-col md:flex-row relative" id="aink-authorised-admin-portal">
      
      {/* LEFT SIDEBAR (Desktop Responsive navigation panel) */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 shrink-0 flex flex-col border-r border-slate-800" id="admin-portal-sidebar">
        {/* Logo Branding */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md shrink-0">
            <img 
              src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
              alt="AINK Logo" 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-extrabold text-sm text-slate-50 tracking-tight leading-tight truncate">AINK Admin</h2>
            <span className="text-[9.5px] text-amber-450 uppercase font-black tracking-widest">{activeRole}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto" id="admin-sidebar-nav-tablist">
          {/* Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <TrendingUp className="w-4.5 h-4.5" />
            <span>புள்ளியியல் / Dashboard</span>
          </button>

          {/* Member ledger */}
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'members' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>உறுப்பினர்கள் / Members</span>
            {countPendingMembers > 0 && (
              <span className="ml-auto bg-amber-500 text-slate-900 font-extrabold text-[9px] px-2 py-0.5 rounded-full animate-bounce">
                {countPendingMembers}
              </span>
            )}
          </button>

          {/* News portal scheduler */}
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'news' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Newspaper className="w-4.5 h-4.5" />
            <span>செய்திகள் பதிவேற்றம் / News</span>
          </button>

          {/* Rallies list scheduler */}
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'events' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" />
            <span>நிகழ்வுகள் மேலாண்மை / Events</span>
          </button>

          {/* Volunteer assigning desk */}
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'volunteers' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Briefcase className="w-4.5 h-4.5" />
            <span>தன்னார்வலர்கள் / Volunteers</span>
          </button>

          {/* Emergency Circular dispatches */}
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'broadcast' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Bell className="w-4.5 h-4.5" />
            <span>அறிவிப்புகள் பிராட்காஸ்ட் / Alerts</span>
          </button>

          {/* Help Inquiries view */}
          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'contacts' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Phone className="w-4.5 h-4.5" />
            <span>உதவி கோரிக்கைகள் / Helpline</span>
            {contactQueries.filter(q => q.status === 'Pending').length > 0 && (
              <span className="ml-auto bg-emerald-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full">
                {contactQueries.filter(q => q.status === 'Pending').length}
              </span>
            )}
          </button>

          {/* Settings Tab */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-850 hover:text-slate-105'
            }`}
          >
            <Settings className="w-4.5 h-4.5" />
            <span>அமைப்பு முறைகள் / Configuration</span>
          </button>
        </nav>

        {/* Active Role Quick Toggle Selector (For Reviewer Presentation Roles simulation) */}
        <div className="p-3 bg-slate-950 border-t border-slate-850 space-y-1" id="role-selector-utility-box">
          <span className="text-[9px] text-slate-500 uppercase font-black block select-none">
            Switch Admin Authorization Role:
          </span>
          <select
            value={activeRole}
            onChange={(e: any) => setActiveRole(e.target.value)}
            className="w-full bg-slate-850 text-white border border-slate-750 text-xs font-bold py-1.5 px-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB] cursor-pointer"
          >
            <option value="Super Admin">Super Admin (Central)</option>
            <option value="State Admin">State Admin (Tamil Nadu)</option>
            <option value="District Admin">District Admin (Chennai)</option>
            <option value="Constituency Admin">Constituency Coordinator</option>
            <option value="Volunteer Admin">Volunteer Director</option>
          </select>
        </div>

        {/* Sidebar Footer Log out */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 select-none">
          <button
            onClick={() => setIsLogged(false)}
            className="w-full bg-[#008C45] hover:bg-emerald-600 duration-200 text-white py-2 px-3 rounded-xl text-xs font-extrabold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Power off Session</span>
          </button>
        </div>
      </aside>

      {/* RIGHT WORKPLACE CONTENT FIELD */}
      <main className="flex-1 flex flex-col min-w-0" id="admin-main-viewport">
        {/* Admin Header */}
        <header className="bg-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-plat-200 gap-2 shrink-0 select-none">
          <div>
            <h1 className="text-lg font-black text-slate-850 flex items-center gap-2">
              <span>அகில இந்திய நீதி கட்சி - நிர்வாக போர்டல்</span>
            </h1>
            <p className="text-[10.5px] text-slate-450 uppercase tracking-wider font-extrabold mt-0.5">
              Secure Central Command Terminal • Active Operator: +91 {adminPhone}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#008C45]/10 text-[#008C45] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#008C45] animate-ping"></span>
              <span>Central Node Online</span>
            </span>

            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-extrabold text-[10.5px] py-1.5 px-3.5 rounded-xl uppercase transition-all shrink-0 cursor-pointer flex items-center gap-1 shadow-lg"
              id="switch-back-to-member"
            >
              <span>📱 Go to Member App</span>
            </button>
          </div>
        </header>

        {/* Workspace Body scroll */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6" id="admin-workspace-scroll-box">
          
          {/* ==================================== */}
          {/* TAB 1: DASHBOARD & METRICS           */}
          {/* ==================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6" id="tab-admin-dashboard">
              {/* Highlights Cards Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
                {/* Block 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Total Members</span>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{members.length}</h3>
                    <p className="text-[10px] text-emerald-600 font-bold mt-1">
                      ▲ +4 new registers today
                    </p>
                  </div>
                  <div className="bg-[#0047AB]/10 p-3 rounded-2xl text-[#0047AB]">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* Block 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Active Approved</span>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{countActiveMembers}</h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                      {countSuspendedMembers} accounts suspended
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-650">
                    <UserCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Block 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Unverified Pending</span>
                    <h3 className="text-2xl font-black text-amber-650 mt-1">{countPendingMembers}</h3>
                    <p className="text-[10px] text-amber-600 font-semibold mt-1 animate-pulse">
                      Requires manual approval
                    </p>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-550">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                {/* Block 4 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Media Base (News / Events)</span>
                    <h3 className="text-2xl font-black text-slate-800 mt-1">{newsItems.length + eventItems.length}</h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                      {newsItems.length} active announcements
                    </p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-2xl text-slate-700">
                    <Newspaper className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Bento Grid: Charts Panel (Custom SVG High-End Visual Layouts) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
                
                {/* Chart Block A: Membership Growth Trend */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                        இணைந்தோர் வளர்ச்சி விகிதம் / MEMBERSHIP SIGNUP TREND
                      </h4>
                      <span className="text-[10px] text-slate-400">Total registers (Last 6 Months progression)</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                      +42% Growth
                    </span>
                  </div>

                  {/* SVG Chart Line */}
                  <div className="h-48 relative flex items-end">
                    {/* Grid lines */}
                    <div className="absolute inset-x-0 top-0 h-px bg-slate-100"></div>
                    <div className="absolute inset-x-0 top-1/3 h-px bg-slate-100"></div>
                    <div className="absolute inset-x-0 top-2/3 h-px bg-slate-100"></div>
                    
                    <svg viewBox="0 0 500 150" className="w-full h-full text-[#0047AB]">
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0047AB" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#0047AB" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d="M0,130 Q100,100 200,90 T400,35 L500,20 L500,150 L0,150 Z" 
                        fill="url(#chartGrad)" 
                      />
                      <path 
                        d="M0,130 Q100,100 200,90 T400,35 L500,20" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                      />
                      {/* Dots on nodes */}
                      <circle cx="100" cy="110" r="4.5" fill="#008C45" stroke="white" strokeWidth="1.5" />
                      <circle cx="200" cy="90" r="4.5" fill="#008C45" stroke="white" strokeWidth="1.5" />
                      <circle cx="350" cy="45" r="4.5" fill="#008C45" stroke="white" strokeWidth="1.5" />
                      <circle cx="500" cy="20" r="5" fill="red" stroke="white" strokeWidth="2" />
                    </svg>

                    <div className="absolute top-2 left-2 bg-slate-900/90 text-white rounded px-2 py-0.5 text-[8.5px] font-mono shadow">
                      Peak: 8,423 Members
                    </div>
                  </div>

                  {/* Month axis labels */}
                  <div className="flex justify-between text-slate-400 text-[9.5px] font-black uppercase pt-3 px-1 font-mono">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun (Current)</span>
                  </div>
                </div>

                {/* Chart Block B: District wise representation bar chart */}
                <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                        மாவட்ட வாரியான உறுப்பினர்கள் / REGISTRATION DISTRIBUTION
                      </h4>
                      <span className="text-[10px] text-slate-400">Regional coverage across Tamil Nadu districts</span>
                    </div>
                    <span className="bg-blue-100 text-[#0047AB] text-[10px] font-black px-2 py-0.5 rounded-full">
                      8 Districts Seeded
                    </span>
                  </div>

                  {/* Manual Bars layout */}
                  <div className="flex-1 space-y-3.5">
                    {/* District block list */}
                    {[
                      { name: 'Chennai / சென்னை', val: 78, color: 'bg-[#0047AB]' },
                      { name: 'Madurai / மதுரை', val: 56, color: 'bg-[#008C45]' },
                      { name: 'Coimbatore / கோவை', val: 45, color: 'bg-[#0047AB]' },
                      { name: 'Trichy / திருச்சி', val: 30, color: 'bg-amber-500' },
                      { name: 'Salem / சேலம்', val: 24, color: 'bg-slate-700' }
                    ].map((dist, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between text-[10px]">
                          <span className="font-extrabold text-slate-700">{dist.name}</span>
                          <span className="font-black text-slate-900">{dist.val}% coverage</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                          <div 
                            className={`${dist.color} h-full rounded-full transition-all duration-[1500ms]`}
                            style={{ width: `${dist.val}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Statistics Counters Table Row */}
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs select-none">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide mb-3">
                  AINK Operational Node Stats Quick-View
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Districts</span>
                    <span className="text-xl font-extrabold text-slate-800 block mt-0.5">8</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Coordinators</span>
                    <span className="text-xl font-extrabold text-slate-800 block mt-0.5">24</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Active Volts</span>
                    <span className="text-xl font-extrabold text-[#008C45] block mt-0.5">{volunteers.length}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Total Queries</span>
                    <span className="text-xl font-extrabold text-slate-800 block mt-0.5">{contactQueries.length}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Pending Help</span>
                    <span className="text-xl font-extrabold text-amber-600 block mt-0.5">{contactQueries.filter(q => q.status === 'Pending').length}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    <span className="text-[9px] text-slate-450 uppercase block font-black">Platform Status</span>
                    <span className="text-[11px] font-black text-white bg-emerald-600 px-2 py-1 rounded mt-1.5 inline-block">SECURE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB 2: MEMBERS DIRECTORY             */}
          {/* ==================================== */}
          {activeTab === 'members' && (
            <div className="space-y-6" id="tab-admin-members">
              <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                {/* Toolbar controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none pb-4 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-xl">
                    {/* Search query box */}
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 text-slate-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search Members by Name, Mobile, or ID No..."
                        value={searchMemberQuery}
                        onChange={(e) => setSearchMemberQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                      />
                    </div>

                    {/* District selection dropdown */}
                    <select
                      value={filterDistrict}
                      onChange={(e) => setFilterDistrict(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-2.5 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="All">All Districts (அனைத்து)</option>
                      <option value="Chennai">Chennai / சென்னை</option>
                      <option value="Madurai">Madurai / மதுரை</option>
                      <option value="Coimbatore">Coimbatore / கோவை</option>
                      <option value="Trichy">Trichy / திருச்சி</option>
                    </select>

                    {/* Status selection dropdown */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 py-2.5 px-3 rounded-xl focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Approved Members</option>
                      <option value="Pending">Pending Approval</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>

                  {/* Actions buttons on right */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={triggerCSVDownload}
                      className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow"
                    >
                      <FileSpreadsheet className="w-4.5 h-4.5" />
                      <span>Export Member Ledger (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Main Directory Table */}
                <div className="overflow-x-auto" id="members-directories-ledger-box">
                  <table className="w-full text-left border-collapse" id="members-list-table">
                    <thead>
                      <tr className="border-b border-slate-150 text-[10.5px] uppercase tracking-wider font-extrabold text-slate-450 select-none">
                        <th className="py-3 px-4">Membership ID</th>
                        <th className="py-3 px-2">Member Details</th>
                        <th className="py-3 px-4">Mobile & Contact</th>
                        <th className="py-3 px-4">Regional Ward</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-right">Operational Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                      {filteredMembersList.map((memb, index) => {
                        const isSuspended = memb.membershipNo.includes('SUSP');
                        const isPending = !memb.isRegistered && !isSuspended;
                        const isApproved = memb.isRegistered && !isSuspended;

                        return (
                          <tr key={memb.membershipNo || index} className="hover:bg-slate-50 transition-colors">
                            {/* Membership id */}
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                {memb.membershipNo}
                              </span>
                              <span className="block text-[9.5px] text-slate-400 mt-1 uppercase font-semibold">
                                Joined {memb.joinDate}
                              </span>
                            </td>

                            {/* Photo and Name */}
                            <td className="py-3.5 px-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={memb.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'}
                                  alt=""
                                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <h5 className="font-extrabold text-slate-850 text-xs">{memb.name}</h5>
                                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{memb.gender} • Guardian: {memb.guardian}</span>
                                </div>
                              </div>
                            </td>

                            {/* Mobile contact */}
                            <td className="py-3.5 px-4 font-mono font-bold">
                              <div>{memb.mobile}</div>
                              <div className="text-[10px] text-slate-400 font-normal select-all">{memb.email || 'no-email@needhikatchi.org'}</div>
                            </td>

                            {/* Ward */}
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold">{memb.district}</div>
                              <div className="text-[10.5px] text-slate-500 font-medium">{memb.constituency}</div>
                            </td>

                            {/* Badge */}
                            <td className="py-3.5 px-4">
                              {isApproved && (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 font-black px-2.5 py-1 rounded-full uppercase text-[8.5px] tracking-wider inline-block">
                                  Approved
                                </span>
                              )}
                              {isPending && (
                                <span className="bg-amber-50 text-amber-700 border border-amber-250 font-black px-2.5 py-1 rounded-full uppercase text-[8.5px] tracking-wider inline-block animate-pulse">
                                  Pending Review
                                </span>
                              )}
                              {isSuspended && (
                                <span className="bg-red-50 text-red-700 border border-red-200 font-black px-2.5 py-1 rounded-full uppercase text-[8.5px] tracking-wider inline-block">
                                  Suspended
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                
                                {/* Approve trigger */}
                                {isPending && (
                                  <button
                                    onClick={() => toggleMemberStatus(memb.membershipNo, 'approve')}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase py-1 px-2.5 rounded-lg border border-emerald-500 cursor-pointer"
                                    title="Approve Member registration"
                                  >
                                    Approve Card List
                                  </button>
                                )}

                                {/* Card Preview */}
                                {!isPending && (
                                  <button
                                    onClick={() => openMemberCard(memb)}
                                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer flex items-center justify-center min-h-[32px]"
                                    title="Preview Digital Membership Card & QR"
                                  >
                                    <CreditCard className="w-4 h-4 text-[#0047AB]" />
                                  </button>
                                )}

                                {/* Edit profile info */}
                                <button
                                  onClick={() => openEditMemberModal(memb)}
                                  className="p-1.5 bg-slate-105 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer flex items-center justify-center min-h-[32px]"
                                  title="Edit member particulars"
                                >
                                  <Edit2 className="w-4 h-4 text-slate-600" />
                                </button>

                                {/* Suspend or toggle */}
                                {isApproved && (
                                  <button
                                    onClick={() => toggleMemberStatus(memb.membershipNo, 'suspend')}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 font-black text-[9.5px] uppercase px-2 py-1 rounded-lg border border-red-200 cursor-pointer"
                                    title="Revoke / Suspend Member"
                                  >
                                    Suspend
                                  </button>
                                )}

                                {isSuspended && (
                                  <button
                                    onClick={() => toggleMemberStatus(memb.membershipNo, 'activate')}
                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[9.5px] uppercase px-2 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                                    title="Reactivate Member"
                                  >
                                    Activate
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredMembersList.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 font-bold select-none">
                            No member matches found. Clear search query state.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB 3: NEWS & STATEMENTS MANAGER     */}
          {/* ==================================== */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="tab-admin-news">
              
              {/* Left Column: Create News Form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 select-none">
                  <h4 className="text-xs font-black text-[#0047AB] uppercase tracking-wider flex items-center gap-1.5">
                    <PlusCircle className="w-5 h-5" />
                    <span>செய்திகள் வெளியீடு / CREATE NEWS BANNER</span>
                  </h4>
                  <p className="text-[10px] text-slate-450 mt-1">Publish press releases and updates directly into Member app.</p>
                </div>

                {newsAlertMsg && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-2.5 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    <span className="font-extrabold">{newsAlertMsg}</span>
                  </div>
                )}

                <form onSubmit={createNewsAnnouncement} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">News Category (Ta)</label>
                      <input
                        type="text"
                        value={newNewsCatTa}
                        onChange={(e) => setNewNewsCatTa(e.target.value)}
                        placeholder="அறிவிப்பு"
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Category (En)</label>
                      <input
                        type="text"
                        value={newNewsCatEn}
                        onChange={(e) => setNewNewsCatEn(e.target.value)}
                        placeholder="Announcement"
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">தலைப்பு (தமிழ்) / Tamil Title</label>
                    <input
                      type="text"
                      value={newNewsTitleTa}
                      onChange={(e) => setNewNewsTitleTa(e.target.value)}
                      placeholder="அறிக்கையின் தலைப்பை உள்ளிடவும்"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">English Title</label>
                    <input
                      type="text"
                      value={newNewsTitleEn}
                      onChange={(e) => setNewNewsTitleEn(e.target.value)}
                      placeholder="Enter the official English headline"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">விபரம் (தமிழ்) / Content Ta</label>
                    <textarea
                      value={newNewsContentTa}
                      onChange={(e) => setNewNewsContentTa(e.target.value)}
                      placeholder="அறிக்கை விபரங்கள்..."
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl h-24 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">English Content Description</label>
                    <textarea
                      value={newNewsContentEn}
                      onChange={(e) => setNewNewsContentEn(e.target.value)}
                      placeholder="Enter the full English bulletin text..."
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl h-24 focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0047AB] to-[#003B91] text-white py-3 px-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish News Bulletin</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Published News List & Analytics */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 select-none flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Published News Index
                    </h4>
                    <span className="text-[10px] text-slate-400">Manage statements in active member displays ({newsItems.length} articles)</span>
                  </div>
                  <span className="bg-[#008C45]/10 text-[#008C45] font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                    AINK Press Center
                  </span>
                </div>

                <div className="divide-y divide-slate-100 space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                  {newsItems.map((news) => (
                    <div key={news.id} className="pt-3.5 first:pt-0 flex gap-4 items-start">
                      <img
                        src={news.image}
                        alt=""
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 select-none">
                          <span className="bg-[#0047AB]/5 text-[#0047AB] border border-[#0047AB]/15 px-2 py-0.5 rounded font-black text-[8px] uppercase">
                            {news.categoryEn}
                          </span>
                          <span className="text-[9.5px] text-slate-400 font-bold font-mono">
                            📅 {news.date}
                          </span>
                          <span className="text-[9.5px] text-slate-500 font-semibold ml-auto">
                            👁️ {news.views} view logs
                          </span>
                        </div>

                        {/* Tamil heading */}
                        <h5 className="font-extrabold text-slate-850 text-xs mt-1 leading-tight truncate">
                          {news.titleTa}
                        </h5>
                        <p className="text-[10.5px] text-slate-500 truncate">{news.titleEn}</p>
                        
                        <div className="flex justify-end gap-1 mt-2 select-none">
                          <button
                            onClick={() => {
                              alert('Editing current news items relies on reactive central stores. To edit, modify on news form above or delete and insert new template.');
                            }}
                            className="text-slate-600 hover:text-slate-900 font-bold text-[10px] px-2 py-1 bg-slate-50 border border-slate-150 rounded"
                          >
                            Edit Block
                          </button>
                          <button
                            onClick={() => deleteNewsItem(news.id)}
                            className="text-red-600 hover:bg-red-50 font-bold text-[10px] px-2 py-1 border border-red-100 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================================== */}
          {/* TAB 4: EVENTS COORDINATION           */}
          {/* ==================================== */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="tab-admin-events">
              
              {/* Left Form: Create Target Campaign */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 select-none">
                  <h4 className="text-xs font-black text-[#0047AB] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-5 h-5 text-[#008C45]" />
                    <span>மண்டல நிகழ்வுகள் / CAMPAIGN SCHEDULER</span>
                  </h4>
                  <p className="text-[10px] text-slate-450 mt-1">Submit upcoming conferences, marches and community kitchen launches.</p>
                </div>

                {eventAlertMsg && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-2.5 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                    <span className="font-extrabold">{eventAlertMsg}</span>
                  </div>
                )}

                <form onSubmit={createCampaignEvent} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">நிகழ்வின் பெயர் (தமிழ்) / Malayalam Event Title</label>
                    <input
                      type="text"
                      value={newEventTitleTa}
                      onChange={(e) => setNewEventTitleTa(e.target.value)}
                      placeholder="எ.கா. மாபெரும் மக்கள் மாநாடு"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Event Title (En)</label>
                    <input
                      type="text"
                      value={newEventTitleEn}
                      onChange={(e) => setNewEventTitleEn(e.target.value)}
                      placeholder="e.g. Grand Agricultural Convention"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Scheduled Date</label>
                      <input
                        type="date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">District Coordinator</label>
                      <select className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-2 rounded-xl focus:outline-none">
                        <option>Chennai Central</option>
                        <option>Madurai Head</option>
                        <option>Coimbatore South</option>
                        <option>Trichy Delta Command</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">இடம் (தமிழ்) / Venue Ta</label>
                    <input
                      type="text"
                      value={newEventLocTa}
                      onChange={(e) => setNewEventLocTa(e.target.value)}
                      placeholder="மண்டபம், ஊர் முகவரி"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Venue Ground English</label>
                    <input
                      type="text"
                      value={newEventLocEn}
                      onChange={(e) => setNewEventLocEn(e.target.value)}
                      placeholder="Meeting Hall grounds, City"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">விவரங்கள் / Event Details</label>
                    <textarea
                      value={newEventDescEn}
                      onChange={(e) => setNewEventDescEn(e.target.value)}
                      placeholder="Brief descriptive logistics for attendees"
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2 h-20 rounded-xl focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#0047AB] to-[#003B91] text-white py-3 px-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4.5 h-4.5" />
                    <span>Create Campaign Assembly</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Events Program index list */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="pb-3 border-b border-slate-100 select-none flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Upcoming Assemblies Agenda
                    </h4>
                    <span className="text-[10px] text-slate-400">Active events synchronizing with Member schedules ({eventItems.length} campaigns)</span>
                  </div>
                  <span className="bg-amber-100 text-amber-800 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full select-none">
                    RSVP Registered Live
                  </span>
                </div>

                <div className="divide-y divide-slate-100 space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {eventItems.map((evnt) => (
                    <div key={evnt.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 items-start">
                      <img
                        src={evnt.image}
                        alt=""
                        className="w-24 h-16 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 select-none">
                          <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded font-black text-[8px] uppercase">
                            📅 {evnt.date}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold font-mono">
                            🕒 {evnt.timeEn}
                          </span>
                        </div>

                        <h5 className="font-extrabold text-slate-850 text-xs mt-1.5 leading-tight select-text">
                          {evnt.titleTa}
                        </h5>
                        <p className="text-[10.5px] text-slate-500 truncate select-all">{evnt.titleEn}</p>
                        
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-2 select-none">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{evnt.locationTa} ({evnt.locationEn})</span>
                        </div>

                        {/* Attendance simulation info */}
                        <div className="bg-slate-50 p-2 rounded-xl mt-3 text-[10px] flex items-center justify-between border border-slate-150 select-none">
                          <span className="text-slate-450 font-bold">Mock Attendance:</span>
                          <span className="font-mono text-[#0047AB] font-extrabold">240 registered • 112 present</span>
                          <button
                            onClick={() => alert(`Attendance logs downloadable as PDF simulation for ${evnt.titleEn}`)}
                            className="bg-[#0047AB]/5 text-[#0047AB] border border-[#0047AB]/10 text-[8px] font-black uppercase px-2 py-0.5 rounded"
                          >
                            attendance report
                          </button>
                        </div>

                        <div className="flex justify-end gap-1 mt-2.5 select-none">
                          <button
                            onClick={() => deleteCampaignEvent(evnt.id)}
                            className="text-red-600 hover:bg-red-50 font-bold text-[9.5px] px-2.5 py-1 border border-red-100 rounded"
                          >
                            Remove Event Agenda
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ==================================== */}
          {/* TAB 5: VOLUNTEERS TASK ALLOCATOR     */}
          {/* ==================================== */}
          {activeTab === 'volunteers' && (
            <div className="space-y-6" id="tab-admin-volunteers">
              
              {volSuccessMsg && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-3 rounded-2xl text-xs font-black flex items-center gap-2 select-none">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{volSuccessMsg}</span>
                </div>
              )}

              {/* Volunteers Network Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Tables Grid Left */}
                <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                  <div className="pb-3 border-b border-slate-100 mb-4 select-none">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                      AINK Volunteers Registry Ledger
                    </h4>
                    <span className="text-[10px] text-slate-400">Track active volunteer coordinators on constituency support duty</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" id="volunteers-list-table">
                      <thead>
                        <tr className="border-b border-slate-150 text-[10px] uppercase font-black text-slate-450 select-none">
                          <th className="py-2.5 px-4 font-bold">Vol ID</th>
                          <th className="py-2.5 px-2 font-bold">Name & Division</th>
                          <th className="py-2.5 px-4 font-bold">Mobile Link</th>
                          <th className="py-2.5 px-4 font-bold">Area Focus</th>
                          <th className="py-2.5 px-4 font-bold">Task Assigned</th>
                          <th className="py-2.5 px-4 font-bold">Perf Score</th>
                          <th className="py-2.5 px-4 text-right font-bold">Control</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                        {volunteers.map((vol) => (
                          <tr key={vol.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 font-mono font-bold text-slate-800">{vol.id}</td>
                            <td className="py-3 px-2 font-extrabold">{vol.name}</td>
                            <td className="py-3 px-4 font-mono select-all">{vol.mobile}</td>
                            <td className="py-3 px-4 uppercase select-none">
                              <span className="bg-[#0047AB]/5 text-[#0047AB] px-2 py-0.5 rounded font-black text-[9px] tracking-wide border border-[#0047AB]/10">
                                {vol.district.split('/')[0]}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-mono font-black">{vol.tasksCount} Tasks</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1.5 font-bold font-mono">
                                <span className={vol.performanceScore >= 90 ? 'text-emerald-600' : 'text-amber-600'}>
                                  {vol.performanceScore}%
                                </span>
                                <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden select-none">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${vol.performanceScore}%` }}></div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right select-none">
                              <button
                                onClick={() => setSelectedVolId(vol.id)}
                                className="bg-[#0047AB] hover:bg-[#003B91] active:scale-95 text-white font-black text-[9px] uppercase px-2.5 py-1.5 rounded-lg border border-blue-900 cursor-pointer shadow-xs"
                              >
                                Delegate Task
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Assignment Desk Right */}
                <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-slate-100 select-none">
                      <h4 className="text-xs font-black text-[#0047AB] uppercase tracking-wider flex items-center gap-1">
                        <Sliders className="w-5 h-5 text-amber-500" />
                        <span>ஆணையாளர் செயல்பாடுகள் / TASK ALLOCATOR DESK</span>
                      </h4>
                      <p className="text-[10px] text-slate-450 mt-1">Assign direct campaign coordinates to coordinators.</p>
                    </div>

                    <form onSubmit={assignTaskToVolunteer} className="space-y-4">
                      <div>
                        <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Select Target Coordinator</label>
                        <select
                          value={selectedVolId || ''}
                          onChange={(e) => setSelectedVolId(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-4 rounded-xl focus:outline-none"
                          required
                        >
                          <option value="">-- Choose Volunteer Coordinator --</option>
                          {volunteers.map(v => (
                            <option key={v.id} value={v.id}>{v.name} ({v.id})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Campaign Task Instructions</label>
                        <textarea
                          placeholder="e.g. Distribute 1000 flyers around Mylapore bus terminus on Saturday 3:00 PM."
                          value={taskText}
                          onChange={(e) => setTaskText(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-xs p-3.5 h-28 rounded-xl focus:outline-none"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-750 text-white py-3 px-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Send className="w-4 h-4" />
                        <span>Allocate and Notify Unit</span>
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB 6: PUSH ANNOUNCEMENTS FOR BROADCAST */}
          {/* ==================================== */}
          {activeTab === 'broadcast' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4" id="tab-admin-broadcast">
              <div className="pb-3 border-b border-slate-100 select-none text-center">
                <div className="w-12 h-12 rounded-full bg-[#0047AB]/10 text-[#0047AB] flex items-center justify-center mx-auto mb-2">
                  <Bell className="w-6 h-6 animate-swing" />
                </div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  AINK central alert broadcaster
                </h4>
                <p className="text-[11px] text-slate-450 mt-1">Broadcast real-time push announcements directly into Member app trays.</p>
              </div>

              {broadcastAlertMsg && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-3 rounded-2xl text-xs font-black flex items-center gap-2 select-none">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{broadcastAlertMsg}</span>
                </div>
              )}

              <form onSubmit={dispatchBroadcaster} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 select-none">
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Target Audience</label>
                    <select
                      value={broadcastTarget}
                      onChange={(e: any) => setBroadcastTarget(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                    >
                      <option value="all">Secure: All Members (முழு)</option>
                      <option value="district">Regional: Chennai Ward only</option>
                      <option value="volunteer">Field Units: Volunteer Network</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1">Notice Classification</label>
                    <select
                      value={alertCategory}
                      onChange={(e: any) => setAlertCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs py-2.5 px-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                    >
                      <option value="announcement">Announcement / அறிவிப்பு</option>
                      <option value="event">Event Alert / மாநாடுகள்</option>
                      <option value="membership">Member circular / பிரகடனம்</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 select-none">சுற்றறிக்கை தலைப்பு (தமிழ்) / Tamil Alert Title</label>
                  <input
                    type="text"
                    value={alertTitleTa}
                    onChange={(e) => setAlertTitleTa(e.target.value)}
                    placeholder="தலைப்பை உள்ளிடவும்"
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 select-none">English Announcement Title</label>
                  <input
                    type="text"
                    value={alertTitleEn}
                    onChange={(e) => setAlertTitleEn(e.target.value)}
                    placeholder="e.g. Critical Statement regarding State policy"
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 select-none">உரை விபரம் (தமிழ்) / Alert Body Ta</label>
                  <textarea
                    value={alertBodyTa}
                    onChange={(e) => setAlertBodyTa(e.target.value)}
                    placeholder="உறுப்பினர்களுக்கான சுற்றறிக்கை விபரங்கள்..."
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3.5 h-20 rounded-xl focus:outline-none animate-fade-in"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 select-none">English Alert Body description</label>
                  <textarea
                    value={alertBodyEn}
                    onChange={(e) => setAlertBodyEn(e.target.value)}
                    placeholder="Write the full announcement text for member feeds..."
                    className="w-full bg-slate-50 border border-slate-200 text-xs p-3.5 h-20 rounded-xl focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-650 to-red-750 text-white py-3.5 px-4 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:brightness-105 transition-all"
                  style={{ backgroundColor: '#DC2626' }}
                >
                  <Send className="w-4.5 h-4.5 text-white" />
                  <span>Push Broadcast to member app</span>
                </button>
              </form>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB 7: HELPLINE INQUIRIES            */}
          {/* ==================================== */}
          {activeTab === 'contacts' && (
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4" id="tab-admin-contacts">
              <div className="pb-3 border-b border-slate-100 mb-4 select-none flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    AINK Support Helpline Inbox
                  </h4>
                  <span className="text-[10px] text-slate-400">Track and respond to digital feedback and grievance inquiries ({contactQueries.length} forms)</span>
                </div>
                <span className="bg-[#0047AB]/10 text-[#0047AB] font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full select-none">
                  Central Desk Portal
                </span>
              </div>

              {/* Inquiries table ledger */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse" id="helpline-ledger">
                  <thead>
                    <tr className="border-b border-slate-150 text-[10.5px] uppercase font-bold text-slate-400 select-none">
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-2">Sender name</th>
                      <th className="py-2.5 px-4">Contact link</th>
                      <th className="py-2.5 px-4">Subject & feedback query</th>
                      <th className="py-2.5 px-4">STATUS</th>
                      <th className="py-2.5 px-4 text-right">Operation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                    {contactQueries.map((query) => (
                      <tr key={query.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold select-none">{query.date}</td>
                        <td className="py-3 px-2 font-extrabold">{query.name}</td>
                        <td className="py-3 px-4 font-mono select-all">{query.mobile}</td>
                        <td className="py-3 px-4 max-w-sm">
                          <div className="font-extrabold text-slate-800">{query.subject}</div>
                          <div className="text-[10.5px] text-slate-500 mt-0.5 whitespace-normal leading-relaxed">{query.message}</div>
                          {query.response && (
                            <div className="bg-emerald-50/50 border border-emerald-150 rounded-xl p-2.5 text-[10px] text-slate-600 mt-2">
                              <span className="font-black text-emerald-700 uppercase tracking-wide block mb-0.5">Admin Dispatch Response:</span>
                              {query.response}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 select-none">
                          {query.status === 'Pending' && (
                            <span className="bg-amber-55/10 text-amber-700 font-extrabold px-2.5 py-1 rounded-full uppercase text-[9px] tracking-wide animate-pulse">
                              Pending
                            </span>
                          )}
                          {query.status === 'Responded' && (
                            <span className="bg-emerald-50 text-emerald-750 font-extrabold px-2.5 py-1 rounded-full uppercase text-[9px] tracking-wide">
                              Responded
                            </span>
                          )}
                          {query.status === 'Closed' && (
                            <span className="bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase text-[9px] tracking-wide">
                              Closed
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right select-none">
                          <div className="flex items-center justify-end gap-1">
                            {query.status === 'Pending' && (
                              <button
                                onClick={() => {
                                  setActiveQuery(query);
                                  setResponseText('');
                                }}
                                className="bg-[#0047AB] hover:bg-[#003B91] active:scale-95 text-white font-extrabold text-[9px] uppercase py-1 px-2 rounded-lg"
                              >
                                Respond
                              </button>
                            )}
                            <button
                              onClick={() => changeQueryStatus(query.id, 'Closed')}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-[9px] uppercase py-1 px-2 rounded-lg"
                            >
                              Close File
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================== */}
          {/* TAB 8: SETTINGS & PERMISSIONS        */}
          {/* ==================================== */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4" id="tab-admin-settings">
              <div className="pb-3 border-b border-slate-100 select-none flex items-center gap-2">
                <Settings className="w-5.5 h-5.5 text-slate-500 animate-spin" style={{ animationDuration: '4000ms' }} />
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    AINK portal central node configuration
                  </h4>
                  <span className="text-[10px] text-slate-450 block">Modify official helpline details or manage operator users</span>
                </div>
              </div>

              {settingsSuccess && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-2.5 rounded-xl text-xs font-black">
                  ✓ Configuration settings updated globally inside memory storage nodes!
                </div>
              )}

              <form onSubmit={(e) => {
                e.preventDefault();
                setSettingsSuccess(true);
                setTimeout(() => setSettingsSuccess(false), 3000);
              }} className="space-y-4">
                
                <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Official Public Party Info
                </h5>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 ml-1 select-none">State Headquarters Mail</label>
                  <input
                    type="email"
                    value={partyInfoEmail}
                    onChange={(e) => setPartyInfoEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold mb-1 ml-1 select-none">State HQ Physical Address</label>
                  <input
                    type="text"
                    value={partyInfoHeadquarters}
                    onChange={(e) => setPartyInfoHeadquarters(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h5 className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">
                    Authorized Operators Users Permissions
                  </h5>

                  <div className="divide-y divide-slate-100 space-y-2 text-xs">
                    {[
                      { name: 'Dr. A.I.N. Karthikeyan', role: 'Super Admin', node: 'State HQ Code' },
                      { name: 'Administrator Unit', role: 'State Admin', node: 'AINK Chennai central' },
                      { name: 'District Operator Mylapore', role: 'Constituency Admin', node: 'Mylapore Desk link' }
                    ].map((oper, oIdx) => (
                      <div key={oIdx} className="pt-2 flex justify-between items-center">
                        <div>
                          <span className="font-extrabold text-slate-800 block">{oper.name}</span>
                          <span className="text-[9.5px] text-slate-450 uppercase block font-medium">Terminal Node: {oper.node}</span>
                        </div>
                        <span className="bg-[#0047AB]/5 text-[#0047AB] border border-[#0047AB]/10 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md">
                          {oper.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white py-3 px-4 mt-2 rounded-xl text-xs font-black uppercase tracking-wide cursor-pointer transition-all shadow-md"
                >
                  Save Configuration Nodes
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================= */}
      {/* GLOBAL MODALS AND OVERLAYS                                */}
      {/* ========================================================= */}
      
      {/* 1. MEMBERS EDIT POPUP MODAL */}
      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-[99999] select-none font-semibold">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 border border-slate-200 shadow-2xl space-y-4 animate-scale-up">
            <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                Edit Member particulars
              </h4>
              <button onClick={() => { setIsEditModalOpen(false); setSelectedMember(null); }} className="p-1 hover:bg-slate-50 rounded-lg">
                <X className="w-5 h-5 text-slate-450" />
              </button>
            </div>

            <form onSubmit={saveEditedMember} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700">Mobile Number</label>
                <input
                  type="tel"
                  value={editMobile}
                  onChange={(e) => setEditMobile(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700">District Ward</label>
                <input
                  type="text"
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700">Constituency Zone</label>
                <input
                  type="text"
                  value={editConstituency}
                  onChange={(e) => setEditConstituency(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-xs text-slate-800 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-slate-700">Email Address (Optional)</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl font-normal text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2 select-none">
                <button
                  type="button"
                  onClick={() => { setIsEditModalOpen(false); setSelectedMember(null); }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-extrabold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0047AB] hover:brightness-105 active:scale-95 text-white py-2.5 px-4 rounded-xl font-black uppercase shadow"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MEMBERS DIGITAL ID CARD POPUP OVERLAY */}
      {isCardModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-[99999] select-none font-semibold">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-4 animate-scale-up">
            <div className="pb-3 border-b border-slate-800 flex justify-between items-center select-none">
              <h4 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center gap-1.5">
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span>Card Preview Generated</span>
              </h4>
              <button onClick={() => { setIsCardModalOpen(false); setSelectedMember(null); }} className="p-1 hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Simulated Double-Sided Membership Card */}
            <div className="bg-gradient-to-br from-[#0047AB] to-[#002b6b] border-2 border-amber-450/40 rounded-2xl p-4 shadow-xl space-y-4 relative overflow-hidden text-white leading-normal">
              
              {/* Emblem badge overlay */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <img 
                  src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
                  alt="" 
                  className="w-28 h-28 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title brand banner */}
              <div className="flex items-center gap-2 pb-2.5 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0">
                  <img 
                    src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1781078235/AINK_f4nqzl.png" 
                    alt="AINK Logo" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-[10.5px] font-black uppercase tracking-wider leading-none">அகில இந்திய நீதி கட்சி</h3>
                  <span className="text-[8px] text-amber-400 uppercase tracking-widest font-bold block pt-0.5">ALL INDIA NEEDHI KATCHI</span>
                </div>
              </div>

              {/* Identity field content */}
              <div className="flex gap-3">
                <img
                  src={selectedMember.photo || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150'}
                  alt=""
                  className="w-16 h-18 rounded-xl object-cover border-2 border-white shrink-0"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div>
                    <span className="text-[8.5px] text-[#A5C2F6] font-bold block uppercase leading-none">FullName</span>
                    <h4 className="text-[11.5px] font-extrabold truncate text-white">{selectedMember.name}</h4>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-[#A5C2F6] font-bold block uppercase leading-none">Membership ID No.</span>
                    <span className="text-[10.5px] font-bold text-amber-300 font-mono tracking-wider">{selectedMember.membershipNo}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-[#A5C2F6] font-bold block uppercase leading-none">Constituency / Ward</span>
                    <span className="text-[10px] font-semibold text-slate-200 block truncate">{selectedMember.constituency.split('/')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with digital barcode emblem */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 select-none text-[8.5px] text-slate-300 font-medium">
                <div>
                  <span className="block italic leading-none">Status: ACTIVE</span>
                  <span className="block mt-0.5">Joined: {selectedMember.joinDate}</span>
                </div>

                <div className="bg-white p-1 rounded font-normal shrink-0">
                  <QrCode className="w-5.5 h-5.5 text-slate-950" />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 font-black select-none">
              <button
                onClick={() => {
                  alert(language === 'ta' ? 'அட்டை அச்சிடு முறைமை தயார் நிலையில் உள்ளது!' : 'Digital PNG layout downloaded successfully.');
                  setIsCardModalOpen(false);
                  setSelectedMember(null);
                }}
                className="flex-1 bg-[#0047AB] hover:brightness-105 active:scale-95 text-white py-2 px-3 rounded-xl text-xs uppercase flex items-center justify-center gap-1 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>
              <button
                onClick={() => {
                  alert(language === 'ta' ? 'உறுப்பினர் விபரங்கள் PDF ஆக ஏற்றுமதி செய்யப்பட்டது!' : 'PDF ledger voucher dispatched to local downloads.');
                  setIsCardModalOpen(false);
                  setSelectedMember(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white py-2 px-3 rounded-xl text-xs uppercase flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. INQUIRIES RESPONSE POPUP MODAL */}
      {activeQuery && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-[99999] select-none font-semibold">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 border border-slate-200 shadow-2xl space-y-4 animate-scale-up">
            <div className="pb-3 border-b border-slate-100 flex justify-between items-center select-none">
              <h4 className="text-xs font-black text-slate-850 uppercase tracking-widest leading-none">
                Helpline Dispatch Response desk
              </h4>
              <button onClick={() => setActiveQuery(null)} className="p-1 hover:bg-slate-50 rounded-lg">
                <X className="w-5 h-5 text-slate-405" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-150 text-xs">
              <span className="font-black text-[#0047AB] uppercase tracking-wide block mb-1">Grievance Feedback Inquiry Detail:</span>
              <div className="font-extrabold text-slate-800 mb-0.5">{activeQuery.subject}</div>
              <p className="text-slate-600 leading-normal font-medium">{activeQuery.message}</p>
              <div className="text-[10px] text-slate-400 font-bold block mt-1.5 leading-none">Sender: {activeQuery.name} ({activeQuery.mobile})</div>
            </div>

            <form onSubmit={submitQueryResponse} className="space-y-4">
              <div>
                <label className="block text-slate-700 text-[10.5px] font-bold mb-1 select-none">Response / Resolution message text</label>
                <textarea
                  placeholder="Type dispatch solution feedback message or resolution summary here..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs p-3 h-24 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0047AB]"
                  required
                ></textarea>
              </div>

              <div className="flex gap-2 select-none">
                <button
                  type="button"
                  onClick={() => setActiveQuery(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-extrabold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white py-2.5 px-4 rounded-xl font-black uppercase"
                >
                  Dispatch Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
