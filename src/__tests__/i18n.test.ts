import { describe, it, expect } from 'vitest';
import { TRANSLATIONS } from '../lib/i18n/LanguageContext';

describe('i18n Bilingual Engine', () => {
  it('should have complete translations for both TR and EN', () => {
    expect(TRANSLATIONS).toHaveProperty('tr');
    expect(TRANSLATIONS).toHaveProperty('en');

    // Nav keys match
    const trNavKeys = Object.keys(TRANSLATIONS.tr.nav).sort();
    const enNavKeys = Object.keys(TRANSLATIONS.en.nav).sort();
    expect(trNavKeys).toEqual(enNavKeys);

    // Navbar keys match
    const trNavbarKeys = Object.keys(TRANSLATIONS.tr.navbar).sort();
    const enNavbarKeys = Object.keys(TRANSLATIONS.en.navbar).sort();
    expect(trNavbarKeys).toEqual(enNavbarKeys);

    // Common keys match
    const trCommonKeys = Object.keys(TRANSLATIONS.tr.common).sort();
    const enCommonKeys = Object.keys(TRANSLATIONS.en.common).sort();
    expect(trCommonKeys).toEqual(enCommonKeys);
  });

  it('should provide distinct translated content for key labels', () => {
    expect(TRANSLATIONS.tr.nav.dashboard).toBe('Yönetici Paneli');
    expect(TRANSLATIONS.en.nav.dashboard).toBe('Executive Dashboard');

    expect(TRANSLATIONS.tr.nav.alerts).toBe('Kriz Tespit Radarı');
    expect(TRANSLATIONS.en.nav.alerts).toBe('Defect Spike Crisis Radar');

    expect(TRANSLATIONS.tr.common.loading).toBe('Yükleniyor...');
    expect(TRANSLATIONS.en.common.loading).toBe('Loading...');
  });
});
