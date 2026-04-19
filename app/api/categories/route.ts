import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

const STORE_CATEGORIES = [
  { name: 'Electronics',          slug: 'electronics' },
  { name: 'Computers & Tablets',  slug: 'computers-tablets' },
  { name: 'Appliances',           slug: 'appliances' },
  { name: 'TV & Home Theatre',    slug: 'tv-home-theatre' },
  { name: 'Video Games',          slug: 'video-games' },
  { name: 'Cell Phones',          slug: 'cell-phones' },
  { name: 'Smart Home',           slug: 'smart-home' },
  { name: 'Clearance',            slug: 'clearance' },
];

export async function GET() {
  await dbConnect();
  try {
    // Ensure the 8 store categories always exist
    await Promise.all(
      STORE_CATEGORIES.map(c =>
        Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })
      )
    );
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST() {
  await dbConnect();
  try {
    const results = await Promise.all(
      STORE_CATEGORIES.map(c =>
        Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true })
      )
    );
    return NextResponse.json({ message: 'Categories seeded successfully', categories: results }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
