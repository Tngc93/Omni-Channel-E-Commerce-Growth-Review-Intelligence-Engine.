'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RecoveryAgent, ComplaintAnalysis } from '@/lib/ai/recovery-agent';
import {
  ShieldAlert,
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  MessageSquareReply,
  AlertCircle,
  HelpCircle,
  Laptop,
  Shirt,
  Coffee
} from 'lucide-react';

const SAMPLE_COMPLAINTS = [
  {
    title: 'Moda / Ceket Kalıp Şikayeti',
    product: 'Merino Wool Minimalist Tailored Blazer',
    comment: 'Beden tablosuna bakarak Medium aldım ama omuzlar ve koltuk altı aşırı dar, kollarımı kaldıramadım. İade ediyorum.',
    rating: 1,
  },
  {
    title: 'Kozmetik / Kargo Cam Kırığı',
    product: 'Botanical Barrier Repair Peptide Serum',
    comment: 'Kargo geldiğinde kutu ezilmişti, cam damlalık kırılmış ve serum zarfın içine akmıştı. Rezalet.',
    rating: 1,
  },
  {
    title: 'Teknoloji / Laptop Fan Gürültüsü',
    product: 'ApexPro 16" Creator Laptop',
    comment: 'Blender\'da 4K render alırken fanlar 56 dB ile yan odadan duyuluyor ve klavye yanıyor, 94 derece. İade edeceğim.',
    rating: 2,
  },
  {
    title: 'Ev Aleti / Espresso Conta Sızıntısı',
    product: 'BaristaCraft Precision Dual-Boiler Espresso',
    comment: 'Portafiltre contası 15 bar basınç altında kenardan sıcak kahve fışkırtıyor. Mutfak battı.',
    rating: 1,
  },
];

export default function RecoveryPage() {
  const [productName, setProductName] = useState(SAMPLE_COMPLAINTS[0].product);
  const [comment, setComment] = useState(SAMPLE_COMPLAINTS[0].comment);
  const [rating, setRating] = useState(SAMPLE_COMPLAINTS[0].rating);
  const [analysis, setAnalysis] = useState<ComplaintAnalysis>(
    RecoveryAgent.generateResolutions(SAMPLE_COMPLAINTS[0].product, SAMPLE_COMPLAINTS[0].comment, 1)
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!comment.trim()) return;
    const res = RecoveryAgent.generateResolutions(productName, comment, rating);
    setAnalysis(res);
  };

  const handleSelectPreset = (p: typeof SAMPLE_COMPLAINTS[0]) => {
    setProductName(p.product);
    setComment(p.comment);
    setRating(p.rating);
    const res = RecoveryAgent.generateResolutions(p.product, p.comment, p.rating);
    setAnalysis(res);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <MessageSquareReply className="h-3.5 w-3.5" />
          <span>AI Customer Retention & Negative Review Recovery</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Akıllı Yorum Yanıtı & İade Kurtarma Ajanı
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Amazon, Trendyol ve Shopify'daki 1-2 yıldızlı olumsuz yorumları anında analiz edin. Kusura özel telafi stratejileriyle kargo iadesini önleyin ve memnuniyetsiz müşterileri marka elçisine dönüştürün.
        </p>
      </div>

      {/* 2. Preset Quick Selector */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-400 self-center font-medium mr-1">Örnek Senaryolar:</span>
        {SAMPLE_COMPLAINTS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(s)}
            className="px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-sm"
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* 3. Input Form & Live Remediation Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Complaint */}
        <Card className="col-span-1 space-y-4">
          <CardHeader>
            <CardTitle>Müşteri Şikayet Metni</CardTitle>
            <CardDescription>
              İnceleme metnini girin; yapay zeka iade sebebini teşhis edip telafi planını hazırlasın.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleAnalyze} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Ürün Adı:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Müşterinin Verdiği Puan:</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className={`h-8 w-8 rounded-xl border font-mono font-bold transition-all ${
                      rating === val
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-white/[0.04] border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {val}★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Olumsuz Yorum Metni:</label>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Müşterinin yazdığı şikayet..."
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <Button type="submit" className="w-full justify-center">
              <Sparkles className="h-4 w-4 mr-1.5" />
              İade Kurtarma Yanıtı Üret
            </Button>
          </form>
        </Card>

        {/* Right: AI Recovery Solutions */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          {/* Diagnostic Banner */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-mono">
                  Teşhis Edilen İade Riski: {analysis.detectedDefectAspect}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Yapay zeka bu şikayetin geri dönüş kargo masrafı ve müşteri kaybı yaratma olasılığını yüksek olarak değerlendirdi.
              </p>
            </div>
            <Badge variant="danger">{analysis.urgencyLevel} ÖNCELİK</Badge>
          </div>

          {/* Generated Strategies */}
          <div className="space-y-4">
            {analysis.remedies.map((remedy, idx) => (
              <Card key={idx} className="space-y-3 border-l-4 border-l-emerald-500 bg-white/80 dark:bg-white/[0.02]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{remedy.strategyTitle}</span>
                    <Badge variant="success">%{remedy.estimatedSaveRate} Kurtarma Oranı</Badge>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{remedy.tone}</span>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] p-3 text-xs">
                  <span className="text-slate-400 font-mono">Teklif Edilen Telafi Formülü: </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{remedy.compensationOffer}</span>
                </div>

                <div className="relative rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.08] p-4 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  <p className="pr-12 italic">"{remedy.responseMessage}"</p>
                  <button
                    onClick={() => handleCopy(remedy.responseMessage, idx)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all cursor-pointer shadow-sm"
                    title="Yanıtı Kopyala"
                  >
                    {copiedIdx === idx ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>💡 Amazon / Trendyol / Shopify satıcı panelinde doğrudan yanıt olarak kullanılabilir.</span>
                  {copiedIdx === idx && (
                    <span className="text-emerald-500 font-semibold font-mono">Panoya kopyalandı!</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
