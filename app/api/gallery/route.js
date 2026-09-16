import { NextResponse } from 'next/server';
import { getGallery, createGalleryItem, deleteGalleryItem } from '@/lib/db';

export async function GET() {
  const data = getGallery();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.src) {
      return NextResponse.json({ error: 'Title and image source URL required' }, { status: 400 });
    }
    const created = createGalleryItem(body);
    return NextResponse.json({ success: true, item: created });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    deleteGalleryItem(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
