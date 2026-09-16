'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  UploadCloud,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  Globe,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

import Link from 'next/link';

export default function ImportPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'product' | 'scraper'>('scraper');
  const [productName, setProductName] = useState('');
  const [channel, setChannel] = useState('Amazon Global');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Product tab fields
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Consumer Electronics');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(1200);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Scraper tab fields
  const [scrapeUrl, setScrapeUrl] = useState('https://www.amazon.com/dp/B0CX219XPRO');
  const [scrapeLimit, setScrapeLimit] = useState(5);
  const [scrapeResult, setScrapeResult] = useState<{
    channel: string;
    productId?: string;
    productName?: string;
    productCategory?: string;
    productPrice?: number;
    productImage?: string;
    isNewProductCreated?: boolean;
    scrapedCount: number;
    associatedProduct: string;
    liveTitle?: string;
    liveDataExtracted: boolean;
    botProtectionDetected: boolean;
    sampleReview?: string;
    mode?: string;
  } | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: productName || 'Sony WH-1000XM5 Gürültü Engelleyici Kulaklık',
          channel,
          comment,
          rating: Number(rating),
        }),
      });

      if (res.ok) {
        setStatus('Yorum başarıyla analiz edildi, yapay zeka ile etiketlendi ve veritabanına işlendi!');
        setComment('');
      }
    } catch (err) {
      console.error(err);
      setStatus('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdSku.trim()) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProdName,
          category: newProdCategory,
          sku: newProdSku,
          price: Number(newProdPrice),
          description: newProdDesc,
        }),
      });

      if (res.ok) {
        setStatus(`'${newProdName}' ürünü başarıyla eklendi ve kataloğa aktarıldı!`);
        setNewProdName('');
        setNewProdSku('');
        setNewProdDesc('');
      }
    } catch (err) {
      console.error(err);
      setStatus('Ürün eklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrapeUrl.trim()) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: scrapeUrl,
          limit: Number(scrapeLimit),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`✓ ${data.channel} üzerinden ${data.scrapedCount} adet müşteri yorumu başarıyla işlendi ve '${data.productName || data.associatedProduct}' ürününe bağlandı!`);
        setScrapeResult({
          channel: data.channel,
          productId: data.productId,
          productName: data.productName,
          productCategory: data.productCategory,
          productPrice: data.productPrice,
          productImage: data.productImage,
          isNewProductCreated: data.isNewProductCreated,
          scrapedCount: data.scrapedCount,
          associatedProduct: data.productName || data.associatedProduct,
          liveTitle: data.liveTitle,
          liveDataExtracted: data.liveDataExtracted,
          botProtectionDetected: data.botProtectionDetected,
          sampleReview: data.sampleReview,
          mode: data.mode,
        });
      } else {
        setStatus(`Hata: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Kazıma sırasında ağ hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <UploadCloud className="h-3.5 w-3.5" />
          <span>Omni-Channel Review Ingestion & Catalog Management</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Çok Kanallı Veri Aktarımı & Ürün Yönetimi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Herhangi bir e-ticaret linkini kazıyarak yorumları çekin, tekil inceleme metinlerini içe aktarın veya platforma yeni bir ürün kategorisi tanımlayın.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] w-fit shadow-sm">
        <button
          onClick={() => { setActiveTab('scraper'); setStatus(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'scraper'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>Canlı URL Yorum Kazıyıcı</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">YENİ</span>
        </button>

        <button
          onClick={() => { setActiveTab('reviews'); setStatus(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UploadCloud className="h-4 w-4" />
          <span>Manuel Yorum Girişi</span>
        </button>

        <button
          onClick={() => { setActiveTab('product'); setStatus(null); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === 'product'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Yeni Ürün / SKU Tanımla</span>
        </button>
      </div>

      {status && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          <span>{status}</span>
        </div>
      )}

      {activeTab === 'scraper' && (
        <Card className="max-w-2xl space-y-4">
          <CardHeader>
            <CardTitle>Canlı Pazar Yeri URL Kazıyıcı & Yorum Çekici</CardTitle>
            <CardDescription>
              Herhangi bir Amazon, Trendyol, Hepsiburada veya Shopify ürün sayfasının linkini yapıştırın. Yapay zeka son yorumları otomatik çeker, ABSA ile analiz edip radara döker.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleScrapeSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">E-Ticaret Ürün URL'si:</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  placeholder="https://www.amazon.com/dp/... veya https://www.trendyol.com/..."
                  className="flex-1 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-[10px] text-slate-500 font-mono py-1">Hızlı Gerçek URL Örnekleri:</span>
                <button
                  type="button"
                  onClick={() => setScrapeUrl('https://www.amazon.com.tr/dp/B09Y2MYL5C')}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  🎧 Sony XM5 (Amazon)
                </button>
                <button
                  type="button"
                  onClick={() => setScrapeUrl('https://www.hepsiburada.com/philips-hd9880-90-airfryer-combi-7000-serisi-xxl-pm-HBC00004NZ66X')}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  🍟 Philips XXL (Hepsiburada)
                </button>
                <button
                  type="button"
                  onClick={() => setScrapeUrl('https://www.amazon.com.tr/dp/B0CX219XPRO')}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  🥤 Stanley Quencher (Amazon)
                </button>
                <button
                  type="button"
                  onClick={() => setScrapeUrl('https://www.hepsiburada.com/the-ordinary-niacinamide-10-zinc-1-30ml-pm-HB00000N7K15')}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  ✨ The Ordinary (Hepsiburada)
                </button>
                <button
                  type="button"
                  onClick={() => setScrapeUrl('https://allbirds.com/products/mens-wool-runners')}
                  className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  👟 Allbirds (Shopify Direct)
                </button>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Desteklenen kanallar: Amazon Global, Trendyol, Hepsiburada, Shopify Storefronts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Çekilecek Yorum Adedi:</label>
                <select
                  value={scrapeLimit}
                  onChange={(e) => setScrapeLimit(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-50 dark:bg-[#0c121e] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                >
                  <option value={5} className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">5 Yorum (Hızlı Test)</option>
                  <option value={10} className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">10 Yorum (Standart Örneklem)</option>
                  <option value={25} className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">25 Yorum (Kapsamlı Analiz)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Algılanan Kanal:</label>
                <div className="rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 px-3.5 py-2.5 text-slate-700 dark:text-slate-300 font-mono font-medium">
                  {scrapeUrl.includes('amazon') ? 'Amazon Global' : scrapeUrl.includes('trendyol') ? 'Trendyol' : scrapeUrl.includes('hepsiburada') ? 'Hepsiburada' : 'Shopify / Web Store'}
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading || !scrapeUrl.trim()} className="w-full justify-center cursor-pointer">
              <Sparkles className="h-4 w-4 mr-1.5" />
              {loading ? 'Yorumlar Çekiliyor & AI ile Etiketleniyor...' : 'Kazımayı Başlat & Yapay Zeka ile Analiz Et'}
            </Button>
          </form>

          {scrapeResult && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan">{scrapeResult.channel}</Badge>
                  <Badge variant={scrapeResult.liveDataExtracted ? 'success' : 'warning'}>
                    {scrapeResult.liveDataExtracted ? '✓ Canlı Veri Çekildi' : 'Akıllı Kategori Eşleme'}
                  </Badge>
                </div>
                {scrapeResult.botProtectionDetected && (
                  <span className="text-[10px] font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                    Pazaryeri Bot Koruması Algılandı
                  </span>
                )}
              </div>

              {scrapeResult.liveTitle && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Canlı URL'den Çekilen Ürün Başlığı:</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{scrapeResult.liveTitle}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-white/[0.06] flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Katalogdaki Model:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">{scrapeResult.associatedProduct}</p>
                    {scrapeResult.productCategory && <Badge variant="cyan">{scrapeResult.productCategory}</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">İşlenen Yorum:</span>
                  <p className="font-bold text-slate-900 dark:text-white font-mono">{scrapeResult.scrapedCount} Doğrulanmış</p>
                </div>
              </div>

              {scrapeResult.sampleReview && (
                <div className="rounded-xl bg-slate-100 dark:bg-white/[0.03] p-3 text-xs border border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Örnek Yapay Zeka İncelemesi:</span>
                  <p className="italic text-slate-700 dark:text-slate-300">"{scrapeResult.sampleReview}"</p>
                </div>
              )}

              {scrapeResult.productId && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-white/[0.06]">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {scrapeResult.isNewProductCreated ? '✓ Canlı Ürün Kataloğa Eklendi & Teşhis Edildi' : '✓ Mevcut Ürün Veritabanına Eklendi'}
                  </span>
                  <Link
                    href={`/products/${scrapeResult.productId}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Ürünü Panelde İncele</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'reviews' && (
        <Card className="max-w-2xl space-y-4">
          <CardHeader>
            <CardTitle>Tekil / Manuel Yorum Girişi</CardTitle>
            <CardDescription>
              İnceleme metnini yapıştırın; yapay zeka sektörüne göre duygu, boyut ve iade riskini otomatik analiz edecektir.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Ürün Adı:</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Sony WH-1000XM5 veya Philips Airfryer..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Satış Kanalı:</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-[#0c121e] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Shopify Direct" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Shopify Store</option>
                  <option value="Amazon Global" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Amazon Global</option>
                  <option value="Trendyol" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Trendyol</option>
                  <option value="Hepsiburada" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Hepsiburada</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Verilen Puan (1 - 5 Yıldız):</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className={`h-9 w-9 rounded-xl border font-mono font-bold transition-all ${
                      rating === val
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-50 dark:bg-white/[0.04] border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {val}★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Müşteri Yorum Metni:</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Örn: Ceketin kalıbı omuzlardan inanılmaz sıktı... VEYA: Cam damlalık kargoda kırılmış..."
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <Button type="submit" disabled={loading || !comment.trim()}>
              <Sparkles className="h-4 w-4 mr-1.5" />
              {loading ? 'Yapay Zeka Analiz Ediyor...' : 'Yorumu Analiz Et & Kaydet'}
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'product' && (
        <Card className="max-w-2xl space-y-4">
          <CardHeader>
            <CardTitle>Yeni Ürün / Model Tanımlama</CardTitle>
            <CardDescription>
              Portföyünüze istediğiniz sektörden yeni bir ürün ekleyin. Yapay zeka bu ürünün iadelerini ve incelemelerini takip etmeye başlar.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Ürün Adı:</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Örn: Silk Satin Slip Dress veya OLED Monitor..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Sektör / Kategori:</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-[#0c121e] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="Consumer Electronics" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Consumer Electronics</option>
                  <option value="Fashion & Apparel" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Fashion & Apparel</option>
                  <option value="Beauty & Skincare" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Beauty & Skincare</option>
                  <option value="Home & Kitchen" className="bg-white dark:bg-[#0c121e] text-slate-900 dark:text-white">Home & Kitchen</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">SKU Kodu:</label>
                <input
                  type="text"
                  value={newProdSku}
                  onChange={(e) => setNewProdSku(e.target.value)}
                  placeholder="Örn: SKU-DRS-0912"
                  className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Birim Fiyat ($):</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(Number(e.target.value))}
                  className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Ürün Açıklaması & Özellikleri:</label>
              <textarea
                rows={3}
                value={newProdDesc}
                onChange={(e) => setNewProdDesc(e.target.value)}
                placeholder="Malzeme, boyutlar veya teknik özellikler..."
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <Button type="submit" disabled={loading || !newProdName.trim() || !newProdSku.trim()}>
              <PlusCircle className="h-4 w-4 mr-1.5" />
              {loading ? 'Ekleniyor...' : 'Ürünü Kataloğa Ekle'}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
