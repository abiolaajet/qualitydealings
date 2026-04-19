import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();

  try {
    // 1. Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    // 2. Create Admin User
    const hashedPassword = await bcrypt.hash('12345@Deal', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'qualitydealings@yahoo.co.uk',
      password: hashedPassword,
      role: 'admin',
    });

    // 3. Create Categories
    const electronics = await Category.create({ name: 'Electronics', slug: 'electronics' });
    const computers = await Category.create({ name: 'Computers', slug: 'computers', parent: electronics._id });
    const phones = await Category.create({ name: 'Phones', slug: 'phones', parent: electronics._id });
    const appliances = await Category.create({ name: 'Appliances', slug: 'appliances' });

    // 4. Create Sample Products
    const products = [
      {
        name: 'MacBook Pro 14" (M3 Chip, 512GB) - Silver',
        slug: 'macbook-pro-14-m3-512-silver',
        description: 'The new MacBook Pro with M3 chip. Stunning Liquid Retina XDR display, pro ports, and incredible battery life.',
        price: 1699,
        discount: 100,
        brand: 'Apple',
        category: computers._id,
        images: ['https://images.unsplash.com/photo-1517336714460-4c5042253f7c?auto=format&fit=crop&q=80&w=800'],
        stock: 25,
        isFeatured: true,
        specifications: {
          'Processor': 'M3 Chip',
          'RAM': '8GB',
          'Storage': '512GB SSD',
          'Display': '14.2-inch Liquid Retina XDR',
        }
      },
      {
        name: 'iPhone 15 Pro 128GB - Natural Titanium',
        slug: 'iphone-15-pro-128-titanium',
        description: 'Titanium design. A17 Pro chip. Pro camera system. USB-C with USB 3 speed.',
        price: 999,
        brand: 'Apple',
        category: phones._id,
        images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800'],
        stock: 40,
        isFeatured: true,
        specifications: {
          'Chip': 'A17 Pro',
          'Camera': '48MP Main',
          'Battery': 'Up to 23 hours playback',
        }
      },
      {
        name: 'Samsung 65" Class S90C OLED 4K Smart TV',
        slug: 'samsung-65-oled-s90c',
        description: 'See the difference OLED makes. Pure blacks, more than a billion shades of color, and high resolution.',
        price: 2199,
        discount: 300,
        brand: 'Samsung',
        category: electronics._id,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800'],
        stock: 12,
        isFeatured: true,
        specifications: {
          'Screen Size': '65 Inch',
          'Display Type': 'OLED',
          'Resolution': '4K (3840 x 2160)',
        }
      },
      {
        name: 'Dyson V15 Detect Cordless Vacuum',
        slug: 'dyson-v15-detect',
        description: 'Dyson\'s most powerful, intelligent cordless vacuum. With laser illumination and piezo sensor.',
        price: 649,
        brand: 'Dyson',
        category: appliances._id,
        images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800'],
        stock: 15,
        specifications: {
          'Run Time': '60 Minutes',
          'Weight': '3.1 kg',
        }
      }
    ];

    await Product.insertMany(products);

    return NextResponse.json({ message: 'Database seeded successfully', admin: 'qualitydealings@yahoo.co.uk / admin123' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
