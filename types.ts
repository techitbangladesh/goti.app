
export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';
export type PackageCategory = 'all' | '7d' | '1m' | 'family' | 'student' | 'free';

export interface Package {
  id: string;
  nameEn: string;
  nameBn: string;
  durationEn: string;
  durationBn: string;
  price: number;
  category: PackageCategory;
  isFreeTrial?: boolean;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  activePackage?: string;
  expiryTimestamp?: number; // Time in ms since epoch
}

export interface TranslationStrings {
  logo: string;
  heroHeadline: string;
  heroSubheadline: string;
  buyBtn: string;
  loginBtn: string;
  packagesTitle: string;
  loginPrompt: string;
  loginViaWA: string;
  profileTitle: string;
  activePack: string;
  expiry: string;
  editProfile: string;
  save: string;
  langLabel: string;
  themeLabel: string;
  benefits: {
    speed: { title: string; desc: string };
    price: { title: string; desc: string };
    flex: { title: string; desc: string };
  };
}
