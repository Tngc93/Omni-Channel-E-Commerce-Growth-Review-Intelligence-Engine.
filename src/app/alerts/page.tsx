'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ACTIVE_DEFECT_ALERTS,
  DefectSpikeAlert,
  buildSlackBlockKitPayload,
  buildDiscordEmbedPayload,
} from '@/lib/alerts/anomaly-engine';
import { useStoreRole } from '@/lib/context/StoreRoleContext';
import {
  BellRing,
  AlertTriangle,
  Send,
  Check,
  Copy,
  Terminal,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Radio,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function AlertsPage() {
  const { currentStore, currentRole } = useStoreRole();
  const [selectedAlert, setSelectedAlert] = useState<DefectSpikeAlert>(ACTIVE_DEFECT_ALERTS[0]);
  const [platform, setPlatform] = useState<'slack' | 'discord'>('slack');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);

  const previewPayload =
    platform === 'slack'
      ? buildSlackBlockKitPayload(selectedAlert, customNote)
      : buildDiscordEmbedPayload(selectedAlert, customNote);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/alerts/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alertId: selectedAlert.id,
          platform,
          webhookUrl: webhookUrl.trim(),
          customNote: customNote.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        if (data.mode === 'LIVE_DISPATCH') {
          setStatusMessage(`✓ Canlı bildirim başarıyla ${platform.toUpperCase()} webhook'una iletildi! (HTTP ${data.statusCode})`);
        } else {
          setStatusMessage(`✓ Test bildirimi ${platform.toUpperCase()} formatında başarıyla simüle edildi ve doğrulandı!`);
        }
      } else {
        setIsSuccess(false);
        setStatusMessage(`Hata: ${data.error}`);
      }
    } catch (err: any) {
      setIsSuccess(false);
      setStatusMessage(`Ağ Hatası: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(previewPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 apple-bg-glow">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <BellRing className="h-3.5 w-3.5" />
            <span>Real-Time Anomaly Detection & Crisis Alert Hub</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Kriz Tespit Radarı & Canlı Webhook Bildirimleri
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Son 24-48 saatteki müşteri şikayetlerinde normalin üzerine çıkan olağandışı sıçramaları tespit edin. Şirketinizin Slack veya Discord kanalına tek tıkla zengin bildirim kartları fırlatın.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="cyan">{currentStore.name}</Badge>
          <Badge variant="purple">{currentRole.title}</Badge>
        </div>
      </div>

      {/* 2. Active Defect Alerts List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            Aktif Anomali & Kusur Sıçramaları ({ACTIVE_DEFECT_ALERTS.length})
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Otomatik 15 dk aralıkla taranır</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">
          {ACTIVE_DEFECT_ALERTS.map((alert) => {
            const isSelected = selectedAlert.id === alert.id;
            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-500/80 bg-rose-500/[0.04] dark:bg-rose-500/[0.08] shadow-md ring-1 ring-rose-500/40'
                    : 'border-slate-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={alert.severity === 'CRITICAL' ? 'danger' : alert.severity === 'HIGH' ? 'warning' : 'default'}>
                      {alert.severity} SPIKE
                    </Badge>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                      +%{alert.spikePercentage} Şikayet Artışı
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {alert.defectName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {alert.productName} · <span className="font-mono">{alert.sku}</span>
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.06] text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Kapsam: <strong className="text-slate-700 dark:text-slate-200">{alert.timeframe}</strong></span>
                    <span>Etkilenen Kanallar: <strong className="text-slate-700 dark:text-slate-200">{alert.channelsAffected.join(', ')}</strong></span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] pt-1 leading-relaxed">
                    <strong className="text-emerald-600 dark:text-emerald-400">Önerilen Aksiyon: </strong>
                    {alert.recommendedAction}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    {alert.triggerCount} Kritik İnceleme Tetikledi
                  </span>
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    {isSelected ? '✓ Seçili Alarm' : 'Webhook için Seç'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Live Webhook Dispatcher Console */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Webhook Configuration Form */}
        <Card className="p-6 space-y-4">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Send className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-base">Canlı Webhook Gönderim Konsolu</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Seçilen kriz alarmını test amaçlı simüle edin veya doğrudan canlı Slack/Discord webhook adresinize gönderin.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleDispatch} className="space-y-4">
            {/* Platform Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Hedef İletişim Platformu
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('slack')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    platform === 'slack'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-sm'
                      : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Slack (Block Kit)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform('discord')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    platform === 'discord'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-sm'
                      : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Radio className="h-4 w-4" />
                  <span>Discord (Rich Embed)</span>
                </button>
              </div>
            </div>

            {/* Selected Alert Display */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                İletilecek Kusur Alarmı
              </label>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{selectedAlert.defectName}</span>
                  <Badge variant="danger">{selectedAlert.severity}</Badge>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{selectedAlert.productName}</p>
              </div>
            </div>

            {/* Webhook URL Input */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Webhook URL (İsteğe Bağlı)
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder={
                  platform === 'slack'
                    ? 'https://hooks.slack.com/services/T000/B000/XXXX'
                    : 'https://discord.com/api/webhooks/000/XXXX'
                }
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                *Boş bırakırsanız sistem güvenli simülasyon sandbox modunda test eder.
              </span>
            </div>

            {/* Custom Engineering Note */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Ekstra Mühendislik / Destek Notu
              </label>
              <input
                type="text"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Örn: Fabrikaya revizyon emri açıldı, ürün lotu 26-B karantinaya alındı."
                className="w-full rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 p-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs ${
                  isSuccess
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                {statusMessage}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full justify-center">
              <Send className="h-3.5 w-3.5 mr-1.5" />
              {loading ? 'İletiliyor...' : webhookUrl ? 'Canlı Webhook Bildirimi Gönder' : 'Simüle Test Bildirimi Fırlat'}
            </Button>
          </form>
        </Card>

        {/* Live Payload Viewer */}
        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {platform === 'slack' ? 'Slack Block Kit JSON' : 'Discord Embed JSON'} Önizleme
                </h3>
              </div>
              <button
                onClick={handleCopyJson}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'JSON Kopyala'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-2xl bg-slate-900 dark:bg-[#040609] border border-slate-800 dark:border-white/10 text-emerald-400 font-mono text-[11px] overflow-auto max-h-[380px] leading-relaxed">
              {JSON.stringify(previewPayload, null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-3 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span>SSRF ve Rate Limiting Koruması Aktif</span>
            <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">20 İstek / Dakika</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
