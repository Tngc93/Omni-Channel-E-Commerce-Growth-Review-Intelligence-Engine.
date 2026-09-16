'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, RefreshCw, Cpu, Sparkles } from 'lucide-react';

export default function IngestPage() {
  const [productName, setProductName] = useState('Monster Tulpar T7 V20.5 17.3" Gaming Laptop');
  const [channel, setChannel] = useState('Trendyol');
  const [rating, setRating] = useState('1');
  const [comment, setComment] = useState('Oyun oynarken fanlar aşırı sesli çalışıyor ve 96 dereceye kadar ısınıyor.');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          channel,
          rating: Number(rating),
          comment,
        }),
      });

      if (res.ok) {
        setStatus('Yorum başarıyla yerel veritabanına kaydedildi ve donanım AI modeliyle etiketlendi!');
        setComment('');
      } else {
        setStatus('Kayıt başarısız oldu.');
      }
    } catch (err) {
      setStatus('Ağ hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Cpu className="h-3.5 w-3.5" />
          <span>Canlı Yorum İçe Aktarma & Teşhis</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Çok Kanallı Donanım İnceleme Girişi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          Monster Web, Trendyol, Hepsiburada veya Amazon'dan dilediğiniz canlı müşteri yorumunu yapıştırıp yerel SQLite veritabanına aktarın ve AI ile anlık analiz edin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Canlı Yorum Ekle & Test Et</CardTitle>
            <CardDescription>Donanım boyut sınıflandırmasını (Termal, Panel, Kasa, BIOS) gerçek zamanlı tetikleyin</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Donanım Modeli</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
              >
                <option>Monster Tulpar T7 V20.5 17.3" Gaming Laptop</option>
                <option>Monster Aryond A32 V1.3 31.5" 165Hz Curved Oyuncu Monitörü</option>
                <option>Monster Semruk S8 Extreme Sıvı Soğutmalı Gaming Desktop</option>
                <option>Monster Pusat Pro RGB Kablosuz Mekanik Oyuncu Klavyesi</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Satış Kanalı</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                >
                  <option>Monster Web</option>
                  <option>Trendyol</option>
                  <option>Hepsiburada</option>
                  <option>Amazon TR</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Müşteri Puanı</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                >
                  <option value="1">1 Yıldız (Kritik İade Riski)</option>
                  <option value="2">2 Yıldız</option>
                  <option value="3">3 Yıldız</option>
                  <option value="4">4 Yıldız</option>
                  <option value="5">5 Yıldız (Memnuniyet)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Müşteri Yorum Metni</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                placeholder="Örn: Monitörde karanlık sahnelerde sol alt köşede ışık sızması var, gözümü alıyor..."
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Veritabanına Ekle & AI ile Analiz Et'}
            </Button>

            {status && (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-300 border border-emerald-500/25 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{status}</span>
              </div>
            )}
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Motoru & Hibrit Veri Mimarisi</CardTitle>
            <CardDescription>Sıfır konfigürasyonla çalışan yerel ve bulut yapay zeka seçenekleri</CardDescription>
          </CardHeader>

          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="rounded-xl bg-white/[0.02] p-4 space-y-1.5 border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">1. Yerel SQLite Veritabanı & Heuristic AI</span>
                <Badge variant="success">Aktif & Hazır</Badge>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Herhangi bir API key veya harici servis gerektirmeden bilgisayarınızda yerel çalışır. Termal, panel, menteşe ve BIOS kusurlarını anında ayrıştırır.
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.02] p-4 space-y-1.5 border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">2. Google Gemini 2.5 Flash</span>
                <Badge variant="outline">Opsiyonel (.env)</Badge>
              </div>
              <p className="text-slate-400 leading-relaxed">
                <code className="text-emerald-400">GEMINI_API_KEY</code> tanımlandığında karmaşık donanım arızalarını çok modlu ve yapısal JSON olarak analiz eder.
              </p>
            </div>

            <div className="rounded-xl bg-white/[0.02] p-4 space-y-1.5 border border-white/[0.08]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">3. OpenAI GPT-4o</span>
                <Badge variant="outline">Opsiyonel (.env)</Badge>
              </div>
              <p className="text-slate-400 leading-relaxed">
                <code className="text-emerald-400">OPENAI_API_KEY</code> ile kurumsal seviyede A/B test hipotezleri ve Gherkin spesifikasyonları üretir.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
