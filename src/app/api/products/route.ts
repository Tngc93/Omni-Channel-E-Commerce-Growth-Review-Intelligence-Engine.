import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { insights: true, reviews: true, hypotheses: true },
      orderBy: { returnRate: 'desc' },
    });
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, sku, category, price, cost, description, imageUrl } = body;

    const product = await prisma.product.create({
      data: {
        name,
        sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
        category: category || 'General',
        price: parseFloat(price) || 0,
        cost: parseFloat(cost) || 0,
        description: description || '',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
        monthlySales: 100,
        returnRate: 5.0,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
