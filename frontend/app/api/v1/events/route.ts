import { NextResponse } from 'next/server';
import { INITIAL_EVENTS } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const format = searchParams.get('format');
  const search = searchParams.get('search')?.toLowerCase();

  let filtered = INITIAL_EVENTS.filter((e) => e.status === 'PUBLISHED');

  if (category && category !== 'ALL') {
    filtered = filtered.filter((e) => e.category === category);
  }

  if (format && format !== 'ALL') {
    filtered = filtered.filter((e) => e.format === format);
  }

  if (search) {
    filtered = filtered.filter(
      (e) =>
        e.title.toLowerCase().includes(search) ||
        e.summary.toLowerCase().includes(search) ||
        e.category.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
    timezone: 'Asia/Kolkata',
  });
}

