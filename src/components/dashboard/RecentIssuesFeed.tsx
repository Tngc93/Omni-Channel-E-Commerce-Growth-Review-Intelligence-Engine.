import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Star } from 'lucide-react';

interface ReviewFeedItem {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  aspect: string;
  channel: string;
  sentiment: string;
}

interface RecentIssuesFeedProps {
  reviews: ReviewFeedItem[];
}

export function RecentIssuesFeed({ reviews }: RecentIssuesFeedProps) {
  const getAspectBadgeVariant = (aspect: string) => {
    switch (aspect) {
      case 'thermals': return 'danger';
      case 'display': return 'cyan';
      case 'software': return 'purple';
      case 'build': return 'warning';
      case 'service': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <div>
          <CardTitle>Canlı Müşteri Yorum Akışı & Donanım Teşhisleri</CardTitle>
          <CardDescription>
            Çoklu kanallardan (Monster Web, Trendyol, Hepsiburada, Amazon TR) anlık çekilen ve AI ile etiketlenen yorumlar
          </CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:bg-white/[0.04] hover:border-white/10"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold text-white truncate max-w-[180px]">
                  {r.productName}
                </span>
                <Badge variant={getAspectBadgeVariant(r.aspect)}>
                  {r.aspect.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-mono ml-1">{r.channel}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 italic">
                "{r.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
