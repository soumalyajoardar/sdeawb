import { NextResponse } from 'next/server';
import { getLegacyMembers, createLegacyMember, updateLegacyMember, deleteLegacyMember } from '@/lib/db';

export async function GET() {
  const data = getLegacyMembers();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.membershipId || !body.fullName || !body.mobile || !body.department) {
      return NextResponse.json({ 
        error: 'Membership ID, Full Name, Mobile Number, and Directorate/Department are required' 
      }, { status: 400 });
    }
    const created = createLegacyMember(body);
    return NextResponse.json({ success: true, item: created });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }
    const updated = updateLegacyMember(id, updates);
    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Record ID required' }, { status: 400 });
    }
    deleteLegacyMember(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
