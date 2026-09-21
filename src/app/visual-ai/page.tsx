'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useStoreRole } from '@/lib/context/StoreRoleContext';
import {
  Camera,
  ScanLine,
  Target,
  ShieldAlert,
  AlertTriangle,
  Truck,
  Factory,
  PackageCheck,
  CheckCircle2,
  Sparkles,
  Upload,
  RefreshCw,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  FileCheck2,
  Info,
  Sliders,
} from 'lucide-react';

interface VisionAnalysis {
  damageCategory: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  affectedPart: string;
  confidenceScore: number;
  liability: 'LOGISTICS_CARRIER' | 'SUPPLIER_FACTORY' | 'PACKAGING_DESIGN' | 'CUSTOMER_MISUSE';
  liabilityLabel: string;
  rootCause: string;
  actionRequired: string;
  focusCoordinates: { x: number; y: number };
  detectedTags: string[];
  summary: string;
}

interface VisualEvidenceRecord {
  id: string;
  productId: string;
  imageUrl: string;
  thumbnailUrl?: string | null;
  damageCategory: string;
  severity: string;
  affectedPart: string;
  confidenceScore: number;
  liability: string;
  rootCause: string;
  actionRequired: string;
  focusX: number;
  focusY: number;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    sku: string;
    category: string;
    imageUrl?: string;
  };
}

interface AnatomyHotspot {
  partName: string;
  defectCount: number;
  criticalSharePct: number;
  primaryDefect: string;
  x: number;
  y: number;
}

interface ProductDefectAnatomy {
  productId: string;
  productName: string;
  totalPhotoEvidences: number;
  hotspots: AnatomyHotspot[];
  supplierLiabilityPct: number;
  carrierLiabilityPct: number;
  packagingLiabilityPct: number;
}

const SAMPLE_PRESETS = [
  {
    name: 'Sony WH-1000XM5: Kafa Bandı Baskı & Deformasyon',
    productName: 'Sony WH-1000XM5 Kablosuz Gürültü Engelleyici Kulaklık',
    comment: 'Kafa bandının tepe süngeri aşırı sert ve 2 saat sonra başımın tepesinde şiddetli ağrı yapıyor. Deri birleşim dikişlerinde gerilme var.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    category: 'Consumer Electronics',
  },
  {
    name: 'Philips Airfryer XXL: PTFE Teflon Taban Soyulması',
    productName: 'Philips HD9880/90 Airfryer Combi 7000 Serisi XXL',
    comment: 'Daha üçüncü kullanımda ve sadece süngerle yıkamama rağmen iç ızgara sepetinin teflon kaplaması pul pul dökülmeye başladı. Yemeğe karışıyor!',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
    category: 'Kitchen Appliances',
  },
  {
    name: 'Stanley Quencher 1.18L: Döner Kapak Sızdırma Kusuru',
    productName: 'Stanley The Quencher H2.0 FlowState Paslanmaz Çelik Vakumlu Termos 1.18L',
    comment: 'Çantamın yan cebinde hafif eğik durduğunda kapak silikon contasının kenarından sürekli su sızdırıyor. Çantam ve bilgisayarım ıslandı.',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    category: 'Outdoor & Drinkware',
  },
  {
    name: 'The Ordinary Serum: Cam Pipet Taşıma Kırılması',
    productName: 'The Ordinary Niacinamide 10% + Zinc 1% Leke ve Gözenek Karşıtı Serum 30ml',
    comment: 'Sipariş balonlu naylona sarılmadan doğrudan ince zarfla kargoya verilmiş. Paketi açtığımda damlalık camı tuzla buz olmuştu, serum kutunun içine akmış.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597359-009df13429fa?w=800&auto=format&fit=crop&q=80',
    category: 'Personal Care & Beauty',
  },
  {
    name: "Levi's 511 Slim Jeans: Bel ve Basen Kalıp Sapması",
    productName: "Levi's 511 Slim Fit Esnek Denim Erkek Jean Pantolon",
    comment: 'Yıllardır W32 giyiyorum ama bu seferki etiket 32 olmasına rağmen bel en az 4 cm dar. Düğmesi kapanmıyor, kalıp ölçüsü bariz hatalı.',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
    category: 'Apparel & Fashion',
  },
];

export default function VisualAiPage() {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const { currentStore } = useStoreRole();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'scanner' | 'anatomy' | 'gallery'>('scanner');

  // Scanner State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_PRESETS[0].imageUrl);
  const [productName, setProductName] = useState<string>(SAMPLE_PRESETS[0].productName);
  const [reviewComment, setReviewComment] = useState<string>(SAMPLE_PRESETS[0].comment);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<VisionAnalysis | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Anatomy State
  const [anatomyProductList, setAnatomyProductList] = useState<any[]>([]);
  const [selectedAnatomyProdId, setSelectedAnatomyProdId] = useState<string>('');
  const [anatomyData, setAnatomyData] = useState<ProductDefectAnatomy | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot | null>(null);

  // Gallery State
  const [evidences, setEvidences] = useState<VisualEvidenceRecord[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(false);
  const [liabilityFilter, setLiabilityFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [galleryStats, setGalleryStats] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial data
  useEffect(() => {
    fetchGalleryAndProducts();
  }, []);

  const fetchGalleryAndProducts = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch('/api/vision/analyze');
      if (res.ok) {
        const data = await res.json();
        setEvidences(data.evidences || []);
        setAnatomyProductList(data.products || []);
        setGalleryStats(data.stats || null);

        if (data.products && data.products.length > 0 && !selectedAnatomyProdId) {
          setSelectedAnatomyProdId(data.products[0].id);
          fetchProductAnatomy(data.products[0].id);
          setSelectedProductId(data.products[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchProductAnatomy = async (prodId: string) => {
    try {
      const res = await fetch(`/api/vision/analyze?productId=${prodId}`);
      if (res.ok) {
        const data = await res.json();
        setAnatomyData(data.anatomy || null);
        if (data.anatomy && data.anatomy.hotspots && data.anatomy.hotspots.length > 0) {
          setSelectedHotspot(data.anatomy.hotspots[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load product anatomy:', err);
    }
  };

  const handleSelectPreset = (index: number) => {
    const p = SAMPLE_PRESETS[index];
    setSelectedPresetIndex(index);
    setImageUrl(p.imageUrl);
    setProductName(p.productName);
    setReviewComment(p.comment);
    setAnalysisResult(null);
    setSaveStatus(null);

    // match with product ID if available
    const matched = anatomyProductList.find(
      (prod) => prod.name.toLowerCase().includes(p.productName.slice(0, 8).toLowerCase())
    );
    if (matched) {
      setSelectedProductId(matched.id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(isTr ? 'Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WebP).' : 'Please choose a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        setAnalysisResult(null);
        setSaveStatus(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRunAnalysis = async () => {
    if (!imageUrl) return;
    setIsScanning(true);
    setAnalysisResult(null);
    setSaveStatus(null);

    try {
      const res = await fetch('/api/vision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          productName,
          productId: selectedProductId || undefined,
          reviewComment,
          saveEvidence: false,
        }),
      });

      const data = await res.json();
      if (res.ok && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        alert(data.error || (isTr ? 'Görsel analiz başarısız oldu.' : 'Image analysis failed.'));
      }
    } catch (err) {
      console.error('Analysis error:', err);
      alert(isTr ? 'Bağlantı hatası oluştu.' : 'Connection error occurred.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToCatalog = async () => {
    if (!analysisResult) return;
    setSaveStatus('saving');

    try {
      const targetProdId = selectedProductId || (anatomyProductList[0]?.id ?? '');
      const res = await fetch('/api/vision/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          productId: targetProdId,
          productName,
          reviewComment,
          saveEvidence: true,
        }),
      });

      if (res.ok) {
        setSaveStatus('saved');
        fetchGalleryAndProducts();
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  const handleClaimAction = async (evidenceId: string, action: string, note?: string) => {
    try {
      const res = await fetch('/api/vision/analyze', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evidenceId,
          action,
          note,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setActionSuccessMsg(
          isTr
            ? `✓ Aksiyon başarıyla kaydedildi: ${data.message}`
            : `✓ Action registered successfully: ${data.message}`
        );
        setTimeout(() => setActionSuccessMsg(null), 5000);
        fetchGalleryAndProducts();
      } else {
        alert(data.error || 'Aksiyon işlenemedi.');
      }
    } catch (err) {
      console.error('Claim action error:', err);
    }
  };

  const filteredEvidences = evidences.filter((ev) => {
    if (liabilityFilter !== 'ALL' && ev.liability !== liabilityFilter) return false;
    if (severityFilter !== 'ALL' && ev.severity !== severityFilter) return false;
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <Badge variant="danger">{isTr ? 'KRİTİK HASAR' : 'CRITICAL DEFECT'}</Badge>;
      case 'HIGH':
        return <Badge variant="warning">{isTr ? 'YÜKSEK ŞİDDET' : 'HIGH SEVERITY'}</Badge>;
      case 'MEDIUM':
        return <Badge variant="purple">{isTr ? 'ORTA DERECELİ' : 'MEDIUM SEVERITY'}</Badge>;
      default:
        return <Badge variant="cyan">{isTr ? 'DÜŞÜK KUSUR' : 'LOW SEVERITY'}</Badge>;
    }
  };

  const getLiabilityBadge = (liability: string) => {
    switch (liability) {
      case 'LOGISTICS_CARRIER':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <Truck className="w-3.5 h-3.5" />
            {isTr ? 'Kargo / Taşıyıcı Kusuru' : 'Logistics Carrier Fault'}
          </span>
        );
      case 'SUPPLIER_FACTORY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Factory className="w-3.5 h-3.5" />
            {isTr ? 'Fason Üretici / Fabrika Hatası' : 'Supplier / Factory Defect'}
          </span>
        );
      case 'PACKAGING_DESIGN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <PackageCheck className="w-3.5 h-3.5" />
            {isTr ? 'Ambalaj & Sızdırmazlık Kusuru' : 'Packaging & Seal Design'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <Info className="w-3.5 h-3.5" />
            {isTr ? 'Müşteri Kullanım Hatası' : 'Customer Misuse'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/[0.06] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                {isTr ? 'Görsel Kusur & Multimodal Vision AI' : 'Visual Defect & Multimodal Vision AI'}
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Gemini 1.5 Flash Vision
                </span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {isTr
                  ? 'Müşteri inceleme fotoğraflarında fiziksel hasar tespiti, bileşen anatomi ısı haritası ve tedarikçi chargeback motoru.'
                  : 'Automated physical damage inspection from customer photos, component defect heatmaps, and supplier claim engine.'}
              </p>
            </div>
          </div>
        </div>

        {/* Global Stats Badges */}
        {galleryStats && (
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <div className="px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] text-center shadow-sm">
              <div className="text-[10px] font-mono text-slate-400 uppercase">{isTr ? 'İncelenen Kanıt' : 'Total Evidences'}</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">{galleryStats.totalEvidences}</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
              <div className="text-[10px] font-mono text-rose-500 uppercase">{isTr ? 'Kargo Tazminat' : 'Carrier Claims'}</div>
              <div className="text-lg font-bold text-rose-600 dark:text-rose-400">{galleryStats.carrierLiabilityPct}%</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-[10px] font-mono text-amber-500 uppercase">{isTr ? 'Fabrika Chargeback' : 'Factory Chargeback'}</div>
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{galleryStats.supplierLiabilityPct}%</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
              <div className="text-[10px] font-mono text-indigo-500 uppercase">{isTr ? 'Ambalaj Rev.' : 'Packaging Rev.'}</div>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{galleryStats.packagingLiabilityPct}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/[0.06] pb-3">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'scanner'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ScanLine className="w-4 h-4" />
          {isTr ? 'Canlı Görsel Tarayıcı & AI İnceleme' : 'Live Vision Scanner & AI Inspection'}
        </button>

        <button
          onClick={() => setActiveTab('anatomy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'anatomy'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          {isTr ? 'Bileşen Hasar Anatomi Isı Haritası' : 'Component Defect Heatmap'}
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'gallery'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          {isTr ? 'Kusur Kanıt Galerisi & Tazminat Masası' : 'Defect Evidence Catalog & Claims'}
          <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {evidences.length}
          </span>
        </button>
      </div>

      {actionSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {actionSuccessMsg}
        </div>
      )}

      {/* TAB 1: LIVE SCANNER */}
      {activeTab === 'scanner' && (
        <div className="space-y-6">
          {/* Preset Selector */}
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
              {isTr ? '⚡ Gerçek Amazon & Hepsiburada Müşteri İnceleme Fotoğraflarından Seçin:' : '⚡ Select Real Customer Review Photo Samples:'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {SAMPLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedPresetIndex === idx
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 shadow-sm'
                      : 'border-slate-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold line-clamp-1">{p.name.split(':')[0]}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {p.name.split(':')[1] || p.productName}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Input & Preview Column */}
            <div className="lg:col-span-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    <span>{isTr ? 'İncelenecek Görsel & Müşteri Şikayeti' : 'Review Image & Customer Note'}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {isTr ? 'Kendi Fotoğrafını Yükle' : 'Upload Image'}
                    </Button>
                  </CardTitle>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </CardHeader>

                <div className="p-4 pt-0 space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {isTr ? 'Görsel URL veya Base64 Verisi' : 'Image URL or Base64 Data'}
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setAnalysisResult(null);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {isTr ? 'Hedef Ürün Adı' : 'Target Product'}
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {isTr ? 'Müşteri Yorumu & Kusur Beyanı' : 'Customer Review Statement'}
                    </label>
                    <textarea
                      rows={2}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={isTr ? 'Müşterinin belirttiği hasar...' : 'Customer statement...'}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <Button
                    onClick={handleRunAnalysis}
                    disabled={isScanning || !imageUrl}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-xs py-2.5 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        {isTr ? 'Multimodal Vision AI Taranıyor...' : 'Scanning Vision AI...'}
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        {isTr ? 'Multimodal Görsel Kusur Taramasını Başlat' : 'Execute Multimodal Defect Scan'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Live Image Frame with Dynamic Reticle Pin */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-black/90 aspect-video flex items-center justify-center group shadow-xl">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Review Inspection"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isScanning ? 'opacity-40 blur-[1px]' : 'opacity-90'
                      }`}
                    />

                    {/* Scanning Laser Line Animation */}
                    {isScanning && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse transition-all duration-75 relative top-1/2" />
                        <div className="absolute inset-0 bg-indigo-500/10 backdrop-brightness-110" />
                        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-cyan-400 font-mono text-xs flex items-center gap-2">
                          <ScanLine className="w-4 h-4 animate-spin" />
                          <span>OPTİK KUSUR TESPİT ALGORİTMASI DEVREDE...</span>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Reticle Target when analysis is complete */}
                    {analysisResult && !isScanning && (
                      <div
                        className="absolute pointer-events-none transition-all duration-700 ease-out"
                        style={{
                          left: `${analysisResult.focusCoordinates.x}%`,
                          top: `${analysisResult.focusCoordinates.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* Radar Pulse Rings */}
                        <div className="absolute -inset-4 rounded-full border-2 border-rose-500 animate-ping opacity-60" />
                        <div className="absolute -inset-2 rounded-full border border-amber-400 animate-pulse" />

                        {/* Center Pin */}
                        <div className="relative w-8 h-8 rounded-full bg-rose-600/90 border-2 border-white shadow-[0_0_20px_#f43f5e] flex items-center justify-center text-white">
                          <Target className="w-4 h-4" />
                        </div>

                        {/* Tooltip Tag */}
                        <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-black/90 text-white border border-rose-500/40 text-[10px] font-mono shadow-2xl flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                          {analysisResult.affectedPart} ({Math.round(analysisResult.confidenceScore * 100)}%)
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-slate-500 text-xs font-mono">Görsel seçilmedi</div>
                )}
              </div>
            </div>

            {/* Right Inspection Analysis Column */}
            <div className="lg:col-span-6 space-y-4">
              {analysisResult ? (
                <Card className="border-indigo-500/30 bg-gradient-to-br from-white via-indigo-50/20 to-white dark:from-slate-900/90 dark:via-indigo-950/20 dark:to-slate-900/90 shadow-xl">
                  <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-base">{analysisResult.damageCategory}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(analysisResult.severity)}
                      </div>
                    </div>
                    <CardDescription className="text-xs">
                      {isTr ? 'Görsel Güven Skoru' : 'Vision Confidence'}:{' '}
                      <strong className="text-slate-800 dark:text-slate-200">
                        {Math.round(analysisResult.confidenceScore * 100)}%
                      </strong>{' '}
                      | {isTr ? 'Etkilenen Bileşen' : 'Affected Part'}:{' '}
                      <strong className="text-indigo-600 dark:text-indigo-400">{analysisResult.affectedPart}</strong>
                    </CardDescription>
                  </CardHeader>

                  <div className="p-5 space-y-4 text-xs">
                    {/* Liability Attribution Box */}
                    <div className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-slate-400">
                          {isTr ? 'KUSUR SORUMLULUĞU & TAZMİNAT MUHATABI' : 'LIABILITY ATTRIBUTION'}
                        </span>
                        {getLiabilityBadge(analysisResult.liability)}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {analysisResult.liabilityLabel}
                      </p>
                    </div>

                    {/* Root Cause Diagnosis */}
                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] uppercase text-slate-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        {isTr ? 'MÜHENDİSLİK KÖK NEDEN TEŞHİSİ' : 'ROOT CAUSE DIAGNOSIS'}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.04] leading-relaxed">
                        {analysisResult.rootCause}
                      </p>
                    </div>

                    {/* Action Required */}
                    <div className="space-y-1.5">
                      <div className="font-mono text-[10px] uppercase text-slate-400 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
                        {isTr ? 'GEREKLİ OPERASYONEL AKSİYON & TALEP' : 'ACTION REQUIRED'}
                      </div>
                      <p className="text-indigo-950 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40 font-semibold leading-relaxed">
                        {analysisResult.actionRequired}
                      </p>
                    </div>

                    {/* Detected Vision Tags */}
                    <div>
                      <div className="font-mono text-[10px] uppercase text-slate-400 mb-1.5">
                        {isTr ? 'TESPİT EDİLEN GÖRSEL İZLER' : 'DETECTED VISION TAGS'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.detectedTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Save to Catalog Button */}
                    <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
                      <div className="text-[11px] text-slate-500">
                        {saveStatus === 'saved' ? (
                          <span className="text-emerald-500 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isTr ? 'Kusur kanıtı başarıyla kaydedildi!' : 'Evidence saved to catalog!'}
                          </span>
                        ) : saveStatus === 'error' ? (
                          <span className="text-rose-500 font-semibold">
                            {isTr ? 'Kayıt sırasında hata oluştu.' : 'Failed to save.'}
                          </span>
                        ) : (
                          <span>{isTr ? 'Katalog ve Tazminat Masasına eklensin mi?' : 'Add to Evidence Catalog?'}</span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        disabled={saveStatus === 'saved' || saveStatus === 'saving'}
                        onClick={handleSaveToCatalog}
                        className="text-xs bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        {saveStatus === 'saved' ? (isTr ? 'Kaydedildi' : 'Saved') : (isTr ? 'Kanıtı Kaydet' : 'Save Evidence')}
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 border-dashed">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center mb-3">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {isTr ? 'Henüz Görsel Taraması Yapılmadı' : 'No Vision Scan Executed Yet'}
                  </div>
                  <p className="text-xs max-w-xs mt-1">
                    {isTr
                      ? 'Yukarıdaki hazır örneklerden birini seçin veya kendi ürün fotoğrafınızı yükleyip "Taramayı Başlat" düğmesine basın.'
                      : 'Select one of the real presets above or upload your own review photo to run the AI scan.'}
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEFECT ANATOMY HEATMAP */}
      {activeTab === 'anatomy' && (
        <div className="space-y-6">
          {/* Product Select Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {anatomyProductList.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  setSelectedAnatomyProdId(prod.id);
                  fetchProductAnatomy(prod.id);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedAnatomyProdId === prod.id
                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'border-slate-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {prod.name.split(' ')[0]} {prod.name.split(' ')[1]} ({prod.category})
              </button>
            ))}
          </div>

          {anatomyData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Anatomy Schematic Canvas */}
              <div className="lg:col-span-7">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-500" />
                        {anatomyData.productName}
                      </CardTitle>
                      <Badge variant="outline" className="font-mono text-xs">
                        {anatomyData.totalPhotoEvidences} {isTr ? 'Görsel Kusur Kaydı' : 'Photo Evidences'}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {isTr
                        ? 'Kusurlu bileşenlerin fiziksel yoğunlaşma noktaları. Detaylı teknik teşhis için dairelerin üzerine tıklayın.'
                        : 'Interactive hotspot map of defective components. Click circles to inspect.'}
                    </CardDescription>
                  </CardHeader>

                  <div className="p-4 pt-0">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-slate-950 aspect-[16/10] flex items-center justify-center p-6 shadow-inner">
                      {/* Blueprint Grid Overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

                      {/* Schematic Silhouette Label */}
                      <div className="absolute top-4 left-4 font-mono text-[11px] text-cyan-400/80 flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" />
                        ANATOMİ KUSUR HARİTASI [CAD SCHEMATIC]
                      </div>

                      {/* Hotspots */}
                      {anatomyData.hotspots.map((spot, idx) => {
                        const isSelected = selectedHotspot?.partName === spot.partName;
                        const isCritical = spot.criticalSharePct > 50;

                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedHotspot(spot)}
                            style={{
                              left: `${spot.x}%`,
                              top: `${spot.y}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            className="absolute group focus:outline-none transition-transform active:scale-95"
                          >
                            {/* Outer Pulse */}
                            <div
                              className={`absolute -inset-3 rounded-full animate-ping opacity-50 ${
                                isCritical ? 'bg-rose-500' : 'bg-amber-400'
                              }`}
                            />

                            {/* Center Circle */}
                            <div
                              className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold shadow-lg transition-all ${
                                isSelected
                                  ? 'scale-125 border-white bg-indigo-600 text-white shadow-indigo-500/50'
                                  : isCritical
                                  ? 'border-rose-300 bg-rose-600 text-white shadow-rose-500/30'
                                  : 'border-amber-300 bg-amber-500 text-slate-950 shadow-amber-500/30'
                              }`}
                            >
                              {spot.defectCount}
                            </div>

                            {/* Hotspot Floating Label */}
                            <div
                              className={`absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono pointer-events-none transition-all ${
                                isSelected
                                  ? 'bg-indigo-600 text-white font-bold opacity-100 scale-105'
                                  : 'bg-black/80 text-slate-300 opacity-80 group-hover:opacity-100'
                              }`}
                            >
                              {spot.partName}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Liability Distribution Progress Bar */}
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06] space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>{isTr ? 'Kusur Sorumluluğu Dağılımı' : 'Liability Allocation'}</span>
                        <span className="font-mono text-slate-500">100% Toplam İnceleme</span>
                      </div>

                      <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                        <div
                          style={{ width: `${anatomyData.supplierLiabilityPct}%` }}
                          title={`Üretici: ${anatomyData.supplierLiabilityPct}%`}
                          className="h-full bg-amber-500 transition-all duration-500"
                        />
                        <div
                          style={{ width: `${anatomyData.carrierLiabilityPct}%` }}
                          title={`Kargo: ${anatomyData.carrierLiabilityPct}%`}
                          className="h-full bg-rose-500 transition-all duration-500"
                        />
                        <div
                          style={{ width: `${anatomyData.packagingLiabilityPct}%` }}
                          title={`Ambalaj: ${anatomyData.packagingLiabilityPct}%`}
                          className="h-full bg-indigo-500 transition-all duration-500"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          Üretici: {anatomyData.supplierLiabilityPct}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          Kargo: {anatomyData.carrierLiabilityPct}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                          Ambalaj/Ar-Ge: {anatomyData.packagingLiabilityPct}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Hotspot Inspection Card */}
              <div className="lg:col-span-5">
                {selectedHotspot ? (
                  <Card className="border-indigo-500/20 bg-white/70 dark:bg-slate-900/60 shadow-lg">
                    <CardHeader className="pb-3 border-b border-slate-200/80 dark:border-white/[0.06]">
                      <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-wider">
                        {isTr ? 'SEÇİLEN BİLEŞEN ANALİZİ' : 'SELECTED COMPONENT PROFILE'}
                      </div>
                      <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                        {selectedHotspot.partName}
                      </CardTitle>
                    </CardHeader>

                    <div className="p-5 space-y-4 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-white/[0.06]">
                          <div className="text-[10px] font-mono text-slate-400">{isTr ? 'Kusurlu Fotoğraf Sayısı' : 'Defect Count'}</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                            {selectedHotspot.defectCount} Adet
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                          <div className="text-[10px] font-mono text-rose-500">{isTr ? 'Kritik İade Payı' : 'Critical Share'}</div>
                          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                            {selectedHotspot.criticalSharePct}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="font-mono text-[10px] uppercase text-slate-400">
                          {isTr ? 'BİRİNCİL HASAR MODU' : 'PRIMARY DEFECT MODE'}
                        </div>
                        <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/[0.04] font-semibold text-slate-800 dark:text-slate-200">
                          {selectedHotspot.primaryDefect}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/30 space-y-2">
                        <div className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-indigo-500" />
                          {isTr ? 'Tavsiye Edilen Fabrika Düzeltici Önlemi (CAPA)' : 'Recommended CAPA Action'}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {isTr
                            ? 'Bu bileşen için tedarikçi kalite şartnamesine tolerans denetimi eklenmeli ve montaj hattında optik kontrol kamerası zorunlu tutulmalıdır.'
                            : 'Update supplier quality specification and mandate optical inspection cameras at final assembly.'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center p-8 text-center text-slate-500">
                    <p>{isTr ? 'İncelemek için ısı haritasındaki noktalara tıklayın.' : 'Click hotspots to inspect.'}</p>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EVIDENCE CATALOG & CLAIMS DESK */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/[0.06]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-2">{isTr ? 'Filtrele:' : 'Filter:'}</span>
              
              {/* Liability Filter */}
              <select
                value={liabilityFilter}
                onChange={(e) => setLiabilityFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">{isTr ? 'Tüm Sorumluluklar' : 'All Liabilities'}</option>
                <option value="LOGISTICS_CARRIER">{isTr ? 'Kargo / Lojistik Kusuru' : 'Carrier Fault'}</option>
                <option value="SUPPLIER_FACTORY">{isTr ? 'Fason Üretici Hatası' : 'Factory Defect'}</option>
                <option value="PACKAGING_DESIGN">{isTr ? 'Ambalaj Kusuru' : 'Packaging Defect'}</option>
              </select>

              {/* Severity Filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ALL">{isTr ? 'Tüm Şiddetler' : 'All Severities'}</option>
                <option value="CRITICAL">{isTr ? 'Kritik' : 'Critical'}</option>
                <option value="HIGH">{isTr ? 'Yüksek' : 'High'}</option>
                <option value="MEDIUM">{isTr ? 'Orta' : 'Medium'}</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              {filteredEvidences.length} {isTr ? 'kanıt listeleniyor' : 'evidences listed'}
            </div>
          </div>

          {/* Evidence Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvidences.map((ev) => (
              <Card key={ev.id} className="overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all">
                {/* Image Top */}
                <div className="relative aspect-video bg-black/90 overflow-hidden group">
                  <img
                    src={ev.imageUrl}
                    alt={ev.affectedPart}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    {getSeverityBadge(ev.severity)}
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[10px] backdrop-blur-md">
                      %{Math.round(ev.confidenceScore * 100)} AI
                    </span>
                  </div>
                  {/* Focus Marker */}
                  <div
                    className="absolute w-5 h-5 rounded-full border-2 border-white bg-rose-600/80 pointer-events-none shadow-[0_0_10px_#f43f5e]"
                    style={{
                      left: `${ev.focusX}%`,
                      top: `${ev.focusY}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">
                        {ev.product?.name || 'Ürün'}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {ev.damageCategory}
                    </h3>

                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {isTr ? 'Bileşen' : 'Component'}: <strong className="text-slate-700 dark:text-slate-300">{ev.affectedPart}</strong>
                    </div>

                    <div>{getLiabilityBadge(ev.liability)}</div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/[0.04] text-[11px] text-slate-600 dark:text-slate-300 line-clamp-3">
                      <strong>{isTr ? 'Kök Neden' : 'Root Cause'}:</strong> {ev.rootCause}
                    </div>

                    <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/30 text-[11px] text-indigo-950 dark:text-indigo-200">
                      <strong>{isTr ? 'Aksiyon' : 'Action'}:</strong> {ev.actionRequired}
                    </div>
                  </div>

                  {/* 1-Click Action Buttons */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.06] flex flex-wrap gap-1.5">
                    {ev.liability === 'LOGISTICS_CARRIER' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClaimAction(ev.id, 'CARRIER_CLAIM')}
                        className="text-[11px] h-7 px-2 text-rose-600 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1"
                      >
                        <Truck className="w-3 h-3" />
                        {isTr ? 'Kargo Tazminat Talebi Aç' : 'File Carrier Claim'}
                      </Button>
                    ) : ev.liability === 'SUPPLIER_FACTORY' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClaimAction(ev.id, 'SUPPLIER_CHARGEBACK')}
                        className="text-[11px] h-7 px-2 text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-1"
                      >
                        <Factory className="w-3 h-3" />
                        {isTr ? 'Tedarikçiye Chargeback Bildir' : 'Supplier Chargeback'}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleClaimAction(ev.id, 'PACKAGING_REV')}
                        className="text-[11px] h-7 px-2 text-indigo-600 border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-1"
                      >
                        <PackageCheck className="w-3 h-3" />
                        {isTr ? 'Ar-Ge Revizyon Emri Ver' : 'Packaging Revision'}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleClaimAction(ev.id, 'RESOLVED')}
                      className="text-[11px] h-7 px-2 text-slate-500 hover:text-emerald-600 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {isTr ? 'Çözüldü' : 'Resolved'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
