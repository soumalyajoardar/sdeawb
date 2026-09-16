import { NextResponse } from 'next/server';
import { getMemberships, createMembership, updateMembership } from '@/lib/db';

export async function GET() {
  const data = getMemberships();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.applicantName || !body.mobile || !body.department) {
      return NextResponse.json({ error: 'Name, mobile, and department are required' }, { status: 400 });
    }
    const created = createMembership(body);
    return NextResponse.json({ success: true, item: created });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status, notes } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }
    const updated = updateMembership(id, status, notes);
    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
