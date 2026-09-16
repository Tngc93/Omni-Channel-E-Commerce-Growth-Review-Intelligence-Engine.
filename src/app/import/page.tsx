'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UploadCloud, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export default function IngestPage() {
  const [productName, setProductName] = useState('Signature Slim Fit Oxford Shirt');
  const [channel, setChannel] = useState('Amazon');
  const [rating, setRating] = useState('1');
  const [comment, setComment] = useState('Arms and chest are too narrow. Shrinks after cold wash.');
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
        setStatus('Successfully ingested and analyzed review with AI aspect tagging!');
        setComment('');
      } else {
        setStatus('Failed to ingest review.');
      }
    } catch (err) {
      setStatus('Network error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Review Ingestion & AI Pipeline
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Simulate Shopify webhooks, import Amazon/Trendyol review batches, or test real-time AI aspect tagging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Single Review Live Ingestion</CardTitle>
            <CardDescription>Test the AI sentiment and aspect extractor in real time</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Product</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white"
              >
                <option>Signature Slim Fit Oxford Shirt</option>
                <option>AeroSound Pro ANC Wireless Earbuds</option>
                <option>Lumina Botanical Retinol Night Serum</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300">Channel</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                >
                  <option>Shopify</option>
                  <option>Amazon</option>
                  <option>Trendyol</option>
                  <option>Hepsiburada</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Rating (Stars)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white"
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Review Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-xs text-white placeholder-slate-500"
                placeholder="Type customer review..."
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Ingest & Trigger AI Analysis'}
            </Button>

            {status && (
              <div className="rounded-lg bg-emerald-950/40 p-3 text-xs text-emerald-300 border border-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{status}</span>
              </div>
            )}
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Providers & Diagnostics Config</CardTitle>
            <CardDescription>Multi-model fallback architecture</CardDescription>
          </CardHeader>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="rounded-lg bg-slate-800/60 p-4 space-y-2 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">1. Built-in Local Heuristic Engine</span>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-slate-400">
                Works 100% offline without any API key or billing required. Accurately flags fit, quality, battery, and packaging complaints.
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-4 space-y-2 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">2. Google Gemini 2.5 Flash</span>
                <Badge variant="outline">Optional (.env)</Badge>
              </div>
              <p className="text-slate-400">
                Set <code className="text-emerald-400">GEMINI_API_KEY</code> to enable native multi-modal JSON reasoning.
              </p>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-4 space-y-2 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">3. OpenAI GPT-4o</span>
                <Badge variant="outline">Optional (.env)</Badge>
              </div>
              <p className="text-slate-400">
                Set <code className="text-emerald-400">OPENAI_API_KEY</code> for OpenAI structured JSON output.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
