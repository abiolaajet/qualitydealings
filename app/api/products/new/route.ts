import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    const product = await Product.create(body);

    return NextResponse.json({ 
      message: 'Product created successfully',
      product
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create Product Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
