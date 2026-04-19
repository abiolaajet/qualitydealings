import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// GET: Fetch current user's orders
export async function GET(request: Request) {
  await dbConnect();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const orders = await Order.find({ user: decoded.id }).sort('-createdAt');
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST: Create a new order after checkout success
export async function POST(request: Request) {
  await dbConnect();

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const data = await request.json();
    
    // Calculate total
    const itemsPrice = data.orderItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const shippingPrice = 0; // free shipping
    const taxPrice = 0; // included
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const order = new Order({
      user: decoded.id,
      orderItems: data.orderItems,
      shippingAddress: data.shippingAddress || {
        fullName: 'Pending',
        address: 'Pending',
        city: 'Pending',
        postcode: 'Pending',
        country: 'GB'
      },
      paymentMethod: 'Stripe',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: new Date()
    });

    const createdOrder = await order.save();
    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
