import { NextResponse } from 'next/server';
import { getOfficeBearers, saveOfficeBearer, deleteOfficeBearer } from '@/lib/db';

export async function GET() {
  const data = getOfficeBearers();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const saved = saveOfficeBearer(body);
    return NextResponse.json({ success: true, item: saved });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    deleteOfficeBearer(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
