import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent, formatNumber } from '../lib/utils/formatters';

describe('Formatting Utilities', () => {
  it('formats currency correctly', () => {
    expect(formatCurrency(14500)).toBe('$14,500');
    expect(formatCurrency(0)).toBe('$0');
  });

  it('formats percentage correctly', () => {
    expect(formatPercent(23.412)).toBe('23.4%');
    expect(formatPercent(5)).toBe('5.0%');
  });

  it('formats number with separators', () => {
    expect(formatNumber(1250000)).toBe('1,250,000');
  });
});
