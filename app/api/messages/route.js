import { NextResponse } from 'next/server';
import { getMessages, createMessage, updateMessage, deleteMessage } from '@/lib/db';

export async function GET() {
  const data = getMessages();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }
    const created = createMessage(body);
    return NextResponse.json({ success: true, item: created });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    const { id, ...updates } = await req.json();
    const updated = updateMessage(id, updates);
    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
