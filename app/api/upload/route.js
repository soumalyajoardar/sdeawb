import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Initialize Supabase Client
// Note: We use the SERVICE_ROLE_KEY to bypass Row Level Security for admin uploads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request) {
  try {
    // 1. Authenticate Admin Session
    const authCookie = request.cookies.get('sdea_admin_session');
    if (!authCookie || !authCookie.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Extract File from Request
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Security: Check mime type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images and PDFs are allowed.' }, { status: 400 });
    }

    // Security: Check file size (max 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const originalBuffer = Buffer.from(bytes);

    // If it's a PDF, we don't process it with sharp
    if (file.type === 'application/pdf') {
      // PDF logic (placeholder for Supabase upload or local save)
      return NextResponse.json({ error: 'PDF upload currently not configured for image conversion.' }, { status: 400 });
    }

    // 3. Compress & Convert to WebP using Sharp
    // This is the industry standard for fast, tiny images (replaces the need for SVG photographs)
    const webpBuffer = await sharp(originalBuffer)
      .webp({ quality: 80, effort: 6 }) // 80% quality, max compression effort
      .toBuffer();

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_').split('.')[0];
    const uniqueFileName = `${Date.now()}-${sanitizedName}.webp`;

    // 4. Upload to Supabase Storage (if configured)
    if (supabase) {
      const { data, error } = await supabase.storage
        .from('gallery') // Make sure this bucket exists in your Supabase project!
        .upload(uniqueFileName, webpBuffer, {
          contentType: 'image/webp',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Supabase upload error:', error);
        throw new Error('Failed to upload to Supabase: ' + error.message);
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('gallery')
        .getPublicUrl(uniqueFileName);

      return NextResponse.json({ url: publicUrlData.publicUrl });
    } 
    
    // Fallback: Save to Local Storage (if Supabase isn't configured yet)
    else {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(filePath, webpBuffer);

      return NextResponse.json({ 
        url: `/uploads/${uniqueFileName}`,
        warning: 'Supabase keys not found. Saved locally as WebP instead.'
      });
    }

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
