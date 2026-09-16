'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, RefreshCw, PlusCircle, MessageSquare, Layers } from 'lucide-react';

export default function IngestAndManagePage() {
  const [activeTab, setActiveTab] = useState<'review' | 'product'>('review');

  // Review state
  const [productName, setProductName] = useState('ApexPro 16" Creator & Gaming Laptop');
  const [channel, setChannel] = useState('Shopify Store');
  const [rating, setRating] = useState('1');
  const [comment, setComment] = useState('Omuz dikişleri aşırı dar ve kalıp tamamen yanıltıcı!');
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  // Product state
  const [newProductName, setNewProductName] = useState('');
  const [newCategory, setNewCategory] = useState('Consumer Electronics');
  const [newPrice, setNewPrice] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newSku, setNewSku] = useState('');
  const [productStatus, setProductStatus] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewStatus(null);

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
        setReviewStatus('Yorum başarıyla yerel SQLite veritabanına kaydedildi ve kategoriye duyarlı AI ile etiketlendi!');
        setComment('');
      } else {
        setReviewStatus('Kayıt başarısız oldu.');
      }
    } catch (err) {
      setReviewStatus('Ağ hatası oluştu.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    setProductLoading(true);
    setProductStatus(null);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProductName,
          category: newCategory,
          price: newPrice,
          cost: newCost,
          sku: newSku,
        }),
      });

      if (res.ok) {
        setProductStatus(`"${newProductName}" ürünü başarıyla kataloğa eklendi! Artık bu ürüne yorum bağlayabilirsiniz.`);
        setNewProductName('');
        setNewPrice('');
        setNewCost('');
        setNewSku('');
      } else {
        setProductStatus('Ürün eklenirken hata oluştu.');
      }
    } catch (err) {
      setProductStatus('Ağ hatası oluştu.');
    } finally {
      setProductLoading(false);
    }
  };

  return (
    <div className="space-y-8 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Layers className="h-3.5 w-3.5" />
          <span>Omni-Channel Review & Catalog Pipeline</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Veri Girişi & Özel Ürün Yönetimi
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
          İster kendi e-ticaret mağazanızdan yeni bir ürün ekleyin, ister Amazon, Trendyol, Hepsiburada veya Shopify'dan canlı yorumları yapıştırarak anlık AI analizi yapın.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab('review')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'review'
              ? 'bg-white text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Canlı Yorum Ekle & Analiz Et
        </button>

        <button
          onClick={() => setActiveTab('product')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'product'
              ? 'bg-white text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <PlusCircle className="h-4 w-4" /> Kataloğa Yeni Ürün Ekle
        </button>
      </div>

      {activeTab === 'review' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Canlı Müşteri Yorumu İçe Aktarımı</CardTitle>
              <CardDescription>Yorum metnini girin; AI otomatik olarak boyutu (Beden, Termal, Ambalaj, Sızdırmazlık) tespit edecektir.</CardDescription>
            </CardHeader>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">İlişkili Ürün</label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                >
                  <option>ApexPro 16" Creator & Gaming Laptop</option>
                  <option>Merino Wool Minimalist Tailored Blazer</option>
                  <option>Botanical Barrier Repair Peptide Night Serum</option>
                  <option>BaristaCraft Precision Dual-Boiler Espresso Machine</option>
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
                    <option>Shopify Store</option>
                    <option>Amazon Global / TR</option>
                    <option>Trendyol</option>
                    <option>Hepsiburada</option>
                    <option>Özel Web Sitesi</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Puan (Yıldız)</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                  >
                    <option value="1">1 Yıldız (Kritik İade Riski)</option>
                    <option value="2">2 Yıldız</option>
                    <option value="3">3 Yıldız</option>
                    <option value="4">4 Yıldız</option>
                    <option value="5">5 Yıldız (Yüksek Memnuniyet)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Müşteri Yorumu Metni</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white placeholder-slate-500 focus:border-white/30 focus:outline-none"
                  placeholder="Yorumu buraya yapıştırın..."
                />
              </div>

              <Button type="submit" disabled={reviewLoading} className="w-full">
                {reviewLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Veritabanına Ekle & AI Boyutunu Çıkar'}
              </Button>

              {reviewStatus && (
                <div className="rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-300 border border-emerald-500/25 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>{reviewStatus}</span>
                </div>
              )}
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kategoriye Duyarlı AI Teşhis Kuralları</CardTitle>
              <CardDescription>Farklı sektörlerde hangi boyutlar ayrıştırılır?</CardDescription>
            </CardHeader>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="font-semibold text-cyan-400 font-mono">1. Tüketici Elektroniği:</span>
                <p className="text-slate-400 mt-1">İşlemci/GPU sıcaklığı, fan akustiği (dB), OLED/IPS ışık sızması, yazılım/BIOS çökmeleri.</p>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="font-semibold text-purple-400 font-mono">2. Moda & Tekstil:</span>
                <p className="text-slate-400 mt-1">Omuz ve göğüs darlığı, beden tablosu uyuşmazlığı, kumaş çekmesi, dikiş mukavemeti.</p>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="font-semibold text-emerald-400 font-mono">3. Kozmetik & Kişisel Bakım:</span>
                <p className="text-slate-400 mt-1">Cam damlalık kırılması, kargo sızıntısı, formül alerji/tahriş reaksiyonu, oksitlenme.</p>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="font-semibold text-amber-400 font-mono">4. Ev & Mutfak Aletleri:</span>
                <p className="text-slate-400 mt-1">Basınç contası sızdırmazlığı, kullanım kılavuzu anlaşılırlığı, motor gürültüsü, dayanıklılık.</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Kataloğa Yeni Özel Ürün Tanımlama</CardTitle>
            <CardDescription>İncelemek istediğiniz herhangi bir sektöre ait ürünü ekleyin.</CardDescription>
          </CardHeader>

          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Ürün Adı ve Modeli</label>
              <input
                type="text"
                required
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Örn: Ergonomik Titreşimli Ofis Koltuğu"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Sektör / Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                >
                  <option>Consumer Electronics</option>
                  <option>Fashion & Apparel</option>
                  <option>Beauty & Skincare</option>
                  <option>Home & Kitchen</option>
                  <option>Fitness & Sports</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Stok Kodu (SKU)</label>
                <input
                  type="text"
                  value={newSku}
                  onChange={(e) => setNewSku(e.target.value)}
                  placeholder="Örn: OFS-CHR-ERG-01"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Perakende Fiyat ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="249.00"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Ürün Maliyeti ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  placeholder="95.00"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>

            <Button type="submit" disabled={productLoading} className="w-full">
              {productLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Ürünü Kaydet & Kataloğa Ekle'}
            </Button>

            {productStatus && (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-300 border border-emerald-500/25 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{productStatus}</span>
              </div>
            )}
          </form>
        </Card>
      )}
    </div>
  );
}
