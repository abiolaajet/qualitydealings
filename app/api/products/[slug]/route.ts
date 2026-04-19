import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const resolvedParams = await params;

  try {
    const product = await Product.findOne({ slug: resolvedParams.slug })
      .populate({ path: 'category', strictPopulate: false })
      .populate({ path: 'categories', strictPopulate: false });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Build a safe related-products query that handles both old (single category)
    // and new (categories array) products without crashing on undefined/$in:[]
    const orClauses: any[] = [];

    const catIds: string[] = (product.categories ?? []).map((c: any) =>
      typeof c === 'object' ? String(c._id) : String(c)
    ).filter(Boolean);

    if (catIds.length > 0) {
      orClauses.push({ categories: { $in: catIds } });
    }

    const legacyCatId = product.category?._id ?? product.category;
    if (legacyCatId) {
      orClauses.push({ category: legacyCatId });
    }

    const related = orClauses.length > 0
      ? await Product.find({ $or: orClauses, _id: { $ne: product._id } }).limit(4)
      : [];

    return NextResponse.json({ product, related });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const resolvedParams = await params;

  try {
    const body = await request.json();

    const product = await Product.findOneAndUpdate(
      { slug: resolvedParams.slug },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully', product });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  const resolvedParams = await params;

  try {
    const product = await Product.findOneAndDelete({ slug: resolvedParams.slug });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
