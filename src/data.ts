/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsItem, EventItem, PartyNotification } from './types';

export const TN_DISTRICTS_AND_CONSTITUENCIES: { [district: string]: string[] } = {
  'Chennai / சென்னை': [
    'Mylapore / மயிலாப்பூர்',
    'Royapuram / ராயபுரம்',
    'Thousand Lights / ஆயிரம் விளக்கு',
    'Chepauk-Thiruvallikeni / சேப்பாக்கம்-திருவல்லிக்கேணி',
    'Harbour / துறைமுகம்',
    'Saidapet / சைதாப்பேட்டை',
    'Velachery / வேளச்சேரி',
    'Dr. Radhakrishnan Nagar / ஆர்.கே. நகர்',
    'Perambur / பெரம்பூர்'
  ],
  'Coimbatore / கோயம்புத்தூர்': [
    'Coimbatore South / கோவை தெற்கு',
    'Coimbatore North / கோவை வடக்கு',
    'Singanallur / சிங்காநல்லூர்',
    'Kavundampalayam / கவுண்டம்பாளையம்',
    'Thondamuthur / தொண்டாமுத்தூர்'
  ],
  'Madurai / மதுரை': [
    'Madurai West / மதுரை மேற்கு',
    'Madurai East / மதுரை கிழக்கு',
    'Madurai Central / மதுரை மத்திய',
    'Thiruparankundram / திருப்பரங்குன்றம்',
    'Melur / மேலூர்'
  ],
  'Trichy / திருச்சி': [
    'Trichy East / திருச்சி கிழக்கு',
    'Trichy West / திருச்சி மேற்கு',
    'Srirangam / ஸ்ரீரங்கம்',
    'Thiruverumbur / திருவெறும்பூர்'
  ],
  'Salem / சேலம்': [
    'Salem North / சேலம் வடக்கு',
    'Salem South / சேலம் தெற்கு',
    'Salem West / சேலம் மேற்கு',
    'Edappadi / எடப்பாடி'
  ],
  'Tirunelveli / திருநெல்வேலி': [
    'Tirunelveli / திருநெல்வேலி',
    'Ambasamudram / அம்பாசமுத்திரம்',
    'Palayamkottai / பாளையங்கோட்டை'
  ],
  'Kanyakumari / கன்னியாகுமரி': [
    'Nagercoil / நாகர்கோவில்',
    'Kanyakumari / கன்னியாகுமரி',
    'Colachel / கொளச்சல்'
  ],
  'Thanjavur / தஞ்சாவூர்': [
    'Thanjavur / தஞ்சாவூர்',
    'Kumbakonam / கும்பகோணம்',
    'Pattukkottai / பட்டுக்கோட்டை'
  ]
};

export const PARTY_PRESIDENT_MESSAGE = {
  nameTa: "முனைவர். ஏ. ஐ. என். கார்த்திகேயன்",
  nameEn: "Dr. A. I. N. Karthikeyan",
  designationTa: "நிறுவனர் & மாநிலத் தலைவர்",
  designationEn: "Founder & State President",
  messageTa: "அன்பான தமிழக மக்களுக்கும், நமது கட்சியின் அர்ப்பணிப்புள்ள தொண்டர்களுக்கும் என் மனமார்ந்த வணக்கங்கள். 'நீதி, முன்னேற்றம், நம்பிக்கை' என்ற நமது தாரக மந்திரத்தின் அடிப்படையில், தமிழகத்தின் அனைத்து குடிமக்களுக்கும் சமமான உரிமைகளும், தரமான கல்வியும், வேலைவாய்ப்பும் கிடைப்பதை உறுதி செய்வதே நமது லட்சியம். நேர்மையான, வெளிப்படையான, ஊழலற்ற நல்லாட்சியை வழங்க நாம் அனைவரும் ஒன்றிணைந்து செயல்படுவோம். வாருங்கள், புதிய தமிழகத்தை உருவாக்குவோம்!",
  messageEn: "My warmest greetings to the beloved people of Tamil Nadu and our dedicated party members. Based on our core values: 'Justice, Progress, and Trust', our mission is to ensure equal rights, quality education, and employment opportunities for every citizen. Let us all work together to provide honest, transparent, and corruption-free good governance. Come, let us build a prosperous and progressive Tamil Nadu together!"
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    titleTa: 'மாபெரும் மக்கள் நீதி மாநாடு: லட்சக்கணக்கில் திரளும் பொதுமக்கள்!',
    titleEn: 'Grand People’s Justice Conclave: Lakhs of Citizens Gathering!',
    summaryTa: 'திருச்சியில் வருகிற ஞாயிற்றுக்கிழமை நடைபெறவுள்ள மாநில அளவிலான மாநாட்டிற்கான ஏற்பாடுகள் தீவிரம்.',
    summaryEn: 'Preparations in full swing for the upcoming state-level mega conclave in Trichy this Sunday.',
    contentTa: 'நமது அகில இந்தியா நீதி கட்சியின் திருப்புமுனை மாநாடாக அமையவிருக்கும் "மக்கள் நீதி மாநாடு" வருகின்ற ஞாயிற்றுக்கிழமை திருச்சியில் மாநிலத்தலைவர் தலைமையில் பிரம்மாண்டமாக நடைபெற உள்ளது. இதற்கான பந்தல் அமைக்கும் பணிகள் மற்றும் மக்கள் பாதுகாப்பு ஏற்பாடுகள் கிட்டத்தட்ட நிறைவுபெற்றுள்ளன. ஊழலற்ற தமிழகத்தை உருவாக்கவும், சமூக நீதியை நிலைநாட்டவும் இந்த மாநாட்டில் புதிய கொள்கை பிரகடனங்கள் வெளியிடப்பட உள்ளன.',
    contentEn: 'The landmark "People’s Justice Conclave" of Akhila India Needhi Katchi is scheduled to take place grandly in Trichy this Sunday, presided over by our State President. Stage and security preparation works are near completion. Major policy declarations will be unveiled at this conclave targeting social justice and clean governance across Tamil Nadu.',
    date: '2026-06-18',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600',
    categoryTa: 'அறிவிப்பு',
    categoryEn: 'Announcement',
    views: 1240
  },
  {
    id: 'news-2',
    titleTa: 'இலவச டிஜிட்டல் கல்வி மற்றும் வேலைவாய்ப்பு முகாம் துவக்கம்',
    titleEn: 'Free Digital Education and Career Drive Launched',
    summaryTa: 'இளைஞர்களுக்கு புதிய வேலைவாய்ப்புகளை உருவாக்கும் நோக்கில் தமிழகம் முழுவதும் 50 மையங்கள் திறப்பு.',
    summaryEn: '50 digital centers opened across Tamil Nadu to empower and build skills for the youth.',
    contentTa: 'இளைஞர்களின் திறன்களை மேம்படுத்தி நவீன வேலைவாய்ப்புகளுக்கு அவர்களைத் தகுதிபெறச் செய்வதற்காக "நீதி கல்வி சேவை" மையம் சார்பாக தமிழகம் முழுவதும் 50-க்கும் மேற்பட்ட இடங்களில் இலவச கம்ப்யூட்டர் மற்றும் திறன் மேம்பாட்டு வகுப்புகள் தொடங்கப்பட்டுள்ளன. இதன் வழி பல்லாயிரக்கணக்கான ஏழை மாணவர்களுக்கு இலவச சான்றிதழ் படிப்புகளும், வளாக வேலைவாய்ப்பு நேர்காணல்களும் ஏற்பாடு செய்யப்படுகின்றன.',
    contentEn: 'To enhance youth skills and qualify them for modern career opportunities, more than 50 free computer and skill enablement centers have been launched across Tamil Nadu under the "Needhi Education Service". Through this initiative, thousands of underprivileged students will receive free certification courses and campus placement support.',
    date: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    categoryTa: 'சமூக சேவை',
    categoryEn: 'Social Service',
    views: 942
  },
  {
    id: 'news-3',
    titleTa: 'விவசாயிகள் பாதுகாப்பு மற்றும் நீர்ப்பாசன மேம்பாட்டு மாநாடு',
    titleEn: 'Farmers Protection and Irrigation Improvement Forum',
    summaryTa: 'காவிரி டெல்டா பகுதியில் விவசாயத் தோழர்களை நேரில் சந்தித்து குறைகளைக் கேட்டறிந்தார் கட்சியின் தலைவர்.',
    summaryEn: 'Party President directly met and listened to issues raised by Delta farmers regarding irrigation support.',
    contentTa: 'காவிரி டெல்டா மாவட்டங்களில் சுற்றுப்பயணம் மேற்கொண்ட நமது கட்சியின் தலைவர், விவசாய சங்கப் பிரதிநிதிகள் மற்றும் உழவர்களைச் சந்தித்து முறையான பாசன நீர்க்குவிப்பு மற்றும் விளைபொருட்களுக்கு நியாயமான விலை கிடைக்கச் செய்வதற்கான திட்டப் வரைவை சமர்ப்பித்தார். விவசாயிகள் நலனே நாட்டின் முதுகெலும்பு என்று அவர் இக்கூட்டத்தில் வலியுறுத்தினார்.',
    contentEn: 'Our Party President toured delta districts to meet farmers union representatives, introducing our party’s major drafted project reports for modern irrigation channels and minimum support price guarantees. He emphasized that the prosperity of our farmers remains the backbone of the nation.',
    date: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=600',
    categoryTa: 'விவசாயம்',
    categoryEn: 'Agriculture',
    views: 815
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    titleTa: 'மதுரையில் மாபெரும் உறுப்பினர் சேர்க்கை முகாம்',
    titleEn: 'Grand Membership Drive in Madurai',
    date: '2026-06-25',
    timeTa: 'காலை 9:00 - மாலை 5:00',
    timeEn: '9:00 AM - 5:00 PM',
    locationTa: 'அண்ணா திருமண மண்டபம், மதுரை மாட்டுத்தாவணி அருகில்',
    locationEn: 'Anna Marriage Hall, Near Mattuthavani, Madurai',
    descriptionTa: 'மதுரை மற்றும் அதன் சுற்றுவட்டாரப் பகுதிகளைச் சேர்ந்த இளைஞர்கள் மற்றும் பெண்கள் தங்களை அகில இந்தியா நீதி கட்சியில் உறுப்பினராக இணைத்துக் கொள்ள ஏதுவாக நடைபெறும் சிறப்பு முகாம். அனைவரும் வருக!',
    descriptionEn: 'A special mega-drive organized for youths and women in and around Madurai to join as digital card-holding members of the party. All are welcome!',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    isRegistered: false
  },
  {
    id: 'event-2',
    titleTa: 'பசிப்பிணி போக்கும் ‘நீதி மக்கள் சமையல்’ துவக்க விழா',
    titleEn: 'Launch of "Needhi Community Kitchen" Scheme',
    date: '2026-06-29',
    timeTa: 'மதியம் 12:00',
    timeEn: '12:00 PM',
    locationTa: 'வடசென்னை மாவட்ட தலைமை அலுவலகம், சென்னை',
    locationEn: 'North Chennai District Headquarters, Chennai',
    descriptionTa: 'ஏழை எளிய மக்களுக்கு நாள்தோறும் மதிய உணவை வெறும் ₹5 விலையில் வழங்கும் மாபெரும் மக்கள் நலத் திட்டம் மாநில தலைவரால் துவங்கப்பட உள்ளது. தொண்டர்கள் பங்கேற்று சிறப்பிப்பீர்.',
    descriptionEn: 'A flagship community health and development scheme to offer comprehensive, hygienic lunch meals daily for just ₹5 to the underprivileged, launched by our State President.',
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b2ce?auto=format&fit=crop&q=80&w=600',
    isRegistered: false
  },
  {
    id: 'event-3',
    titleTa: 'சுற்றுச்சூழல் பாதுகாப்பு மரக்கன்று நடும் விழா',
    titleEn: 'Eco-Protection Tree Plantation Campaign',
    date: '2026-07-05',
    timeTa: 'காலை 7:30',
    timeEn: '7:30 AM',
    locationTa: 'வைகை ஆற்றங்கரைப் பகுதி, கோவை மற்றும் திருச்சி',
    locationEn: 'River Bed Parks, Coimbatore & Trichy',
    descriptionTa: 'சுற்றுச்சூழலை காப்போம், பசுமை வளர்ப்போம்! கட்சியின் இளைஞர் அணி சார்பாக 10,000 மரக்கன்றுகள் நடும் பிரம்மாண்டமான இயக்கம். தன்னார்வலர்கள் தங்களை முன்பதிவு செய்து கொள்ளவும்.',
    descriptionEn: 'Save our environment, grow green! A mega-initiative organized by the Youth Wing to plant 10,000 native saplings. Register as volunteers to secure your target zone.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    isRegistered: false
  }
];

export const INITIAL_NOTIFICATIONS: PartyNotification[] = [
  {
    id: 'notify-1',
    titleTa: 'வாழ்த்துகள்! உங்கள் உறுப்பினர் அட்டை தயார்',
    titleEn: 'Congratulations! Your Digital ID Card is Ready',
    bodyTa: 'அகில இந்தியா நீதி கட்சியில் சேர்ந்ததற்கு நன்றி. உங்கள் டிஜிட்டல் உறுப்பினர் அட்டையை "My ID Card" பிரிவில் காண்க.',
    bodyEn: 'Thank you for joining Akhila India Needhi Katchi. View your fully ready digital membership card in the "My ID Card" tab.',
    timeTa: 'இப்போது',
    timeEn: 'Just now',
    category: 'membership',
    isRead: false
  },
  {
    id: 'notify-2',
    titleTa: 'தலைவரின் மாதாந்திர நேரடி உரை',
    titleEn: 'President Monthly Live Address',
    bodyTa: 'வருகிற ஜூன் 21 மாலை 6:00 மணிக்கு நமது கட்சியின் தலைவர் செயலி மூலமாக நம்மிடையே நேரடி உரையாற்ற உள்ளார்.',
    bodyEn: 'Our honorable Party President will deliver a special live-streamed address through the app on June 21 at 6:00 PM.',
    timeTa: '2 மணிநேரத்திற்கு முன்',
    timeEn: '2 hours ago',
    category: 'announcement',
    isRead: false
  },
  {
    id: 'notify-3',
    titleTa: 'தொண்டர்கள் கவனத்திற்கு: உறுப்பினர் சேர்க்கை முகாம்!',
    titleEn: 'Members Attention: Recruitment Drive update!',
    bodyTa: 'மதுரையில் நடைபெற உள்ள மாபெரும் உறுப்பினர் சேர்க்கை முகாமில் கலந்துகொள்ள முன்பதிவு இப்போது ஆரம்பம்.',
    bodyEn: 'Reservations are now open to volunteer at the grand membership drive located in Madurai.',
    timeTa: '1 நாளுக்கு முன்',
    timeEn: '1 day ago',
    category: 'event',
    isRead: true
  }
];
