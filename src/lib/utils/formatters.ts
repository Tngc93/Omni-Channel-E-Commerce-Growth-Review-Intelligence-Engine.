export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}
