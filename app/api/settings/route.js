import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

export async function GET() {
  const data = getSettings();
  // do not expose admin password in plain get
  const { adminPassword, ...safeSettings } = data;
  return NextResponse.json(safeSettings);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const updated = updateSettings(body);
    const { adminPassword, ...safeSettings } = updated;
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
