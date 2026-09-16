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
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <div>
          <CardTitle>Recent Customer Reviews & AI Aspect Tagging</CardTitle>
          <CardDescription>
            Live stream of ingested feedback parsed into structured aspects
          </CardDescription>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                  {r.productName}
                </span>
                <Badge variant={r.sentiment === 'positive' ? 'success' : r.sentiment === 'negative' ? 'danger' : 'warning'}>
                  {r.aspect.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
                <span className="text-xs text-slate-400 ml-1.5 font-medium">{r.channel}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 italic">
                "{r.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
