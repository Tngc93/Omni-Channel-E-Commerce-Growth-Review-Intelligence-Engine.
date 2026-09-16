'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import {
  FileText,
  Printer,
  Download,
  Building2,
  Factory,
  ShieldAlert,
  CheckCircle2,
  TrendingDown,
  Layers,
  Code2
} from 'lucide-react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'executive' | 'supplier'>('executive');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header (Hidden during print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <FileText className="h-3.5 w-3.5" />
            <span>Audit & Executive Reporting Engine</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Yönetici & Tedarikçi Kalite Brifleri
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Haftalık yönetim kurulu sunumları veya denizaşırı fason fabrikalara iletilecek teknik kalite tolerans raporlarını tek tıkla yazdırın veya PDF olarak kaydedin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handlePrint} className="cursor-pointer">
            <Printer className="h-4 w-4 mr-1.5" />
            PDF Olarak İndir / Yazdır
          </Button>
        </div>
      </div>

      {/* 2. Report Type Selector (Hidden during print) */}
      <div className="print:hidden flex items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl w-fit shadow-sm">
        <button
          onClick={() => setReportType('executive')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            reportType === 'executive'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>C-Level Yönetim Kurulu Raporu</span>
        </button>

        <button
          onClick={() => setReportType('supplier')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            reportType === 'supplier'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Factory className="h-4 w-4" />
          <span>Fabrika / Tedarikçi Kalite Brifi</span>
        </button>
      </div>

      {/* 3. Printable Report Document Canvas */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#07090e] p-6 sm:p-10 shadow-lg text-slate-900 dark:text-slate-100 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white font-mono">ReviewIQ</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                CONFIDENTIAL AUDIT
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-2">
              {reportType === 'executive'
                ? 'Aylık C-Level Büyüme & İade Marjı Denetim Raporu'
                : 'Fabrika & Tedarikçi Teknik İade Tolerans Brifi'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Rapor Kapsamı: Omni-Channel Çok Sektörlü Portföy (Q1-2026) · Hazırlayan: AI Telemetry & Growth Engine
            </p>
          </div>

          <div className="text-right text-xs font-mono text-slate-500 dark:text-slate-400">
            <div>Tarih: 16 Eylül 2026</div>
            <div>Belge No: RIQ-AUDIT-9921</div>
          </div>
        </div>

        {reportType === 'executive' ? (
          /* ================= EXECUTIVE REPORT ================= */
          <div className="space-y-8 text-xs sm:text-sm">
            {/* Executive Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">AYLIK MARJ SIZINTISI</span>
                <p className="text-2xl font-bold font-mono text-rose-500 mt-1">{formatCurrency(104000)}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Ters lojistik & kargo dahil</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">ORTALAMA İADE ORANI</span>
                <p className="text-2xl font-bold font-mono text-amber-500 mt-1">%18.0</p>
                <span className="text-[10px] text-slate-400 mt-1 block">Sektör eşiği: &lt; %12.0</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">HEDEFLENEN KORUNACAK KÂR</span>
                <p className="text-2xl font-bold font-mono text-emerald-500 mt-1">+$54,600 /ay</p>
                <span className="text-[10px] text-slate-400 mt-1 block">A/B testleri sonrasında</span>
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">DENETLENEN YORUM</span>
                <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">1,540 Adet</p>
                <span className="text-[10px] text-slate-400 mt-1 block">4 pazar yeri kanalı</span>
              </div>
            </div>

            {/* Financial Leakage Table */}
            <div>
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-rose-500" />
                <span>SKU Bazlı Ciro Kaybı & İade Kök Neden Dağılımı</span>
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">SKU & Ürün Adı</th>
                      <th className="p-3">Sektör</th>
                      <th className="p-3">İade Oranı</th>
                      <th className="p-3">Aylık Finansal Zarar</th>
                      <th className="p-3">Kritik Kök Neden</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 font-medium">
                    <tr>
                      <td className="p-3 font-bold">Sony WH-1000XM5 Kulaklık</td>
                      <td className="p-3">Consumer Tech</td>
                      <td className="p-3 text-rose-500 font-mono">%14.6</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$38,400</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">Auto NC Seviye Dalgalanması & Kafa Bandı</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Philips HD9880/90 Airfryer Combi XXL</td>
                      <td className="p-3">Home & Kitchen</td>
                      <td className="p-3 text-rose-500 font-mono">%15.8</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$42,200</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">NutriU Wi-Fi Eşleşme Kopması & Ray Sıkışması</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Levi's 511 Slim Fit Denim Jean</td>
                      <td className="p-3">Fashion & Denim</td>
                      <td className="p-3 text-rose-500 font-mono">%21.4</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$31,200</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">Menşei Ülke Kaynaklı Bel Kalıbı Sapması</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Stanley Quencher H2.0 1.18L</td>
                      <td className="p-3">Home & Kitchen</td>
                      <td className="p-3 text-rose-500 font-mono">%11.2</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$28,600</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">FlowState Kapak Yan Yatış Sızıntısı</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">The Ordinary Niacinamide 10% + Zinc 1%</td>
                      <td className="p-3">Beauty & Care</td>
                      <td className="p-3 text-amber-500 font-mono">%9.8</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$16,500</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">Kargoda Damlalık Diş Sıyırması & Pilling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategic Executive Recommendations */}
            <div className="rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 p-5 space-y-3">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Yönetim Kurulu İçin Öncelikli 3 Büyüme Aksiyonu</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                <li><strong>Moda/Denim:</strong> Levi's PDP sayfasına dinamik bel ölçüm widget'ı eklenmesiyle ilk 30 günde iadelerin %36 oranında kesilmesi beklenmektedir.</li>
                <li><strong>Mutfak/Ev Aletleri:</strong> Philips Combi kutu kapağına 2.4GHz Wi-Fi eşleşme animasyonu basılması ve Stanley "Dikey Termos" rozeti kargo firelerini sıfırlayacaktır.</li>
                <li><strong>Donanım & Ses:</strong> Sony Headphones Connect sabit maksimum ANC kilitleme video rehberiyle Auto NC iade oranı tek haneye indirilecektir.</li>
              </ol>
            </div>
          </div>
        ) : (
          /* ================= SUPPLIER / FACTORY BRIEF ================= */
          <div className="space-y-8 text-xs sm:text-sm">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-4 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-400 font-mono">DİKKAT (ÜRETİM & KALİTE GÜVENCE DEPARTMANINA): </span>
              <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Aşağıdaki tolerans revizyonları, Amazon ve Hepsiburada üzerinde son 90 günde teslim edilen partilerdeki müşteri iadeleri ve servis raporlarından türetilmiştir. Sıradaki seri üretim partisinde bu kriterlere uyulması zorunludur.
              </p>
            </div>

            {/* Technical Tolerances */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">1. Bel & Paça Kalıp Toleransı (Levi's 511 Slim Fit Jeans)</h4>
                  <Badge variant="purple">Tekstil / Denim</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Şikayet: Farklı menşei ülkelerinden (Mısır / Pakistan) gelen partilerde 32 bel ölçüsü 3 cm tolerans dışı dar çıkmaktadır (İade oranı: %82).
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Mevcut Bel Varyansı:</strong> 79.5 cm – 84.0 cm (Kabul Edilemez Sapma)</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Zorunlu Kalibrasyon:</strong> 82.5 cm ± 0.5 cm (Tüm tedarikçi fabrikalar için tek yıkama şablonu)</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">2. Wi-Fi Çip Zaman Aşımı & Hazne Rayı (Philips Airfryer Combi XXL)</h4>
                  <Badge variant="warning">Mekanik & Firmware</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Şikayet: 2.4GHz Wi-Fi eşleşme zaman aşımı 30 saniye ile sınırlı olduğundan modem eşleşmesi başarısız olmaktadır.
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Mevcut Firmware Eşleşme Süresi:</strong> 30 Saniye (Zaman Aşımı Hatası)</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Zorunlu Yeni Firmware v3.4:</strong> 90 Saniye Handshake Süresi + Kutu İçi Hızlı Kurulum Kılavuzu</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">3. Damlalık Vidalama Torku & Ambalaj (The Ordinary Niacinamide)</h4>
                  <Badge variant="cyan">Ambalaj & Lojistik</Badge>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Test Standardı:</strong> ISTA 1A Kargo Düşme Testi (1.2m serbest düşüş)</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Aksiyon:</strong> Şişe kapağı vidalama torku 1.8 N·m seviyesine çekilecek ve kargo kolisinde sünger halka kullanılacaktır.</div>
                </div>
              </div>
            </div>
          </div>
        )
}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <span>ReviewIQ Omni-Channel Intelligence Engine</span>
          <span>Resmi Onay Kodu: QA-SIG-2026-X8</span>
        </div>
      </div>
    </div>
  );
}
