import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';

export async function GET() {
  await dbConnect();
  try {
    const banners = await Banner.find({}).sort('createdAt');
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    
    // Quick validation: body should be an array of banners
    if (!Array.isArray(body)) {
      return NextResponse.json({ message: 'Payload must be an array of banners' }, { status: 400 });
    }

    // Replace all existing banners with the new array
    await Banner.deleteMany({});
    const newBanners = await Banner.insertMany(body);

    return NextResponse.json({ message: 'Banners updated successfully', banners: newBanners }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
