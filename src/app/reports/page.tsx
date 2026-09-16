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
                      <td className="p-3 font-bold">ApexPro 16" Creator Laptop</td>
                      <td className="p-3">Consumer Tech</td>
                      <td className="p-3 text-rose-500 font-mono">%18.2</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$38,400</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">94°C Throttling & 56dB Fan Akustiği</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">BaristaCraft Dual-Boiler Espresso</td>
                      <td className="p-3">Home & Kitchen</td>
                      <td className="p-3 text-rose-500 font-mono">%16.8</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$27,300</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">15-Bar Basınç Altında Conta Sızıntısı</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Merino Wool Tailored Blazer</td>
                      <td className="p-3">Fashion & Apparel</td>
                      <td className="p-3 text-rose-500 font-mono">%21.4</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$21,800</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">Omuz Darlığı & Yanıltıcı Beden Tablosu</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold">Barrier Repair Peptide Serum</td>
                      <td className="p-3">Beauty & Skincare</td>
                      <td className="p-3 text-amber-500 font-mono">%15.6</td>
                      <td className="p-3 font-mono font-bold text-rose-500">$16,500</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">Kargoda Cam Damlalık Kırılması & Akıntı</td>
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
                <li><strong>Moda/Tekstil:</strong> 3D Vücut Tipi Ölçüm Widget'ının ürün sayfasına eklenmesiyle ilk 30 günde iadelerin %42 oranında kesilmesi beklenmektedir.</li>
                <li><strong>Kozmetik:</strong> Kırılgan cam pipet yerine kırılmaz hava temassız pompalı (airless pump) şişeye geçiş kargo fire oranını sıfırlayacaktır.</li>
                <li><strong>Donanım & Elektronik:</strong> Control Center yazılımında 'Akıllı Dinamik Sessiz Mod' güncellemesiyle fan gürültüsü şikayetleri tek haneye indirilecektir.</li>
              </ol>
            </div>
          </div>
        ) : (
          /* ================= SUPPLIER / FACTORY BRIEF ================= */
          <div className="space-y-8 text-xs sm:text-sm">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-4 text-xs">
              <span className="font-bold text-amber-800 dark:text-amber-400 font-mono">DİKKAT (ÜRETİM & KALİTE GÜVENCE DEPARTMANINA): </span>
              <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Aşağıdaki tolerans revizyonları, son 90 günde teslim edilen partilerdeki müşteri iadeleri ve servis raporlarından türetilmiştir. Sıradaki seri üretim partisinde bu kriterlere uyulması zorunludur.
              </p>
            </div>

            {/* Technical Tolerances */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">1. Kalıp & Dikim Toleransı (Merino Wool Blazer)</h4>
                  <Badge variant="purple">Tekstil / Konfeksiyon</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Şikayet: Omuz ve koltuk altı çevresi tolerans dışı dar kesilmektedir (Müşteri şikayet oranı: %96).
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Mevcut Kalıp Omuz:</strong> 44.0 cm ± 0.5 cm (İade Sebebi)</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Zorunlu Yeni Kalıp:</strong> 46.2 cm ± 0.3 cm (Armhole derinliği +1.8 cm genişletilecek)</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">2. Portafiltre Conta Malzeme Spesifikasyonu (Espresso Machine)</h4>
                  <Badge variant="warning">Mekanik / Kauçuk</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Şikayet: 15 bar basınç testinde fabrika çıkışlı siyah NBR contalar 60 gün içinde sertleşip kenardan su sızdırmaktadır.
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Mevcut Malzeme:</strong> Standart NBR Nitril Kauçuk 60 Shore A</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Zorunlu Yeni Malzeme:</strong> FDA Onaylı Gıda Uyumlu Sıvı Silikon (LSR) 70 Shore A (200°C Dayanımlı)</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">3. Ambalaj Düşme & Şok Testi Standardı (Peptide Serum)</h4>
                  <Badge variant="cyan">Ambalaj / Lojistik</Badge>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-black/40 p-3 font-mono text-xs space-y-1">
                  <div><strong>Test Standardı:</strong> ISTA 1A Kargo Düşme Testi (1.2m serbest düşüş)</div>
                  <div className="text-emerald-600 dark:text-emerald-400"><strong>Aksiyon:</strong> Cam damlalık boyun kısmına 4mm EPE darbe emici köpük halka zorunludur.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
          <span>ReviewIQ Omni-Channel Intelligence Engine</span>
          <span>Resmi Onay Kodu: QA-SIG-2026-X8</span>
        </div>
      </div>
    </div>
  );
}
