/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ta' | 'en';

export type ScreenId =
  | 'splash'
  | 'login'
  | 'dashboard'
  | 'register'
  | 'idcard'
  | 'profile'
  | 'news'
  | 'events'
  | 'volunteer'
  | 'contact'
  | 'notifications';

export type DeviceType = 'android' | 'ios';

export interface UserData {
  name: string;
  guardian: string;
  mobile: string;
  email: string;
  gender: string;
  dob: string;
  district: string;
  constituency: string;
  address: string;
  photo: string; // Base64 or standard URL
  membershipNo: string;
  joinDate: string;
  isRegistered: boolean;
  isLoggedIn: boolean;
}

export interface NewsItem {
  id: string;
  titleTa: string;
  titleEn: string;
  summaryTa: string;
  summaryEn: string;
  contentTa: string;
  contentEn: string;
  date: string;
  image: string;
  categoryTa: string;
  categoryEn: string;
  views: number;
}

export interface EventItem {
  id: string;
  titleTa: string;
  titleEn: string;
  date: string;
  timeTa: string;
  timeEn: string;
  locationTa: string;
  locationEn: string;
  descriptionTa: string;
  descriptionEn: string;
  image: string;
  isRegistered: boolean;
}

export interface VolunteerData {
  skills: string[];
  availability: string;
  interest: string;
  isRegistered: boolean;
}

export interface PartyNotification {
  id: string;
  titleTa: string;
  titleEn: string;
  bodyTa: string;
  bodyEn: string;
  timeTa: string;
  timeEn: string;
  category: 'announcement' | 'event' | 'membership';
  isRead: boolean;
}
