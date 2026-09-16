'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tr' | 'en';

export interface Translations {
  nav: {
    dashboard: string;
    analytics: string;
    alerts: string;
    catalog: string;
    competitors: string;
    hypotheses: string;
    personaChat: string;
    recovery: string;
    import: string;
    reports: string;
    navigation: string;
    activeScope: string;
    version: string;
    tagline: string;
  };
  navbar: {
    multiStoreActive: string;
    storeSelectTitle: string;
    roleSelectTitle: string;
    roleTagline: string;
    github: string;
  };
  common: {
    loading: string;
    success: string;
    error: string;
    copy: string;
    copied: string;
    search: string;
    send: string;
    viewDetails: string;
    allSectors: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  tr: {
    nav: {
      dashboard: 'Yönetici Paneli',
      analytics: 'Duygu & Ciro Analitiği',
      alerts: 'Kriz Tespit Radarı',
      catalog: 'Ürün & Kusur Kataloğu',
      competitors: 'Rakip Kıyaslama',
      hypotheses: 'Büyüme & A/B Lab',
      personaChat: 'Müşteri Mülakatı',
      recovery: 'İade Kurtarma Ajanı',
      import: 'Veri Aktarımı & Kazıyıcı',
      reports: 'Yönetici & Fabrika Raporu',
      navigation: 'Menü',
      activeScope: 'Aktif Sektörel Kapsam',
      version: 'v2.5 Pro',
      tagline: 'Marka-Bağımsız Çok Kanallı AI Büyüme Motoru',
    },
    navbar: {
      multiStoreActive: 'Çoklu Mağaza AI Aktif',
      storeSelectTitle: 'Mağaza & Marka Seçimi (Multi-Store)',
      roleSelectTitle: 'Rol Tabanlı Erişim (RBAC Profili)',
      roleTagline: 'Rol / Yetki',
      github: 'GitHub',
    },
    common: {
      loading: 'Yükleniyor...',
      success: 'Başarılı',
      error: 'Hata',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      search: 'Ara...',
      send: 'Gönder',
      viewDetails: 'Detaylı İnceleme',
      allSectors: 'Tüm Sektörler',
    },
  },
  en: {
    nav: {
      dashboard: 'Executive Dashboard',
      analytics: 'Sentiment & ROI Analytics',
      alerts: 'Defect Spike Crisis Radar',
      catalog: 'Catalog & Chronic Defects',
      competitors: 'Competitor Benchmark',
      hypotheses: 'Growth & A/B Lab',
      personaChat: 'Multi-Persona Chat',
      recovery: 'AI Return-Save Agent',
      import: 'Review Ingestion & Scraper',
      reports: 'Executive & Factory Reports',
      navigation: 'Navigation',
      activeScope: 'Active Sector Coverage',
      version: 'v2.5 Pro',
      tagline: 'Brand-Agnostic Omni-Channel Growth Engine',
    },
    navbar: {
      multiStoreActive: 'Multi-Store AI Active',
      storeSelectTitle: 'Store & Brand Selection (Multi-Store)',
      roleSelectTitle: 'Role-Based Access Control (RBAC Profile)',
      roleTagline: 'Role / Access',
      github: 'GitHub',
    },
    common: {
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      copy: 'Copy',
      copied: 'Copied',
      search: 'Search...',
      send: 'Send',
      viewDetails: 'View Details',
      allSectors: 'All Sectors',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('tr');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('reviewiq_language') as Language;
      if (saved && (saved === 'tr' || saved === 'en')) {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('reviewiq_language', lang);
    } catch {}
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
