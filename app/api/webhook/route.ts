import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { headers } from 'next/headers';

// This is the Stripe Webhook secret for verifying event signatures
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    if (webhookSecret && signature) {
      // Verify the event came from Stripe
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback if no secret is provided (less secure, only for testing)
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Here we use the Stripe Secret Key (via the stripe instance) to fetch more details if needed
    // or just use the metadata we passed during checkout
    const userId = session.metadata.userId;
    const items = JSON.parse(session.metadata.items);

    await dbConnect();

    try {
      // Create the order in the database
      const order = new Order({
        user: userId,
        orderItems: items.map((item: any) => ({
          product: item._id,
          name: 'Item from Stripe Session', // In a real app, you'd fetch product details
          quantity: item.quantity,
          price: session.amount_total / 100 / item.quantity, // simple split
          image: '/images/placeholder.png'
        })),
        shippingAddress: {
          fullName: session.customer_details?.name || 'Customer',
          address: session.customer_details?.address?.line1 || 'Stripe Address',
          city: session.customer_details?.address?.city || 'Stripe City',
          postcode: session.customer_details?.address?.postal_code || 'Stripe Postcode',
          country: session.customer_details?.address?.country || 'GB',
        },
        paymentMethod: 'Stripe',
        totalPrice: session.amount_total / 100,
        isPaid: true,
        paidAt: new Date(),
        stripeSessionId: session.id,
      });

      await order.save();
      console.log(`Order created for User ${userId}`);
    } catch (dbErr) {
      console.error('Error creating order from webhook:', dbErr);
    }
  }

  return NextResponse.json({ received: true });
}
