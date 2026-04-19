import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const resolvedParams = await params;

  try {
    const { action } = await request.json(); // action can be 'pay' or 'deliver'
    
    const order = await Order.findById(resolvedParams.id);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    if (action === 'pay') {
      order.isPaid = true;
      order.paidAt = new Date();
    } else if (action === 'deliver') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();
    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
