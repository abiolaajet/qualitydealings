import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const search = searchParams.get('search') || searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'createdAt';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;

  // Build query using $and so multiple filters compose correctly
  const andClauses: any[] = [];

  // Text search across name, brand, description
  if (search) {
    const regex = { $regex: search, $options: 'i' };
    andClauses.push({
      $or: [{ name: regex }, { brand: regex }, { description: regex }],
    });
  }

  // Category filter supports both new `categories` array and legacy `category` field
  if (category) {
    andClauses.push({
      $or: [{ categories: category }, { category: category }],
    });
  }

  if (brand) andClauses.push({ brand });
  
  const deals = searchParams.get('deals');
  if (deals === 'true') {
    andClauses.push({ discount: { $gt: 0 } });
  }

  if (minPrice || maxPrice) {
    const priceFilter: any = {};
    if (minPrice) priceFilter.$gte = Number(minPrice);
    if (maxPrice) priceFilter.$lte = Number(maxPrice);
    andClauses.push({ price: priceFilter });
  }

  const query = andClauses.length > 0 ? { $and: andClauses } : {};

  try {
    await dbConnect();
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort === 'priceLow' ? 'price' : sort === 'priceHigh' ? '-price' : '-createdAt')
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: error.message || 'Database connection error' }, { status: 500 });
  }
}
