'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Send, User, Bot, Sparkles, Terminal, Laptop, Shirt, Coffee } from 'lucide-react';

interface PersonaProfile {
  id: string;
  name: string;
  avatarIcon: any;
  role: string;
  productName: string;
  orderNumber: string;
  category: string;
  defectSummary: string;
  systemPrompt: string;
  initialMessage: string;
}

const PERSONAS: PersonaProfile[] = [
  {
    id: 'tech',
    name: 'Kaan B. (Video Editor)',
    avatarIcon: Laptop,
    role: 'Tüketici Elektroniği Müşterisi',
    productName: 'ApexPro 16" Creator Laptop',
    orderNumber: 'ORD-TECH-9821',
    category: 'Consumer Electronics',
    defectSummary: '4K Render sırasında 94°C ısınma ve 56dB fan gürültüsü',
    systemPrompt: 'Video editörü Kaan B. ApexPro laptop aldı. Ağır 4K render işlerinde fan gürültüsünün 56 desibele çıkması ve klavye yüzeyinin 94 dereceye kadar ısınması yüzünden iade etti.',
    initialMessage: 'Selamlar. ApexPro 16 laptopu video kurgusu için aldım. OLED ekran muhteşem ancak render alırken fanlar 56 dB ile yan odadan duyuluyor ve klavye yüzeyi aşırı ısınıyor.',
  },
  {
    id: 'fashion',
    name: 'Elena R. (Moda Alıcısı)',
    avatarIcon: Shirt,
    role: 'Giyim & Tekstil Müşterisi',
    productName: 'Merino Wool Tailored Blazer',
    orderNumber: 'ORD-FASH-4412',
    category: 'Fashion & Apparel',
    defectSummary: 'İtalyan dar kalıp nedeniyle omuzların sıkması ve yanlış beden tablosu',
    systemPrompt: 'Elena R. Merino yün ceket aldı. Beden tablosuna göre Medium sipariş etti ama omuzlar aşırı dar geldi ve kollarını kaldıramadığı için iade etti.',
    initialMessage: 'Merhaba. Merino Wool ceketin kumaşı harika ama beden tablonuz tamamen yanıltıcı! Normalde M giyerim ama omuzlar o kadar dardı ki içine sığamadım.',
  },
  {
    id: 'beauty',
    name: 'Sophie L. (Cilt Bakım Sever)',
    avatarIcon: Sparkles,
    role: 'Kozmetik Müşterisi',
    productName: 'Botanical Barrier Repair Serum',
    orderNumber: 'ORD-BEAU-7731',
    category: 'Beauty & Skincare',
    defectSummary: 'Cam damlalık kargoda çatlamış ve serum sızmış',
    systemPrompt: 'Sophie L. Barrier serumu aldı. Kargoda cam damlalık çatlamış ve dökülmüştü. Cam kırıkları olduğu için ürünü kullanamadan iade etti.',
    initialMessage: 'İyi günler. Cildim çok hassas olduğu için peptit serumunuzu çok merak ediyordum ama kargodan cam damlalığı parçalanmış ve içine sızmış halde çıktı.',
  },
  {
    id: 'home',
    name: 'Marco V. (Kahve Tutkunu)',
    avatarIcon: Coffee,
    role: 'Ev & Mutfak Aletleri Müşterisi',
    productName: 'BaristaCraft Dual-Boiler Espresso',
    orderNumber: 'ORD-HOME-2391',
    category: 'Home & Kitchen',
    defectSummary: '15-Bar basınç altında portafiltre conta sızıntısı',
    systemPrompt: 'Marco V. BaristaCraft espresso makinesi aldı. 15 bar basınç altında contadan sıcak kahve fışkırdığı için iade etti.',
    initialMessage: 'Selamlar. Makinenin tasarımı ve dual-boiler sistemi çok şık fakat espresso demlerken portafiltre kenarından sıcak su fışkırıyor. Silikon conta tam oturmuyor.',
  },
];

export default function PersonaChatPage() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaProfile>(PERSONAS[0]);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: PERSONAS[0].initialMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectPersona = (p: PersonaProfile) => {
    setSelectedPersona(p);
    setMessages([{ role: 'assistant', content: p.initialMessage }]);
  };

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
          personaDescription: selectedPersona.systemPrompt,
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

  const AvatarIcon = selectedPersona.avatarIcon;

  return (
    <div className="space-y-6 apple-bg-glow">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>Universal Synthetic Customer Persona Lab</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Çok Sektörlü Müşteri Mülakat Simülatörü
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl">
          İade sürecine girmiş gerçekçi müşteri personaları ile canlı mülakat yapın. Elektronik fan sesinden moda beden kalıbına, kozmetik ambalajından mutfak contasına kadar çözümlerinizi test edin.
        </p>
      </div>

      {/* Persona Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PERSONAS.map((p) => {
          const Icon = p.avatarIcon;
          const isSelected = selectedPersona.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelectPersona(p)}
              className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white/[0.08] border-white/25 shadow-lg'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`h-4 w-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="font-semibold text-xs text-white line-clamp-1">{p.name.split(' ')[0]}</span>
              </div>
              <span className="text-[10px] text-slate-400 line-clamp-1">{p.category}</span>
              <span className="text-[10px] text-rose-400 font-mono mt-1 line-clamp-1">{p.defectSummary}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Chat Window */}
      <Card className="max-w-4xl mx-auto flex flex-col h-[600px] border border-white/10 shadow-2xl">
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
              <AvatarIcon className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white">{selectedPersona.name}</h4>
              <span className="text-[11px] text-emerald-400 font-mono">
                {selectedPersona.productName} · {selectedPersona.orderNumber}
              </span>
            </div>
          </div>
          <Badge variant="warning">
            <Sparkles className="h-3 w-3" /> {selectedPersona.role}
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
              <span>Müşteri yazıyor...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-white/[0.08] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Örn: 'Ürün sayfamıza önerilen çözümü ekleseydik iade etmekten vazgeçer miydin?'`}
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
