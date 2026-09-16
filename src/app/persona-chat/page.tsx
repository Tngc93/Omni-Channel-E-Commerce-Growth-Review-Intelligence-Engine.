'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MessageSquareQuote, Send, User, Bot, Sparkles } from 'lucide-react';

export default function PersonaChatPage() {
  const [persona, setPersona] = useState(
    'Disappointed returner Marcus who returned the Slim Fit Oxford Shirt because chest was too narrow and size guide was wrong.'
  );

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content:
        'Hi! I bought the Signature Slim Fit Oxford Shirt last week. Fabric quality was solid, but I could not even button the Medium across my chest. Size chart was completely off.',
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
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Synthetic Customer Persona Simulator
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Interview AI representations of unsatisfied customers to test copy, size charts, or packaging changes before deployment.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto flex flex-col h-[650px]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
              MV
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Marcus V. (Verified Buyer)</h4>
              <span className="text-xs text-rose-400">Returned Order #84291 · Slim Fit Oxford</span>
            </div>
          </div>
          <Badge variant="warning">
            <Sparkles className="h-3 w-3" /> Interactive AI Persona
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
                <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg p-3 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-emerald-600 text-white font-medium'
                    : 'bg-slate-800/80 text-slate-200 border border-slate-700/60'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="h-7 w-7 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic">
              <Sparkles className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span>Customer is typing...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Marcus: 'If we put a banner saying Runs 1 Size Small, would you have sized up?'"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
          <Button type="submit" size="sm" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
