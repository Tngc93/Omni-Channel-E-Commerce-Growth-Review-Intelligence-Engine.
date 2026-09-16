'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Send, User, Bot, Sparkles, Flame, Terminal } from 'lucide-react';

export default function PersonaChatPage() {
  const [persona, setPersona] = useState(
    'Esports oyuncusu Arda K. Tulpar T7 oyun laptopu aldı. Cyberpunk 2077 ve Valorant oynarken fan sesinin 58dB çıkması ve WASD tuşlarının 96 dereceye kadar ısınması yüzünden cihazı iade etmek zorunda kaldı. Monster hayranı ama beklentisi yönetilmediği için üzgün.'
  );

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content:
        'Selamlar. Tulpar T7 modelini 2 hafta önce aldım. Oyunlarda 200+ FPS veriyor, donanım canavar gibi ama Turbo moda alınca fanlar 58 dB ile uçak motoru gibi ötüyor. Evde bebek var, gece oynamam imkansız. Klavyenin sol tarafı da ısınıyor.',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          personaDescription: persona,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>Sentetik Müşteri Mülakat Simülatörü</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ar-Ge & PM Müşteri Persona Laboratuvarı
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          İade sürecine girmiş Monster kullanıcılarıyla canlı mülakat yaparak yeni fan profillerini, Control Center güncellemelerini veya kutu içi rehberleri üretime almadan önce test edin.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto flex flex-col h-[650px] border border-white/10 shadow-2xl">
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              <Flame className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">Arda K. (Doğrulanmış Alıcı)</h4>
              <span className="text-[11px] text-rose-400 font-mono">Sipariş #MN-84291 · Monster Tulpar T7 (RTX 4070)</span>
            </div>
          </div>
          <Badge variant="warning">
            <Sparkles className="h-3 w-3" /> Termal Şikayetçi Persona
          </Badge>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="h-7 w-7 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-white text-slate-950 font-medium shadow-md'
                    : 'bg-white/[0.04] text-slate-200 border border-white/[0.08] backdrop-blur-md'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="h-7 w-7 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 flex-shrink-0 font-bold text-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Arda yazıyor...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/[0.08] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Arda'ya sorun: 'Ürün sayfasında Ofis Sessiz Mod (24dB) vs Turbo Mod desibel ses örneği olsaydı iade eder miydin?'"
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-white/30 focus:outline-none backdrop-blur-md"
          />
          <Button type="submit" size="sm" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
