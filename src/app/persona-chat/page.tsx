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
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Terminal className="h-3.5 w-3.5" />
          <span>Universal Synthetic Customer Persona Lab</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Çok Sektörlü Müşteri Mülakat Simülatörü
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
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
              className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-md scale-[1.02]'
                  : 'bg-white/80 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 dark:bg-slate-900/10' : 'bg-slate-100 dark:bg-white/10'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold">{p.category}</span>
              </div>
              <span className="text-sm font-bold truncate w-full">{p.name.split(' ')[0]}</span>
              <span className={`text-[10px] truncate w-full mt-0.5 ${isSelected ? 'text-white/80 dark:text-slate-800' : 'text-slate-500 dark:text-slate-400'}`}>
                {p.productName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Persona Profile Card */}
        <Card className="col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <AvatarIcon className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedPersona.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedPersona.role}</p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] p-3.5 text-xs">
            <div>
              <span className="text-slate-400">İncelenen Ürün:</span>
              <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{selectedPersona.productName}</p>
            </div>
            <div>
              <span className="text-slate-400">Sipariş / Fatura No:</span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{selectedPersona.orderNumber}</p>
            </div>
            <div>
              <span className="text-slate-400">Ana İade Sebebi:</span>
              <p className="text-rose-500 dark:text-rose-400 font-medium mt-0.5">{selectedPersona.defectSummary}</p>
            </div>
          </div>
        </Card>

        {/* Live Chat Area */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col h-[520px]">
          <CardHeader className="border-b border-slate-200/80 dark:border-white/[0.06] pb-3 mb-0">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <CardTitle className="text-sm">Canlı Persona Görüşmesi</CardTitle>
              </div>
              <Badge variant="cyan">{selectedPersona.category}</Badge>
            </div>
          </CardHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <AvatarIcon className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-3.5 max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/[0.08]'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                <span>Müşteri yanıt yazıyor...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-200/80 dark:border-white/[0.06] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`${selectedPersona.name.split(' ')[0]} kişisine çözüm teklif edin veya soru sorun...`}
              className="flex-1 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/10 px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              <Send className="h-3.5 w-3.5 mr-1" /> Gönder
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
