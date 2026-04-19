import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ShippingSettings from '@/models/ShippingSettings';

export async function GET() {
  await dbConnect();
  try {
    let settings = await ShippingSettings.findOne({});
    if (!settings) {
      // Auto-create defaults on first load
      settings = await ShippingSettings.create({});
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();

    // Update existing, or create if none exists
    let settings = await ShippingSettings.findOne({});
    if (settings) {
      Object.assign(settings, body);
      await settings.save();
    } else {
      settings = await ShippingSettings.create(body);
    }

    return NextResponse.json({ message: 'Shipping settings updated', settings });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
