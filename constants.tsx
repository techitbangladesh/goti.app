
import { TranslationStrings, Package } from './types';

export const CONTACT_NUMBER = "+8801613-887465";
export const WHATSAPP_LINK = "https://wa.me/8801613887465";

export const PACKAGES: Package[] = [
  { id: 'free-trial', nameEn: 'Goti Free Trial', nameBn: 'গতি ফ্রি ট্রায়াল', durationEn: '1 Hour', durationBn: '১ ঘন্টা', price: 0, category: 'free', isFreeTrial: true },
  { id: '1', nameEn: 'Goti Student Unlimited', nameBn: 'গতি স্টুডেন্ট আনলিমিটেড', durationEn: '30 days', durationBn: '৩০ দিন', price: 180, category: 'student' },
  { id: '2', nameEn: 'Goti Family Unlimited', nameBn: 'গতি ফ্যামিলি আনলিমিটেড', durationEn: '30 days', durationBn: '৩০ দিন', price: 300, category: 'family' },
  { id: '3', nameEn: 'Goti Plus+ Unlimited', nameBn: 'গতি প্লাস+ আনলিমিটেড', durationEn: '30 days', durationBn: '৩০ দিন', price: 500, category: 'family' },
  { id: '4', nameEn: 'Goti Regular Unlimited (7d)', nameBn: 'গতি রেগুলার আনলিমিটেড (৭ দিন)', durationEn: '7 days', durationBn: '৭ দিন', price: 50, category: '7d' },
  { id: '5', nameEn: 'Goti Regular Unlimited (15d)', nameBn: 'গতি রেগুলার আনলিমিটেড (১৫ দিন)', durationEn: '15 days', durationBn: '১৫ দিন', price: 90, category: '7d' },
];

export const SOCIAL_LINKS = [
  { name: 'YouTube', url: 'https://youtube.com/@nabasocial24bd?si=FZm2ymvXIGdFydUH', icon: 'Youtube' },
  { name: 'Mahfil', url: 'https://mahfil.net/channel/Rwavfx6Lio43CEz', icon: 'Video' },
  { name: 'Facebook', url: 'https://www.facebook.com/siyamns24', icon: 'Facebook' },
  { name: 'Hikmah', url: 'https://hikmah.net/@siyamns24', icon: 'ShieldCheck' },
  { name: 'Upscrolled', url: 'https://share.upscrolled.com/en/user/5af53970-701b-4da6-974d-9ce725774a63/', icon: 'TrendingUp' },
  { name: 'Telegram', url: 'https://t.me/techitnetwork', icon: 'Send' },
  { name: 'WhatsApp', url: WHATSAPP_LINK, icon: 'MessageCircle' },
  { name: 'Email', url: 'mailto:info.techitnetwork@gmail.com', icon: 'Mail' },
];

export const TRANSLATIONS: Record<'en' | 'bn', TranslationStrings> = {
  en: {
    logo: "Goti",
    heroHeadline: "Fast, reliable internet",
    heroSubheadline: "Experience lightning speed at your fingertips",
    buyBtn: "Buy Internet",
    loginBtn: "Login / Register",
    packagesTitle: "Internet Packages",
    loginPrompt: "Enter your identity to establish connection with our core network.",
    loginViaWA: "Enter Dashboard",
    profileTitle: "My Profile",
    activePack: "Active Package",
    expiry: "Expiry Date",
    editProfile: "Edit Profile",
    save: "Save Changes",
    langLabel: "English",
    themeLabel: "Theme",
    benefits: {
      speed: { title: "Super Speed", desc: "Symmetrical fiber optics for peak performance" },
      price: { title: "Affordable", desc: "Most cost-effective plans in Bangladesh" },
      flex: { title: "Flexible", desc: "On-demand recharge for your lifestyle" }
    }
  },
  bn: {
    logo: "গতি",
    heroHeadline: "দ্রুত ও নির্ভরযোগ্য ইন্টারনেট",
    heroSubheadline: "সর্বোচ্চ গতি, সহজ প্যাক কেনা",
    buyBtn: "ইন্টারনেট কিনুন",
    loginBtn: "লগইন / রেজিস্টার",
    packagesTitle: "ইন্টারনেট প্যাকেজ",
    loginPrompt: "আমাদের নেটওয়ার্ক ড্যাশবোর্ডে প্রবেশ করতে আপনার তথ্য প্রদান করুন।",
    loginViaWA: "ড্যাশবোর্ডে প্রবেশ করুন",
    profileTitle: "আমার প্রোফাইল",
    activePack: "সক্রিয় প্যাকেজ",
    expiry: "মেয়াদ শেষ হবে",
    editProfile: "প্রোফাইল পরিবর্তন",
    save: "সেভ করুন",
    langLabel: "বাংলা",
    themeLabel: "থিম",
    benefits: {
      speed: { title: "সুপার স্পিড", desc: "আপনার সব প্রয়োজনের জন্য নিরবচ্ছিন্ন গতি" },
      price: { title: "সাশ্রয়ী", desc: "দেশের সেরা মূল্যের ইন্টারনেট প্যাক" },
      flex: { title: "সহজলভ্য", desc: "আপনার জীবনযাত্রার সাথে মানানসই প্যাক" }
    }
  }
};
