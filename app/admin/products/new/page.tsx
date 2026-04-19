'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useRouter } from 'next/navigation';
import { Save, X, ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Category as CategoryType } from '@/types';

const PRODUCT_TEMPLATES = [
  // CELL PHONES
  {
    id: 'phone_iphone15promax',
    label: 'Cell Phones - iPhone 15 Pro Max',
    data: { name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium', description: 'The most powerful iPhone ever. Titanium design, A17 Pro chip, 48MP pro camera system with 5x optical zoom, Action button, and USB-C with USB 3 speed.', price: '1199', stock: '45', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Chip': 'A17 Pro chip (6-core CPU, 6-core GPU, 16-core Neural Engine)', 'Display': '6.7-inch Super Retina XDR OLED, 2796x1290, 460 ppi, 120Hz ProMotion', 'Storage': '256GB', 'Rear Cameras': '48MP Main (f/1.78), 12MP Ultra Wide (f/2.2), 12MP 5x Telephoto (f/2.8)', 'Front Camera': '12MP TrueDepth (f/1.9), autofocus', 'Video': '4K ProRes up to 60fps, Log video, Action mode', 'Battery': 'Up to 29 hours video playback, 4422mAh', 'Charging': 'MagSafe 15W, USB-C 27W, Qi2 15W', 'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3, UWB, NFC', 'Build': 'Titanium frame, textured matte glass back', 'Water Resistance': 'IP68 (6m for 30 min)', 'Dimensions': '159.9 x 76.7 x 8.25mm, 221g', 'Face ID': 'Yes', 'Operating System': 'iOS 17' } },
  },
  {
    id: 'phone_iphone15',
    label: 'Cell Phones - iPhone 15 128GB',
    data: { name: 'Apple iPhone 15 128GB - Pink', description: 'iPhone 15 with Dynamic Island, 48MP main camera, A16 Bionic chip and USB-C. Colour-infused back glass with a textured matte finish.', price: '799', stock: '60', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'A16 Bionic (6-core CPU, 5-core GPU, 16-core Neural Engine)', 'Display': '6.1-inch Super Retina XDR OLED, 2556x1179, 460 ppi, Dynamic Island', 'Storage': '128GB', 'Rear Cameras': '48MP Main (f/1.6), 12MP Ultra Wide (f/2.4)', 'Front Camera': '12MP TrueDepth (f/1.9)', 'Video': '4K Dolby Vision up to 60fps, Cinematic mode up to 4K 30fps', 'Battery': 'Up to 20 hours video playback', 'Charging': 'USB-C (18W), MagSafe 15W, Qi2 15W', 'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.3, NFC', 'Build': 'Colour-infused textured matte glass, aluminium frame', 'Water Resistance': 'IP68 (6m for 30 min)', 'Dimensions': '147.6 x 71.6 x 7.8mm, 171g', 'Operating System': 'iOS 17' } },
  },
  {
    id: 'phone_iphone14',
    label: 'Cell Phones - iPhone 14 128GB',
    data: { name: 'Apple iPhone 14 128GB - Midnight', description: 'iPhone 14 with advanced dual-camera system, Emergency SOS via satellite, Crash Detection, and A15 Bionic chip.', price: '599', stock: '80', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'A15 Bionic (6-core CPU, 5-core GPU)', 'Display': '6.1-inch Super Retina XDR OLED, 2532x1170, 460 ppi', 'Storage': '128GB', 'Rear Cameras': '12MP Main (f/1.5, sensor-shift OIS), 12MP Ultra Wide (f/2.4)', 'Front Camera': '12MP TrueDepth (f/1.9), autofocus', 'Video': '4K Dolby Vision up to 60fps', 'Battery': 'Up to 20 hours video playback', 'Charging': 'Lightning (20W), MagSafe 15W, Qi 7.5W', 'Safety': 'Emergency SOS via satellite, Crash Detection', 'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.3, NFC', 'Water Resistance': 'IP68 (6m for 30 min)', 'Dimensions': '146.7 x 71.5 x 7.8mm, 172g', 'Operating System': 'iOS 16 (upgradeable to iOS 17)' } },
  },
  {
    id: 'phone_samsung_s24_ultra',
    label: 'Cell Phones - Samsung Galaxy S24 Ultra',
    data: { name: 'Samsung Galaxy S24 Ultra 256GB - Titanium Black', description: 'Galaxy S24 Ultra with built-in S Pen, 200MP camera, 100x Space Zoom, Galaxy AI, 5000mAh battery and Snapdragon 8 Gen 3.', price: '1249', stock: '35', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)', 'Display': '6.8-inch Dynamic AMOLED 2X, 3088x1440, 505 ppi, 1-120Hz LTPO', 'RAM': '12GB', 'Storage': '256GB (UFS 4.0)', 'Rear Cameras': '200MP Wide (f/1.7, OIS) + 10MP 3x Tele + 50MP 5x Tele + 12MP Ultra Wide', 'Front Camera': '12MP (f/2.2)', 'S Pen': 'Built-in, 2.8ms latency', 'Battery': '5000mAh, 45W wired, 15W wireless, 4.5W reverse wireless', 'Galaxy AI': 'Circle to Search, Live Translate, Transcript Assist, Generative Edit', 'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3, UWB, NFC', 'Water Resistance': 'IP68', 'Build': 'Titanium frame, Gorilla Glass Armor front', 'Dimensions': '162.3 x 79 x 8.6mm, 232g', 'OS': 'Android 14, One UI 6.1, 7 years updates' } },
  },
  {
    id: 'phone_samsung_s24',
    label: 'Cell Phones - Samsung Galaxy S24',
    data: { name: 'Samsung Galaxy S24 128GB - Marble Grey', description: 'Galaxy S24 with Galaxy AI, 50MP triple camera, Snapdragon 8 Gen 3, 4000mAh battery and 7 years of OS updates.', price: '799', stock: '55', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)', 'Display': '6.2-inch Dynamic AMOLED 2X, 2340x1080, 416 ppi, 1-120Hz LTPO', 'RAM': '8GB', 'Storage': '128GB', 'Rear Cameras': '50MP Wide (f/1.8, OIS) + 10MP 3x Tele + 12MP Ultra Wide', 'Front Camera': '12MP (f/2.2)', 'Battery': '4000mAh, 25W wired, 15W wireless', 'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3, NFC', 'Water Resistance': 'IP68', 'Dimensions': '147 x 70.6 x 7.6mm, 167g', 'OS': 'Android 14, One UI 6.1, 7 years updates' } },
  },
  {
    id: 'phone_pixel8pro',
    label: 'Cell Phones - Google Pixel 8 Pro',
    data: { name: 'Google Pixel 8 Pro 128GB - Obsidian', description: 'Pixel 8 Pro with Google Tensor G3 chip, 50MP camera with Super Res Zoom, Temperature Sensor, and 7 years of Android updates.', price: '999', stock: '40', brand: 'Google', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Google Tensor G3 with Titan M2 security chip', 'Display': '6.7-inch LTPO OLED, 2992x1344, 489 ppi, 1-120Hz', 'RAM': '12GB', 'Storage': '128GB (UFS 3.1)', 'Rear Cameras': '50MP Wide (f/1.68, OIS) + 48MP 5x Tele + 48MP Ultra Wide', 'Front Camera': '10.5MP (f/2.2)', 'Special Sensors': 'Temperature sensor, Face Unlock + Fingerprint', 'AI Features': 'Best Take, Magic Eraser, Photo Unblur, Call Screen', 'Battery': '5050mAh, 30W wired, 23W wireless, reverse wireless', 'Connectivity': '5G (mmWave + sub-6GHz), Wi-Fi 7, Bluetooth 5.3, UWB, NFC', 'Water Resistance': 'IP68', 'Dimensions': '162.6 x 76.5 x 8.8mm, 213g', 'OS': 'Android 14, 7 years of OS, security & Pixel Drop updates' } },
  },
  {
    id: 'phone_oneplus12',
    label: 'Cell Phones - OnePlus 12',
    data: { name: 'OnePlus 12 256GB - Silky Black', description: 'OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad-tuned 50MP triple camera, 100W SUPERVOOC charging and 5400mAh battery.', price: '849', stock: '50', brand: 'OnePlus', imageUrl: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Snapdragon 8 Gen 3 (4nm)', 'Display': '6.82-inch LTPO AMOLED, 3168x1440, 510 ppi, 1-120Hz', 'RAM': '12GB LPDDR5X', 'Storage': '256GB UFS 4.0', 'Rear Cameras': '50MP Hasselblad Main (f/1.6, OIS) + 64MP 3x Periscope + 48MP Ultra Wide', 'Front Camera': '32MP (f/2.45)', 'Battery': '5400mAh, 100W SUPERVOOC (in 25 min), 50W AIRVOOC wireless', 'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.4, NFC', 'Water Resistance': 'IP65', 'Dimensions': '164.3 x 75.8 x 9.15mm, 220g', 'OS': 'OxygenOS 14 (Android 14)' } },
  },
  {
    id: 'phone_budget',
    label: 'Cell Phones - Budget Android Phone',
    data: { name: 'Samsung Galaxy A55 5G 128GB - Awesome Iceblue', description: 'Galaxy A55 5G with 50MP OIS camera, 5000mAh battery, 5G connectivity and Galaxy AI features at a great price.', price: '349', stock: '100', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Exynos 1480 (4nm)', 'Display': '6.6-inch Super AMOLED, 2340x1080, 120Hz', 'RAM': '8GB', 'Storage': '128GB, microSD expandable', 'Rear Cameras': '50MP (f/1.8, OIS) + 12MP Ultra Wide + 5MP Macro', 'Front Camera': '32MP (f/2.2)', 'Battery': '5000mAh, 25W fast charging', 'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.3, NFC', 'Water Resistance': 'IP67', 'OS': 'Android 14, One UI 6.1, 4 years OS updates' } },
  },

  // COMPUTERS & TABLETS
  {
    id: 'laptop_macbook_pro16',
    label: 'Computers & Tablets - MacBook Pro 16" M3 Max',
    data: { name: 'Apple MacBook Pro 16-inch (M3 Max, 36GB, 1TB) - Space Black', description: 'MacBook Pro with M3 Max chip, 36GB unified memory, 1TB SSD, Liquid Retina XDR display, up to 22 hours battery. Built for the most demanding pro workflows.', price: '3499', stock: '15', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Chip': 'Apple M3 Max (16-core CPU, 40-core GPU, 16-core Neural Engine)', 'Memory': '36GB unified memory', 'Storage': '1TB SSD', 'Display': '16.2-inch Liquid Retina XDR, 3456x2234, 254 ppi, 1000 nits sustained, 1600 nits peak HDR', 'Battery': 'Up to 22 hours (Apple TV app), 100Wh', 'Charging': '140W USB-C MagSafe 3', 'Ports': '3x Thunderbolt 4, HDMI, SD card slot, headphone jack, MagSafe 3', 'Camera': '12MP Centre Stage webcam', 'Audio': 'Six-speaker sound system with Spatial Audio, studio-quality 3-mic array', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Keyboard': 'Backlit Magic Keyboard with Touch ID', 'Dimensions': '355.7 x 248.1 x 16.8mm, 2.14kg', 'OS': 'macOS Sonoma' } },
  },
  {
    id: 'laptop_macbook_pro14',
    label: 'Computers & Tablets - MacBook Pro 14" M3',
    data: { name: 'Apple MacBook Pro 14-inch (M3, 16GB, 512GB) - Silver', description: 'MacBook Pro 14" with M3 chip, 16GB unified memory, 512GB SSD, Liquid Retina XDR display, MagSafe charging and up to 18 hours battery.', price: '1999', stock: '25', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1517336714460-4c5042253f7c?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Chip': 'Apple M3 (8-core CPU, 10-core GPU, 16-core Neural Engine)', 'Memory': '16GB unified memory', 'Storage': '512GB SSD', 'Display': '14.2-inch Liquid Retina XDR, 3024x1964, 254 ppi, ProMotion 1-120Hz', 'Battery': 'Up to 18 hours, 70Wh', 'Charging': '96W USB-C MagSafe 3', 'Ports': '3x Thunderbolt 3, HDMI, SD card slot, headphone jack, MagSafe 3', 'Camera': '12MP Centre Stage webcam', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Dimensions': '312.6 x 221.2 x 15.5mm, 1.55kg', 'OS': 'macOS Sonoma' } },
  },
  {
    id: 'laptop_macbook_air15',
    label: 'Computers & Tablets - MacBook Air 15" M3',
    data: { name: 'Apple MacBook Air 15-inch (M3, 16GB, 512GB) - Midnight', description: "The world's best consumer laptop. MacBook Air 15\" with M3 chip, 15.3\" Liquid Retina display, 18-hour battery, fanless design and MagSafe charging.", price: '1499', stock: '30', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'Apple M3 (8-core CPU, 10-core GPU, 16-core Neural Engine)', 'Memory': '16GB unified memory', 'Storage': '512GB SSD', 'Display': '15.3-inch Liquid Retina, 2880x1864, 224 ppi, 500 nits brightness', 'Battery': 'Up to 18 hours, 66.5Wh, fanless design', 'Charging': 'MagSafe 3, 2x Thunderbolt / USB 4', 'Ports': '2x Thunderbolt / USB 4, MagSafe 3, headphone jack', 'Camera': '12MP Centre Stage webcam', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Dimensions': '340.4 x 237.6 x 11.5mm, 1.51kg', 'OS': 'macOS Sonoma' } },
  },
  {
    id: 'laptop_dell_xps15',
    label: 'Computers & Tablets - Dell XPS 15 OLED',
    data: { name: 'Dell XPS 15 (Intel Core i9, RTX 4060, 32GB, 1TB) - Platinum', description: 'Dell XPS 15 with 15.6" OLED touchscreen, Intel Core i9-13900H, NVIDIA RTX 4060, 32GB DDR5 RAM and 1TB NVMe SSD. Premium creator laptop.', price: '2299', stock: '18', brand: 'Dell', imageUrl: 'https://images.unsplash.com/photo-1593642632816-6ef9a31b3e35?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Intel Core i9-13900H (24 cores, up to 5.4GHz)', 'GPU': 'NVIDIA GeForce RTX 4060 8GB GDDR6', 'Display': '15.6-inch OLED Touch, 3456x2160, 60Hz, DCI-P3 100%', 'RAM': '32GB DDR5 4800MHz', 'Storage': '1TB PCIe 4.0 NVMe SSD', 'Battery': '86Wh, up to 13 hours', 'Charging': '130W USB-C', 'Ports': '2x Thunderbolt 4, USB-A 3.2, SD card, headphone jack', 'Webcam': '720p IR camera with Windows Hello', 'Connectivity': 'Killer Wi-Fi 6E, Bluetooth 5.3', 'Dimensions': '344.4 x 230.1 x 18.0mm, 1.86kg', 'OS': 'Windows 11 Home' } },
  },
  {
    id: 'laptop_lenovo_thinkpad',
    label: 'Computers & Tablets - Lenovo ThinkPad X1 Carbon',
    data: { name: 'Lenovo ThinkPad X1 Carbon Gen 12 (Core Ultra 7, 32GB, 1TB)', description: 'Business ultrabook with Intel Core Ultra 7, 32GB LPDDR5X, 14" 2.8K OLED display, up to 15 hours battery, military-grade durability and 4G LTE.', price: '1799', stock: '20', brand: 'Lenovo', imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Intel Core Ultra 7 165U (12 cores, up to 4.9GHz)', 'Display': '14-inch 2.8K OLED, 2880x1800, 120Hz, 400 nits, DCI-P3 100%', 'RAM': '32GB LPDDR5X 6400MHz (soldered)', 'Storage': '1TB PCIe 4.0 NVMe SSD', 'Battery': '57Wh, up to 15 hours, Rapid Charge (80% in 1hr)', 'LTE': '4G LTE optional (nano-SIM + eSIM)', 'Durability': 'MIL-STD-810H, 12 tests', 'Security': 'ThinkShield, Fingerprint Reader, IR Camera (Windows Hello), dTPM 2.0', 'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, headphone jack', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Dimensions': '315.6 x 222.5 x 14.9mm, 1.12kg', 'OS': 'Windows 11 Pro' } },
  },
  {
    id: 'laptop_hp_spectre',
    label: 'Computers & Tablets - HP Spectre x360 14',
    data: { name: 'HP Spectre x360 14 2-in-1 (Intel Evo, 16GB, 512GB) - Nightfall Black', description: "HP's most premium convertible laptop. Intel Core Ultra 7, 13.5\" 3K2K OLED touch display, 360 degree hinge, HP Rechargeable MPP2.0 Tilt Pen included.", price: '1599', stock: '22', brand: 'HP', imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Intel Core Ultra 7 155H (Intel Evo certified)', 'Display': '13.5-inch 3K2K OLED Touch, 2880x1920, 120Hz, 400 nits, HP Eye Ease', 'RAM': '16GB LPDDR5x', 'Storage': '512GB PCIe 4.0 SSD', 'Battery': '64Wh, up to 17 hours, 65W USB-C fast charge', 'Form Factor': '360 degree convertible (laptop, tent, stand, tablet)', 'Pen': 'HP Rechargeable MPP2.0 Tilt Pen included', 'Webcam': '9MP auto-focus with physical privacy shutter, IR camera', 'Ports': '2x Thunderbolt 4, USB-A 3.2, microSD, headphone jack', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Dimensions': '306 x 220 x 17.3mm, 1.39kg', 'OS': 'Windows 11 Home' } },
  },
  {
    id: 'laptop_razer_blade',
    label: 'Computers & Tablets - Razer Blade 15 Gaming Laptop',
    data: { name: 'Razer Blade 15 (Intel Core i9, RTX 4080, 32GB, 1TB)', description: 'Premium gaming laptop with 15.6" QHD 240Hz display, Intel Core i9-13950HX, NVIDIA GeForce RTX 4080, 32GB DDR5 and 1TB PCIe 5.0 SSD.', price: '3299', stock: '12', brand: 'Razer', imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Processor': 'Intel Core i9-13950HX (24 cores, up to 5.5GHz)', 'GPU': 'NVIDIA GeForce RTX 4080 12GB GDDR6', 'Display': '15.6-inch QHD 2560x1440, 240Hz, DCI-P3 100%, G-SYNC', 'RAM': '32GB DDR5 5600MHz', 'Storage': '1TB PCIe Gen 5 NVMe SSD', 'Battery': '80Wh, up to 6 hours (gaming)', 'Charging': '230W GaN USB-C', 'Build': 'CNC aluminium unibody, 0.67" thin', 'Cooling': 'Vapor chamber + dual fans + 5 heat pipes', 'Keyboard': 'Per-key Razer Chroma RGB', 'Webcam': '1080p 60fps IR camera', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Ports': '3x USB-A 3.2, USB-C 3.2, Thunderbolt 4, SD card, HDMI 2.1', 'Dimensions': '355 x 235 x 17mm, 2.01kg', 'OS': 'Windows 11 Home' } },
  },
  {
    id: 'desktop_imac',
    label: 'Computers & Tablets - iMac 24" M3',
    data: { name: 'Apple iMac 24-inch (M3, 8GB, 256GB) - Blue', description: 'All-in-one desktop with M3 chip, stunning 24" 4.5K Retina display, 1080p FaceTime camera, six-speaker sound system and Touch ID keyboard.', price: '1299', stock: '20', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'Apple M3 (8-core CPU, 10-core GPU)', 'Memory': '8GB unified memory', 'Storage': '256GB SSD', 'Display': '23.5-inch Retina 4.5K, 4480x2520, 218 ppi, P3 wide colour, True Tone, 500 nits', 'Camera': '12MP Centre Stage FaceTime camera', 'Audio': 'Six-speaker sound system with Spatial Audio, three-mic array', 'Ports': '2x Thunderbolt / USB 4, 2x USB 3, Headphone jack', 'Connectivity': 'Gigabit Ethernet (optional), Wi-Fi 6E, Bluetooth 5.3', 'Keyboard': 'Magic Keyboard with Touch ID (included)', 'Mouse': 'Magic Mouse (included)', 'Dimensions': '46.1 x 54.7 x 14.7cm, 4.46kg', 'OS': 'macOS Sonoma' } },
  },
  {
    id: 'desktop_mac_mini',
    label: 'Computers & Tablets - Mac mini M2',
    data: { name: 'Apple Mac mini (M2, 16GB, 512GB)', description: 'Incredibly capable, incredibly small. Mac mini with M2 chip, 16GB unified memory, 512GB SSD. Supports up to two displays including a 6K display.', price: '799', stock: '30', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'Apple M2 (8-core CPU, 10-core GPU)', 'Memory': '16GB unified memory', 'Storage': '512GB SSD', 'Ports': '2x Thunderbolt 4 / USB 4, 2x USB-A 3.0, HDMI 2.1, 3.5mm audio, Gigabit Ethernet', 'Display Support': 'Up to 2 displays: 6K Thunderbolt + 4K HDMI', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, Gigabit Ethernet', 'Dimensions': '197 x 197 x 35.6mm, 1.18kg', 'Power': '150W power adapter', 'OS': 'macOS Sonoma' } },
  },
  {
    id: 'desktop_gaming_pc',
    label: 'Computers & Tablets - Gaming Desktop PC',
    data: { name: 'Gaming Desktop PC (Intel Core i9, RTX 4090, 64GB, 2TB)', description: 'Ultimate gaming rig with Intel Core i9-14900K, NVIDIA GeForce RTX 4090 24GB, 64GB DDR5, 2TB NVMe SSD, 360mm AIO liquid cooler and RGB tempered glass case.', price: '3999', stock: '8', brand: 'Custom Build', imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Processor': 'Intel Core i9-14900K (24 cores, up to 6.0GHz)', 'GPU': 'NVIDIA GeForce RTX 4090 24GB GDDR6X', 'RAM': '64GB DDR5 6000MHz (2x 32GB)', 'Storage': '2TB PCIe Gen 4 NVMe SSD', 'Motherboard': 'ASUS ROG Maximus Z790 Hero', 'Cooling': '360mm AIO Liquid Cooler (ARGB)', 'Power Supply': '1000W 80+ Gold Modular', 'Case': 'Fractal Design Torrent RGB Tempered Glass', 'Connectivity': 'Wi-Fi 6E, BT 5.3, 2.5GbE LAN', 'USB Ports': '2x USB 3.2 Gen 2x2, 4x USB-A 3.2, USB-C front panel', 'OS': 'Windows 11 Home' } },
  },
  {
    id: 'tablet_ipad_pro',
    label: 'Computers & Tablets - iPad Pro 13" M4',
    data: { name: 'Apple iPad Pro 13-inch (M4, 256GB, Wi-Fi) - Space Black', description: 'iPad Pro with M4 chip, Ultra Retina XDR OLED display, thinnest Apple product ever at 5.1mm, Apple Pencil Pro and Magic Keyboard compatible.', price: '1299', stock: '30', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Chip': 'Apple M4 (9-core CPU, 10-core GPU, 38-core Neural Engine)', 'Display': '13-inch Ultra Retina XDR OLED (tandem OLED), 2752x2064, 264 ppi, 1000 nits sustained', 'Storage': '256GB', 'Rear Camera': '12MP Wide, 4K video', 'Front Camera': '12MP Ultra Wide with Centre Stage, landscape orientation', 'Apple Pencil': 'Apple Pencil Pro / Apple Pencil (USB-C)', 'Connector': 'USB-C (USB 4, up to 40Gbps), Thunderbolt / USB 4', 'Battery': 'Up to 10 hours, Wi-Fi model', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Thickness': '5.1mm', 'Weight': '582g', 'OS': 'iPadOS 17' } },
  },
  {
    id: 'tablet_ipad_air',
    label: 'Computers & Tablets - iPad Air 11" M2',
    data: { name: 'Apple iPad Air 11-inch (M2, 128GB, Wi-Fi) - Starlight', description: 'iPad Air with M2 chip, 11" Liquid Retina display, 12MP front camera with Centre Stage, Apple Pencil Pro and Magic Keyboard support.', price: '699', stock: '40', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1587903297082-ec6f1aaef35e?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'Apple M2 (8-core CPU, 9-core GPU)', 'Display': '11-inch Liquid Retina, 2360x1640, 264 ppi, P3 wide colour, True Tone', 'Storage': '128GB', 'Rear Camera': '12MP Wide, 4K video', 'Front Camera': '12MP Ultra Wide with Centre Stage, landscape orientation', 'Apple Pencil': 'Apple Pencil Pro / Apple Pencil (USB-C)', 'Connector': 'USB-C (USB 3, up to 10Gbps)', 'Battery': 'Up to 10 hours', 'Touch ID': 'Top button', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3', 'Weight': '462g', 'OS': 'iPadOS 17' } },
  },
  {
    id: 'tablet_samsung_tab',
    label: 'Computers & Tablets - Samsung Galaxy Tab S9 Ultra',
    data: { name: 'Samsung Galaxy Tab S9 Ultra 256GB - Graphite', description: 'Galaxy Tab S9 Ultra with 14.6" Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included, IP68 water resistance and 11200mAh battery.', price: '1149', stock: '25', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Processor': 'Snapdragon 8 Gen 2 for Galaxy (4nm)', 'Display': '14.6-inch Dynamic AMOLED 2X, 2960x1848, 240Hz, 930 nits peak', 'RAM': '12GB', 'Storage': '256GB, microSD expandable up to 1TB', 'S Pen': 'Included (2.8ms latency, IP68)', 'Cameras': '13MP + 8MP rear, dual 12MP front with Auto Framing', 'Battery': '11200mAh, 45W wired, 15W wireless', 'Water Resistance': 'IP68', 'Connectivity': 'Wi-Fi 6E, Bluetooth 5.3, USB-C 3.2', 'DeX Mode': 'Yes - desktop-like experience', 'Dimensions': '326.4 x 208.6 x 5.5mm, 732g', 'OS': 'Android 13, One UI 5.1' } },
  },

  // TV & HOME THEATRE
  {
    id: 'tv_samsung_oled_65',
    label: 'TV & Home Theatre - Samsung 65" S95C OLED 4K',
    data: { name: 'Samsung 65" Class S95C OLED 4K Smart TV (2023)', description: 'See the difference OLED makes. Pure blacks and over a billion shades of colour. Neural Quantum Processor 4K. Pantone validated colours. Samsung Gaming Hub built-in.', price: '2499', stock: '10', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Panel Type': 'QD-OLED (Quantum Dot OLED)', 'Resolution': '4K UHD (3840 x 2160)', 'Screen Size': '65 inches', 'Refresh Rate': '144Hz native', 'HDR': 'HDR10+, HDR10, HLG', 'Processor': 'Neural Quantum Processor 4K', 'Audio': '60W 4.2.2ch, Dolby Atmos, Object Tracking Sound+', 'HDMI': '4x HDMI 2.1 (48Gbps)', 'Gaming': 'Gaming Hub, AMD FreeSync Premium Pro, NVIDIA G-Sync, VRR, ALLM, 144Hz', 'Smart TV': 'Tizen OS, Bixby, Alexa, Google Assistant', 'Dimensions (no stand)': '1444.4 x 829.6 x 26.3mm', 'Weight (no stand)': '23.1kg' } },
  },
  {
    id: 'tv_lg_oled_55',
    label: 'TV & Home Theatre - LG 55" C3 OLED 4K',
    data: { name: 'LG 55" C3 OLED evo 4K Smart TV (2023)', description: 'LG C3 OLED with a9 AI Processor Gen6, Dolby Vision IQ, Dolby Atmos, NVIDIA G-Sync compatible, AMD FreeSync Premium and four HDMI 2.1 ports. Perfect for gaming.', price: '1699', stock: '15', brand: 'LG', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Panel Type': 'OLED evo (self-lit pixels)', 'Resolution': '4K UHD (3840 x 2160)', 'Screen Size': '55 inches', 'Refresh Rate': '120Hz native', 'HDR': 'Dolby Vision IQ, HDR10, HLG', 'Processor': 'a9 Gen6 AI Processor 4K', 'Audio': '40W 2.2ch Dolby Atmos, AI Sound Pro', 'HDMI': '4x HDMI 2.1 (4K 120Hz, eARC on HDMI 2)', 'Gaming': 'G-Sync Compatible, AMD FreeSync Premium, VRR, ALLM, 0.1ms response', 'Smart TV': 'webOS 23, ThinQ AI, Google Assistant, Alexa', 'Dimensions (no stand)': '1224.5 x 706 x 46.9mm', 'Weight (no stand)': '17.3kg' } },
  },
  {
    id: 'tv_sony_bravia_75',
    label: 'TV & Home Theatre - Sony 75" Bravia XR A95L OLED',
    data: { name: 'Sony 75" Bravia XR A95L OLED 4K Google TV (2023)', description: "Sony's best TV. QD-OLED panel, Cognitive Processor XR, XR Triluminos Max, Acoustic Surface Audio+, and XR OLED Contrast Elite. Google TV with built-in Chromecast.", price: '3999', stock: '5', brand: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Panel Type': 'QD-OLED (Quantum Dot OLED)', 'Resolution': '4K UHD (3840 x 2160)', 'Screen Size': '75 inches', 'Processor': 'Cognitive Processor XR', 'HDR': 'Dolby Vision, HDR10, HLG, XR OLED Contrast Elite', 'Audio': 'Acoustic Surface Audio+ (TV screen IS the speaker), Dolby Atmos', 'HDMI': '2x HDMI 2.1 (4K 120Hz), 2x HDMI 2.0', 'Gaming': 'BRAVIA CORE, PS5 features (4K 120Hz, VRR, ALLM, Auto HDR Tone Mapping)', 'Smart TV': 'Google TV, built-in Chromecast, Apple AirPlay 2 & HomeKit', 'Dimensions (no stand)': '1666.8 x 961.1 x 68.5mm', 'Weight (no stand)': '42.6kg' } },
  },
  {
    id: 'tv_budget_43',
    label: 'TV & Home Theatre - Budget 43" 4K Smart TV',
    data: { name: 'Hisense 43" A6K 4K UHD Smart TV with Dolby Vision', description: 'Affordable 4K TV with Dolby Vision & HDR10+, Dolby Atmos sound, VIDAA Smart TV platform, voice control and multiple HDMI and USB ports.', price: '299', stock: '40', brand: 'Hisense', imageUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Panel Type': 'DLED with quantum dot colour', 'Resolution': '4K UHD (3840 x 2160)', 'Screen Size': '43 inches', 'Refresh Rate': '60Hz', 'HDR': 'Dolby Vision, HDR10, HDR10+, HLG', 'Audio': '2x 8W, Dolby Atmos', 'HDMI': '3x HDMI (1x ARC)', 'USB': '2x USB 2.0', 'Smart TV': 'VIDAA U6, Alexa built-in, voice control', 'Dimensions (no stand)': '963.7 x 558.8 x 68.1mm', 'Weight (no stand)': '6.6kg' } },
  },
  {
    id: 'soundbar_sony',
    label: 'TV & Home Theatre - Sony HT-A7000 Soundbar',
    data: { name: 'Sony HT-A7000 7.1.2ch Dolby Atmos Soundbar', description: 'Flagship soundbar with 7.1.2ch real surround sound, Dolby Atmos & DTS:X, 360 Spatial Sound Mapping, built-in subwoofer and dual built-in tweeters for upward-firing sound.', price: '899', stock: '20', brand: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Channels': '7.1.2ch', 'Total Power': '500W', 'Audio Formats': 'Dolby Atmos, DTS:X, 360 Spatial Sound Mapping', 'Subwoofer': 'Built-in (expandable with optional SA-SW3/SW5)', 'Surround': 'Expandable with optional SA-RS3S rear speakers', 'Connectivity': 'HDMI eARC, Optical, USB, Wi-Fi, Bluetooth 4.2, Chromecast, AirPlay 2', 'Voice': 'Alexa built-in, Google Assistant compatible', 'Dimensions': '1300 x 64 x 136mm', 'Weight': '7.2kg' } },
  },
  {
    id: 'projector_epson',
    label: 'TV & Home Theatre - Epson Home Cinema Projector',
    data: { name: 'Epson Home Cinema 5050UB 4K PRO-UHD 3LCD Projector', description: '4K PRO-UHD projector with HDR, 2600 lumens color and white brightness, 16:1 lens shift, motorized lens adjustment. Project up to 500" diagonal for an immersive cinema experience.', price: '2799', stock: '8', brand: 'Epson', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Technology': '3LCD with UltraBlack', 'Resolution': '4K PRO-UHD (1920 x 1080 x 4 shift)', 'Brightness': '2600 lumens colour / white', 'Contrast Ratio': '1,200,000:1', 'HDR': 'HDR10, HLG', 'Throw Ratio': '1.35-2.84:1', 'Lens Shift': 'Motorized +/-96.3% vertical, +/-47.1% horizontal', 'Image Size': '50-300 inches', 'Lamp Life': 'Up to 4000 hours (ECO mode)', 'Connectivity': '2x HDMI 2.0 (1x MHL), USB-A, RS-232C, 12V Trigger', 'Dimensions': '520 x 458 x 203mm, 11.8kg' } },
  },

  // ELECTRONICS
  {
    id: 'audio_sony_wh1000xm5',
    label: 'Electronics - Sony WH-1000XM5 Headphones',
    data: { name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black', description: 'Industry-leading noise cancellation with 8 mics and 2 processors. 30-hour battery, multipoint connection, Speak-to-Chat, precise voice pickup and LDAC Hi-Res Audio.', price: '349', stock: '60', brand: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Driver': '30mm, dome type (CCAW voice coil)', 'Frequency Response': '4-40,000Hz (LDAC)', 'ANC': 'Dual Noise Sensor (8 microphones, 2 processors)', 'Listening Time': 'Up to 30hrs (NC on), 40hrs (NC off)', 'Charging': 'USB-C, 3 hours full charge, 3min quick charge = 3hrs', 'Codec Support': 'SBC, AAC, LDAC (Hi-Res Audio Wireless)', 'Multipoint': 'Yes - connect 2 devices simultaneously', 'Features': 'Speak-to-Chat, Touch controls, Adaptive Sound Control, Wear detection', 'Foldable': 'Yes', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.2, 3.5mm audio cable (included)' } },
  },
  {
    id: 'audio_airpods_pro',
    label: 'Electronics - Apple AirPods Pro (2nd Gen)',
    data: { name: 'Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)', description: 'AirPods Pro with H2 chip, Active Noise Cancellation, Adaptive Audio, Personalised Spatial Audio, 6 hours listening time, and MagSafe Charging Case with USB-C.', price: '249', stock: '75', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'Apple H2', 'ANC': 'Active Noise Cancellation (ANC)', 'Transparency': 'Adaptive Transparency with Conversation Awareness', 'Spatial Audio': 'Personalised Spatial Audio with dynamic head tracking', 'Listening Time': 'Up to 6hrs (ANC on), 30hrs with case', 'Charging': 'MagSafe (USB-C), Lightning, Qi wireless, Apple Watch charger', 'Water Resistance': 'IPX4 (buds and case)', 'Controls': 'Adaptive Touch, Siri', 'Fit': 'Silicone ear tips (XS, S, M, L)', 'Find My': 'Precision Finding', 'Connectivity': 'Bluetooth 5.3' } },
  },
  {
    id: 'audio_bose_qc45',
    label: 'Electronics - Bose QuietComfort 45 Headphones',
    data: { name: 'Bose QuietComfort 45 Bluetooth Headphones - Triple Black', description: 'Bose QC45 with world-class noise cancellation, Aware Mode, 24-hour battery life, TriPort acoustic, multipoint connection and foldable design for travel.', price: '279', stock: '50', brand: 'Bose', imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'ANC': 'Bose QuietComfort active noise cancellation', 'Modes': 'Quiet Mode (ANC) + Aware Mode (transparency)', 'Listening Time': 'Up to 24 hours (ANC on)', 'Charging': 'USB-C, 15min quick charge = 3hrs', 'Multipoint': 'Yes - 2 devices', 'Codec': 'SBC, AAC', 'Acoustic': 'TriPort acoustic architecture', 'Foldable': 'Yes - flat fold for travel', 'Controls': 'Action button, voice assistant compatible', 'Weight': '238g', 'Connectivity': 'Bluetooth 5.1, 2.5mm audio cable' } },
  },
  {
    id: 'camera_sony_a7iv',
    label: 'Electronics - Sony Alpha A7 IV Mirrorless Camera',
    data: { name: 'Sony Alpha A7 IV Full-Frame Mirrorless Camera (Body Only)', description: 'Sony A7 IV with 33MP full-frame Exmor R BSI CMOS sensor, BIONZ XR processor, 5-axis in-body stabilisation, 4K 60p video, 759-point AF and dual card slots.', price: '2499', stock: '12', brand: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Sensor': '33MP full-frame Exmor R BSI CMOS', 'Processor': 'BIONZ XR', 'ISO Range': '100-51200 (expandable 50-204800)', 'Autofocus': '759-point phase-detect AF, Real-time Eye AF (human, animal, bird)', 'Stabilisation': '5.5-stop 5-axis in-body image stabilisation (IBIS)', 'Video': '4K 60p (Super35), 4K 30p (full frame), 10-bit 4:2:2 XAVC HS', 'Burst Rate': '10fps mechanical, 10fps electronic', 'Viewfinder': '3.68M-dot OLED EVF, 0.78x magnification', 'LCD': '3.0-inch 1.04M-dot vari-angle touchscreen', 'Card Slots': '2x (CFexpress Type A + SD / SD + SD)', 'Battery': 'NP-FZ100, up to 520 stills per charge', 'Connectivity': 'Wi-Fi, Bluetooth 5.0, USB-C 3.2 Gen2', 'Weight': '658g (with battery & card)' } },
  },
  {
    id: 'camera_gopro_hero12',
    label: 'Electronics - GoPro HERO12 Black Action Camera',
    data: { name: 'GoPro HERO12 Black Action Camera', description: 'GoPro HERO12 Black with 5.3K60 video, 27MP photos, HyperSmooth 6.0 stabilisation, Max Lens Mod 2.0 compatible, 70-minute waterproof to 10m, and Enduro battery.', price: '349', stock: '40', brand: 'GoPro', imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Video Resolution': '5.3K60 / 4K120 / 2.7K240 / 1080p240', 'Photo Resolution': '27MP', 'Stabilisation': 'HyperSmooth 6.0, Horizon Lock (360 degrees)', 'HDR Video': 'Yes, 5.3K30 and 4K30', 'Wireless': 'Wi-Fi, Bluetooth', 'Water Resistance': 'Up to 10m without housing', 'Battery': 'Enduro Battery, up to 70 min recording (5.3K30)', 'Display': 'Front LCD + rear 2.27-inch touch screen', 'Lens MODs': 'Max Lens Mod 2.0, Anamorphic Lens Mod (sold separately)', 'Connectivity': 'USB-C, microSD (up to 1TB)', 'Weight': '154g' } },
  },
  {
    id: 'smartwatch_apple',
    label: 'Electronics - Apple Watch Series 9',
    data: { name: 'Apple Watch Series 9 GPS 45mm - Midnight Aluminium with Midnight Sport Band', description: 'Apple Watch Series 9 with S9 SiP chip, Double Tap gesture, Precision Finding for iPhone, Always-On Retina display, Crash Detection and 18-hour battery.', price: '429', stock: '45', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'S9 SiP (double neural engine performance vs S8)', 'Display': '45mm Always-On Retina LTPO OLED, 2000 nits peak', 'New Features': 'Double Tap gesture, Precision Finding, on-device Siri', 'Health': 'ECG, Blood Oxygen (SpO2), Temperature Sensor, Crash Detection, Fall Detection', 'Fitness': 'GPS, Compass, Altimeter, Heart Rate, Sleep tracking', 'Battery': 'Up to 18 hours, 36 hours Low Power Mode', 'Charging': 'USB-C magnetic fast charging', 'Water Resistance': 'WR50m, swim-proof', 'Connectivity': 'Bluetooth 5.3, Wi-Fi, U1 Ultra Wideband', 'Case': '45mm recycled aluminium', 'Compatibility': 'Requires iPhone XS or later with iOS 17' } },
  },
  {
    id: 'smartwatch_samsung',
    label: 'Electronics - Samsung Galaxy Watch 6 Classic',
    data: { name: 'Samsung Galaxy Watch 6 Classic 47mm - Black', description: 'Galaxy Watch 6 Classic with rotating bezel, advanced health monitoring, BioActive Sensor, 40-hour battery, sleep tracking and Samsung Pay. Works with Android phones.', price: '349', stock: '50', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Display': '1.47-inch Super AMOLED, 480x480, sapphire crystal glass', 'Processor': 'Exynos W930 Dual-core 1.4GHz', 'RAM': '2GB', 'Storage': '16GB', 'Bezel': 'Physical rotating bezel', 'BioActive Sensor': 'Heart rate, ECG, Blood Oxygen, Skin Temperature, Body Composition', 'Battery': '425mAh, up to 40 hours (normal), 80 hours (power saving)', 'Charging': 'Wireless fast charging', 'Water Resistance': '5ATM + IP68, MIL-STD-810H', 'Connectivity': 'Bluetooth 5.3, Wi-Fi 802.11 b/g/n, NFC (Samsung Pay)', 'GPS': 'GPS, Glonass, Beidou, Galileo', 'Compatibility': 'Android 10.0 or later, min 1.5GB RAM' } },
  },

  // APPLIANCES
  {
    id: 'appliance_dyson_v15',
    label: 'Appliances - Dyson V15 Detect Cordless Vacuum',
    data: { name: 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner - Yellow/Nickel', description: "Dyson's most powerful cordless vacuum. Laser illumination detects invisible dust. Piezo sensor counts and sizes dust particles. Up to 60 minutes of run time and LCD screen.", price: '649', stock: '25', brand: 'Dyson', imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Motor': 'Dyson Hyperdymium - 125,000 RPM', 'Suction': '240 AW (max)', 'Run Time': 'Up to 60 minutes (Eco mode)', 'Filtration': 'Advanced whole-machine HEPA filtration, captures 99.99% of particles to 0.3 microns', 'Laser': 'Laser Slim Fluffy Cleaner Head - detects invisible dust', 'Piezo Sensor': 'Counts and sizes dust particles 15,000x per second, adjusts suction automatically', 'LCD Screen': 'Real-time particle count, battery life, performance mode', 'Bin Volume': '0.77L', 'Charging Time': '4.5 hours', 'Weight': '3.1kg', 'Accessories': 'Laser Slim Fluffy, High Torque, Digital Motorbar heads + 5 accessories' } },
  },
  {
    id: 'appliance_dyson_airwrap',
    label: 'Appliances - Dyson Airwrap Multi-Styler',
    data: { name: 'Dyson Airwrap Multi-Styler Complete Long - Nickel/Copper', description: 'Dyson Airwrap with Coanda airflow to style and dry at the same time. No extreme heat damage. Comes with a full set of attachments for curls, waves, smooth and blow-dry.', price: '499', stock: '35', brand: 'Dyson', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'Technology': 'Coanda airflow - uses air to attract and wrap hair', 'Heat Control': 'Intelligent heat control measures temp 40x per second - never exceeds 150C', 'Voltage': 'Auto-sensing 110-240V', 'Motor': 'Dyson digital motor V9 - 110,000 RPM', 'Airflow': '3 speed settings, Cool shot', 'Cable': '2.7m 360 degree rotating cable', 'Attachments': '40mm long barrel, 30mm long barrel, Soft Smoothing brush, Firm Smoothing brush, Pre-styling dryer, Round volumising brush, Flyaway attachment', 'Hair Types': 'All hair types and lengths', 'Weight (handle)': '1.3kg', 'Storage': 'Travel pouch included' } },
  },
  {
    id: 'appliance_nespresso',
    label: 'Appliances - Nespresso Vertuo Next Coffee Machine',
    data: { name: 'Nespresso Vertuo Next Coffee and Espresso Machine by Breville - Black', description: 'One-touch brewing with five cup sizes from single espresso to large mug. Unique centrifugal brewing Centrifusion technology. Includes 12 complimentary capsules.', price: '159', stock: '50', brand: 'Nespresso', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Brewing Technology': 'Centrifusion centrifugal brewing', 'Cup Sizes': 'Espresso (40ml), Double Espresso (80ml), Gran Lungo (150ml), Mug (230ml), Alto (414ml)', 'Capsule Reading': 'Barcode reader - auto-adjusts for each capsule', 'Water Tank': '1.1L (removable)', 'Capsule Container': '10 used capsules', 'Pump Pressure': '19 bar', 'Heat-up Time': '20-30 seconds', 'Wi-Fi': 'Yes - Nespresso app compatible', 'Connectivity': 'Bluetooth', 'Dimensions': '16.2 x 30.8 x 39.3cm', 'Weight': '3.7kg' } },
  },
  {
    id: 'appliance_samsung_washer',
    label: 'Appliances - Samsung AddWash Washing Machine',
    data: { name: 'Samsung 9kg AddWash Washing Machine - White', description: 'Samsung AddWash with EcoBubble technology for superior cleaning at 15C, AI Wash cycle, Steam wash, Wi-Fi connected and unique AddWash door to add forgotten items mid-cycle.', price: '549', stock: '15', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Capacity': '9kg', 'Spin Speed': '1400 RPM', 'Energy Rating': 'A', 'EcoBubble': 'Dissolves detergent in bubbles - penetrates fabrics 40x faster at 15C', 'AddWash': 'Add forgotten items via small door mid-cycle', 'AI Wash': 'Detects load weight and soil level, optimises wash settings', 'Steam Wash': 'Reduces creasing, allergens and bacteria', 'SmartThings': 'Wi-Fi connected, remote start/monitor via app', 'Programmes': '16 wash programmes', 'Dimensions': '600 x 600 x 850mm', 'Noise': '46dB wash / 73dB spin' } },
  },
  {
    id: 'appliance_instant_pot',
    label: 'Appliances - Instant Pot Duo 7-in-1',
    data: { name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Quart', description: 'Instant Pot Duo replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, saute pan, yoghurt maker and warmer. 13 one-touch programs.', price: '99', stock: '80', brand: 'Instant Pot', imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Capacity': '6 Quart (5.7L)', 'Functions': '7-in-1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Saute, Yoghurt Maker, Warmer', 'Programs': '13 one-touch smart programs', 'Pressure Settings': 'High & Low Pressure', 'Pressure Range': '10.2-11.6 PSI', 'Cooking Time Saving': 'Up to 70% vs traditional methods', 'Safety Features': '10 safety mechanisms including overheat protection', 'Pot Material': '304 stainless steel inner pot', 'Power': '1000W, 120V', 'Dimensions': '33 x 31.2 x 30.5cm', 'Weight': '5.2kg' } },
  },

  // VIDEO GAMES
  {
    id: 'games_ps5',
    label: 'Video Games - PlayStation 5 Console',
    data: { name: 'Sony PlayStation 5 Console (Disc Edition)', description: 'PS5 with ultra-high speed SSD, 4K gaming at up to 120fps, ray tracing, haptic feedback in DualSense controller, 3D Audio and backwards compatibility with PS4 games.', price: '479', stock: '20', brand: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80', isFeatured: true, specifications: { 'CPU': 'AMD Zen 2, 8 cores x 3.5GHz (variable)', 'GPU': 'AMD RDNA 2, 10.28 TFLOPS, 36 CUs x 2.23GHz (variable)', 'Memory': '16GB GDDR6, 448GB/s bandwidth', 'Storage': '825GB custom SSD (5.5GB/s read)', 'Storage Expandable': 'NVMe SSD slot (M.2)', 'Optical Drive': 'Ultra HD Blu-ray (100GB/disc)', 'Resolution': '720p, 1080i, 1080p, 1440p, 4K', 'Frame Rate': 'Up to 120fps', 'Ray Tracing': 'Hardware ray tracing', '3D Audio': 'Tempest 3D AudioTech', 'DualSense': 'Haptic feedback, adaptive triggers, built-in mic & speaker', 'Ports': 'USB-A 3.1, USB-C 3.1, USB-A 2.0 x 2, HDMI 2.1', 'Connectivity': 'Wi-Fi 6, Bluetooth 5.1, Ethernet', 'Dimensions': '390 x 104 x 260mm, 4.5kg' } },
  },
  {
    id: 'games_xbox_series_x',
    label: 'Video Games - Xbox Series X Console',
    data: { name: 'Microsoft Xbox Series X 1TB Console', description: 'Xbox Series X: the fastest, most powerful Xbox ever. 12 teraflops of GPU performance, 4K at 60fps (up to 120fps), DirectX raytracing, Quick Resume and Xbox Game Pass ready.', price: '449', stock: '25', brand: 'Microsoft', imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'CPU': 'AMD Zen 2, 8 cores x 3.8GHz (3.6GHz with SMT)', 'GPU': '12 TFLOPS, 52 CUs x 1.825GHz RDNA 2', 'Memory': '16GB GDDR6', 'Storage': '1TB Custom NVMe SSD', 'Optical Drive': '4K UHD Blu-ray', 'Resolution': 'Up to 4K (native), 8K capable', 'Frame Rate': 'Up to 120fps', 'Ray Tracing': 'DirectX Raytracing', 'Quick Resume': 'Multiple games simultaneously', 'Backwards Compatibility': 'Xbox, Xbox 360, Xbox One', 'Ports': '3x USB-A 3.1 (2 rear, 1 front), HDMI 2.1, Storage Expansion slot', 'Connectivity': 'Wi-Fi 5 (802.11ac), Bluetooth 5.0, Gigabit Ethernet', 'Dimensions': '151 x 151 x 301mm, 4.45kg' } },
  },
  {
    id: 'games_nintendo_switch',
    label: 'Video Games - Nintendo Switch OLED',
    data: { name: 'Nintendo Switch OLED Model - White', description: 'Nintendo Switch OLED with vibrant 7-inch OLED screen, wide adjustable stand, 64GB internal storage, enhanced audio and a dock with wired LAN port. Play at home or on the go.', price: '309', stock: '40', brand: 'Nintendo', imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Screen': '7-inch OLED touchscreen', 'Resolution': '1280 x 720 (handheld), up to 1920 x 1080 (docked)', 'CPU/GPU': 'NVIDIA Custom Tegra', 'RAM': '4GB', 'Storage': '64GB internal, microSD expandable', 'Battery': '4310mAh, 4.5-9hrs play', 'Stand': 'Wide adjustable kickstand', 'Dock': 'Wired LAN port included', 'Audio': 'Stereo speakers with enhanced audio', 'Modes': 'TV mode, Tabletop mode, Handheld mode', 'Connectivity': 'Wi-Fi (802.11 a/b/g/n/ac), Bluetooth 4.1', 'Dimensions (handheld)': '242 x 102 x 13.9mm, 320g' } },
  },
  {
    id: 'games_gaming_headset',
    label: 'Video Games - SteelSeries Arctis Nova Pro Wireless',
    data: { name: 'SteelSeries Arctis Nova Pro Wireless Gaming Headset (PC & PlayStation)', description: 'SteelSeries Arctis Nova Pro Wireless with dual-wireless technology, active noise cancellation, hot-swappable battery system, hi-fi audio drivers and comfortable steel/aluminium frame.', price: '349', stock: '30', brand: 'SteelSeries', imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Drivers': '40mm, Neodymium, 10-40,000Hz', 'Wireless': '2.4GHz low-latency + Bluetooth 5.0 (simultaneous dual-wireless)', 'ANC': 'Active Noise Cancellation (ANC) with ClearCast Gen2 mic', 'Battery': 'Hot-swap battery system - infinite play time', 'Base Station': 'Included - charge second battery while gaming', 'Microphone': 'Retractable ClearCast Gen2, bidirectional, Discord-certified', 'Compatibility': 'PC, PlayStation (USB), Bluetooth multipoint (phone/tablet)', 'Audio': 'Hi-Fi audio with Parametric EQ, Sonar software', 'Frame': 'Ski goggle suspension band, steel + aluminium', 'Weight': '338g' } },
  },
  {
    id: 'games_gaming_chair',
    label: 'Video Games - Secretlab Titan Evo Gaming Chair',
    data: { name: 'Secretlab TITAN Evo 2022 Gaming Chair - SoftWeave Fabric (Regular)', description: "The world's most awarded gaming chair. Cold-cure foam, 4-way neck and lumbar support, full-length recline, magnetic memory foam head pillow and pebble seat base.", price: '419', stock: '15', brand: 'Secretlab', imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Foam': 'Cold-cure foam (denser, more durable than standard)', 'Lumbar Support': '4-way L-ADAPT lumbar system (externally adjustable)', 'Neck Pillow': 'Magnetic memory foam head pillow', 'Recline': 'Full-length metal recline up to 165 degrees', 'Seat Base': 'Pebble seat base - reduces pressure on thighs', 'Armrests': '4D Cloud Armrests (height, width, angle, forward/backward)', 'Upholstery': 'Secretlab SoftWeave Plus fabric', 'Weight Capacity': 'Up to 130kg', 'Recommended Height': '157-189cm (Regular)', 'Base': 'Aluminium 5-star base with PU casters', 'Certifications': 'BIFMA certified' } },
  },

  // SMART HOME
  {
    id: 'smarthome_echo_show',
    label: 'Smart Home - Amazon Echo Show 10',
    data: { name: 'Amazon Echo Show 10 (3rd Gen) - Charcoal', description: 'Smart display with 10.1" HD screen that automatically moves to face you. Built-in Zigbee hub, 13MP camera with auto-framing, motion-activated display and Alexa built-in.', price: '239', stock: '45', brand: 'Amazon', imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Display': '10.1-inch 1280x800 HD touch screen', 'Motion': 'Motorised base rotates 350 degrees to face you', 'Camera': '13MP wide-angle with auto-framing and pan/tilt', 'Camera Privacy': 'Physical shutter, built-in mic off button', 'Audio': '2.1 stereo speaker system with neodymium woofer', 'Smart Home Hub': 'Built-in Zigbee, Sidewalk bridge, Matter, Thread', 'Alexa': 'Built-in Alexa voice assistant', 'Video Calls': 'Duo, Alexa calling & messaging', 'Connectivity': 'Dual-band Wi-Fi (2.4GHz + 5GHz), Bluetooth 5.0', 'USB Port': 'USB-A (for charging devices)', 'Dimensions': '251 x 230 x 172mm', 'Weight': '2.49kg' } },
  },
  {
    id: 'smarthome_ring_doorbell',
    label: 'Smart Home - Ring Video Doorbell Pro 2',
    data: { name: 'Ring Video Doorbell Pro 2 with Head-to-Toe HD+ Video', description: "Ring Doorbell Pro 2 with 1536p HD+ head-to-toe video, 3D motion detection, radar-based Bird's Eye View, real-time smart alerts, two-way talk and hardwired installation.", price: '199', stock: '55', brand: 'Ring', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Video': '1536p HD+ (head-to-toe), HDR, Colour Night Vision', 'Field of View': '150 x 150 degree head-to-toe', 'Motion Detection': '3D motion detection with radar, Bird Eye View (aerial view of motion path)', 'Audio': 'Advanced noise cancellation, Two-way talk with dynamic volume', 'Power': 'Hardwired (8-24V AC)', 'Alerts': 'Real-time notifications with Smart Alerts (person, package, motion zones)', 'Alexa': 'Works with Alexa - show video on Echo devices', 'Privacy': 'Customisable Privacy Zones, Motion Schedules', 'Connectivity': 'Dual-band Wi-Fi (2.4GHz + 5GHz)', 'Operating Temp': '-20C to 50C', 'Subscription': 'Ring Protect Plan required for video history' } },
  },
  {
    id: 'smarthome_philips_hue',
    label: 'Smart Home - Philips Hue White & Colour Starter Kit',
    data: { name: 'Philips Hue White & Colour Ambiance Starter Kit E27 (3 Bulbs + Bridge)', description: 'Smart lighting starter kit including 3 E27 colour bulbs and Hue Bridge. 16 million colours, thousands of whites, works with Alexa, Google and Apple HomeKit. Schedule, automate and control.', price: '129', stock: '70', brand: 'Philips', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Bulb Type': 'E27 (Edison Screw)', 'Colours': '16 million colours + 2000-6500K white ambiance', 'Brightness': 'Up to 1100 lumens (75W equivalent)', 'Energy Saving': '8.5W per bulb (vs 75W incandescent)', 'Lifespan': '25,000 hours', 'Hub': 'Hue Bridge - up to 50 bulbs, 12 accessories', 'Connectivity': 'Zigbee 3.0 (bulbs to Bridge), Ethernet (Bridge to router)', 'Voice Control': 'Alexa, Google Assistant, Apple Siri / HomeKit', 'App': 'Philips Hue app (iOS & Android)', 'Scenes': 'Schedules, routines, Sunrise/Sunset sync, Entertainment sync', 'Third-party': 'Works with IFTTT, SmartThings, Razer Chroma' } },
  },
  {
    id: 'smarthome_nest_thermostat',
    label: 'Smart Home - Google Nest Learning Thermostat',
    data: { name: 'Google Nest Learning Thermostat (4th Generation) - Stainless Steel', description: 'Google Nest Thermostat learns your schedule, programs itself and saves energy. Senses occupancy, adjusts temperature automatically. Works with Alexa and Google Assistant.', price: '219', stock: '40', brand: 'Google', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Display': '3.2-inch circular colour Farsight display (activates when you walk in the room)', 'Learning': 'Auto-schedules based on your habits (programs itself in ~1 week)', 'Sensing': 'Farsight sensor, occupancy detection, humidity sensor', 'Energy History': 'Home Report - monthly energy usage breakdown', 'Savings': 'Average 10-12% heating savings, 15% cooling savings (Nest study)', 'Compatibility': 'Works with 95% of 24V heating and cooling systems', 'Voice Control': 'Google Assistant built-in, Alexa compatible', 'Connectivity': 'Wi-Fi (2.4GHz), Bluetooth, Thread', 'Dimensions': '97mm diameter x 33.2mm', 'Certifications': 'Energy Star certified' } },
  },
  {
    id: 'smarthome_robot_vacuum',
    label: 'Smart Home - iRobot Roomba Combo j7+',
    data: { name: 'iRobot Roomba Combo j7+ Self-Emptying Robot Vacuum & Mop', description: 'Roomba Combo j7+ learns your home, avoids obstacles (including pet waste), vacuums and mops, self-empties for 60 days, works with Alexa & Google Assistant.', price: '799', stock: '18', brand: 'iRobot', imageUrl: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Navigation': 'PrecisionVision Navigation - avoids obstacles (pet waste, cables, shoes)', 'Suction': '4-stage cleaning system, 10x suction power', 'Mopping': 'Retractable mop pad - lifts pad to avoid carpets automatically', 'Self-Empty': 'Clean Base Automatic Dirt Disposal - holds 60 days of debris', 'Mapping': 'iRobot Genius - learns home layout, customisable zone cleaning', 'Battery': 'Up to 75 min run time, auto-recharge and resume', 'Smart Features': 'Clean by room, scheduled cleaning, Keep Out Zones', 'Voice Control': 'Alexa, Google Assistant, Siri Shortcuts', 'Connectivity': 'Wi-Fi (2.4GHz), Bluetooth', 'App': 'iRobot app (iOS & Android)', 'Dimensions': '33.9 x 33.9 x 8.8cm (robot), 30.5 x 30.5 x 49.5cm (base)' } },
  },

  // CLEARANCE
  {
    id: 'clearance_iphone13',
    label: 'Clearance - iPhone 13 (Refurbished)',
    data: { name: 'Apple iPhone 13 128GB - Starlight (Refurbished Grade A)', description: 'Certified refurbished iPhone 13 with new battery and 12-month warranty. Dual 12MP camera system, A15 Bionic chip, Ceramic Shield front, 5G capable. Excellent condition.', price: '379', stock: '30', brand: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Chip': 'A15 Bionic (6-core CPU, 4-core GPU)', 'Display': '6.1-inch Super Retina XDR OLED, 2532x1170, 460 ppi', 'Storage': '128GB', 'Rear Cameras': 'Dual 12MP (Wide f/1.6 + Ultra Wide f/2.4), sensor-shift OIS', 'Front Camera': '12MP TrueDepth (f/2.2)', 'Video': '4K Dolby Vision up to 60fps, Cinematic mode 1080p 30fps', 'Battery': 'New battery (refurbished), up to 19 hours video playback', 'Water Resistance': 'IP68 (6m, 30 min)', 'Condition': 'Grade A Refurbished - no visible scratches, full functionality', 'Warranty': '12 months', 'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.0, NFC' } },
  },
  {
    id: 'clearance_samsung_tv',
    label: 'Clearance - Samsung 50" 4K TV (Ex-Display)',
    data: { name: 'Samsung 50" Crystal 4K UHD Smart TV - Ex-Display (2022)', description: 'Ex-display Samsung 50" Crystal UHD TV with 4K resolution, HDR, PurColor, Object Tracking Sound Lite and Samsung Smart TV with built-in streaming apps. Minor cosmetic marks only.', price: '299', stock: '5', brand: 'Samsung', imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80', isFeatured: false, specifications: { 'Display': '50-inch Crystal UHD 4K (3840 x 2160)', 'PurColor': 'Yes - wider colour spectrum', 'HDR': 'HDR10+', 'Processor': 'Crystal Processor 4K', 'Audio': '20W, Dolby Digital Plus, Object Tracking Sound Lite', 'HDMI': '2x HDMI, 1x HDMI ARC', 'USB': '1x USB 2.0', 'Smart TV': 'Tizen, Samsung TV Plus, built-in streaming', 'Condition': 'Ex-display - minor cosmetic marks, fully functional, original box may differ', 'Warranty': '6 months retailer warranty' } },
  },
];

// Maps product name keywords to brand name
const BRAND_DETECTION_RULES: { keywords: string[]; brand: string }[] = [
  { keywords: ['iphone', 'ipad', 'macbook', 'imac', 'mac mini', 'mac pro', 'airpods', 'apple watch'], brand: 'Apple' },
  { keywords: ['samsung galaxy', 'samsung'], brand: 'Samsung' },
  { keywords: ['sony wh', 'sony xperia', 'sony'], brand: 'Sony' },
  { keywords: ['dell xps', 'dell inspiron', 'dell', 'alienware'], brand: 'Dell' },
  { keywords: ['hp spectre', 'hp envy', 'hp pavilion', 'hp'], brand: 'HP' },
  { keywords: ['lenovo thinkpad', 'lenovo ideapad', 'lenovo legion', 'lenovo'], brand: 'Lenovo' },
  { keywords: ['asus rog', 'asus zenbook', 'asus vivobook', 'asus'], brand: 'Asus' },
  { keywords: ['acer predator', 'acer swift', 'acer aspire', 'acer'], brand: 'Acer' },
  { keywords: ['microsoft surface', 'surface pro', 'surface laptop', 'microsoft'], brand: 'Microsoft' },
  { keywords: ['google pixel', 'pixel 8', 'pixel 7', 'pixel 6', 'google'], brand: 'Google' },
  { keywords: ['oneplus'], brand: 'OnePlus' },
  { keywords: ['xiaomi', 'redmi'], brand: 'Xiaomi' },
  { keywords: ['lg gram', 'lg'], brand: 'LG' },
  { keywords: ['huawei'], brand: 'Huawei' },
  { keywords: ['razer blade', 'razer'], brand: 'Razer' },
  { keywords: ['msi'], brand: 'MSI' },
  { keywords: ['oppo'], brand: 'Oppo' },
  { keywords: ['nokia'], brand: 'Nokia' },
  { keywords: ['motorola', 'moto g', 'moto e'], brand: 'Motorola' },
];

// Maps product name keywords to category slug
const CATEGORY_DETECTION_RULES: { keywords: string[]; slug: string }[] = [
  { keywords: ['iphone', 'galaxy s', 'galaxy a', 'pixel', 'oneplus', 'xiaomi', 'smartphone', 'phone', 'xperia', 'moto g', 'redmi', 'oppo', 'nokia', 'huawei'], slug: 'cell-phones' },
  { keywords: ['macbook', 'xps', 'thinkpad', 'spectre', 'zenbook', 'razer blade', 'surface laptop', 'laptop', 'notebook', 'ipad', 'galaxy tab', 'surface pro', 'tab s', 'kindle', 'tablet'], slug: 'computers-tablets' },
  { keywords: ['desktop', 'imac', 'mac mini', 'mac pro', 'gaming pc', 'gaming desktop', 'tower', 'workstation', 'computer', 'pc'], slug: 'computers-tablets' },
  { keywords: ['airpods', 'earpods', 'buds', 'headphones', 'earphones', 'wh-1000', 'headset', 'earbuds', 'speaker', 'soundbar', 'camera', 'dslr', 'mirrorless', 'gopro'], slug: 'electronics' },
  { keywords: ['tv', 'television', 'oled tv', 'qled', 'projector', 'home theatre', 'home theater'], slug: 'tv-home-theatre' },
  { keywords: ['washing machine', 'fridge', 'freezer', 'microwave', 'oven', 'dishwasher', 'vacuum', 'dyson', 'coffee maker', 'blender', 'toaster', 'kettle', 'appliance'], slug: 'appliances' },
  { keywords: ['playstation', 'ps5', 'ps4', 'xbox', 'nintendo', 'switch', 'game controller', 'gaming headset', 'video game'], slug: 'video-games' },
  { keywords: ['smart home', 'alexa', 'echo', 'nest', 'ring doorbell', 'smart light', 'smart bulb', 'smart plug', 'hue', 'google home'], slug: 'smart-home' },
];

function detectBrand(name: string): string {
  const lower = name.toLowerCase();
  for (const rule of BRAND_DETECTION_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule.brand;
  }
  return '';
}

function detectCategorySlugs(name: string): string[] {
  const lower = name.toLowerCase();
  const slugs: string[] = [];
  for (const rule of CATEGORY_DETECTION_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) {
      if (!slugs.includes(rule.slug)) slugs.push(rule.slug);
      break; // only one primary category auto-detected
    }
  }
  return slugs;
}

const PRODUCT_NAME_SUGGESTIONS = [
  'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14',
  'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24+', 'Samsung Galaxy S24', 'Samsung Galaxy A55',
  'MacBook Pro 16-inch (M3 Max)', 'MacBook Pro 14-inch (M3)', 'MacBook Air 15-inch (M3)', 'MacBook Air 13-inch (M3)',
  'Dell XPS 15', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad X1 Carbon',
  'iPad Pro 12.9-inch', 'iPad Air 11-inch', 'iPad mini', 'Samsung Galaxy Tab S9 Ultra',
  'Sony WH-1000XM5', 'AirPods Pro (2nd Gen)', 'Samsung Galaxy Buds2 Pro',
  'Gaming Desktop PC', 'iMac 24-inch', 'Mac mini (M2)',
];

interface FormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  brand: string;
  selectedCategories: string[];
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  condition: 'new' | 'used';
  isFeatured: boolean;
  specifications: Record<string, string>;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [autoBrand, setAutoBrand] = useState(false);
  const [autoCategory, setAutoCategory] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    selectedCategories: [],
    imageUrl: '',
    imageUrl2: '',
    imageUrl3: '',
    condition: 'new',
    isFeatured: false,
    specifications: {},
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCats();
  }, []);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);
    if (!templateId) return;

    const template = PRODUCT_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const detectedSlugs = detectCategorySlugs(template.data.name);
    const matchedIds = categories
      .filter(c => detectedSlugs.includes(c.slug))
      .map(c => c._id);

    setFormData({
      name: template.data.name,
      slug: template.data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: template.data.description,
      price: template.data.price,
      stock: template.data.stock,
      brand: template.data.brand,
      imageUrl: template.data.imageUrl,
      imageUrl2: '',
      imageUrl3: '',
      isFeatured: template.data.isFeatured,
      selectedCategories: matchedIds,
      condition: 'new',
      specifications: (template.data as any).specifications ?? {},
    });
    setAutoBrand(true);
    setAutoCategory(matchedIds.length > 0);
    setError('');
  };

  const updateField = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (id: string) => {
    setAutoCategory(false);
    setFormData(prev => {
      const already = prev.selectedCategories.includes(id);
      return {
        ...prev,
        selectedCategories: already
          ? prev.selectedCategories.filter(c => c !== id)
          : [...prev.selectedCategories, id],
      };
    });
  };

  const addSpec = () => {
    setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, '': '' } }));
  };

  const updateSpec = (oldKey: string, newKey: string, value: string) => {
    setFormData(prev => {
      const updated: Record<string, string> = {};
      Object.entries(prev.specifications).forEach(([k, v]) => {
        if (k === oldKey) updated[newKey] = value;
        else updated[k] = v;
      });
      return { ...prev, specifications: updated };
    });
  };

  const removeSpec = (key: string) => {
    setFormData(prev => {
      const updated = { ...prev.specifications };
      delete updated[key];
      return { ...prev, specifications: updated };
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const detectedBrand = detectBrand(val);
    const newBrand = detectedBrand || formData.brand;
    setAutoBrand(!!detectedBrand);

    const detectedSlugs = detectCategorySlugs(val);
    let newSelected = formData.selectedCategories;
    let detectedCat = false;
    if (detectedSlugs.length > 0 && categories.length > 0) {
      const matchedIds = categories
        .filter(c => detectedSlugs.includes(c.slug))
        .map(c => c._id);
      if (matchedIds.length > 0) {
        const clearanceCat = categories.find(c => c.slug === 'clearance');
        const hadClearance = clearanceCat && newSelected.includes(clearanceCat._id);
        newSelected = hadClearance ? [...matchedIds, clearanceCat!._id] : matchedIds;
        detectedCat = true;
      }
    }
    setAutoCategory(detectedCat);

    setFormData(prev => ({ ...prev, name: val, slug, brand: newBrand, selectedCategories: newSelected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) { setError('Product name is required.'); return; }
    if (!formData.price || isNaN(Number(formData.price))) { setError('A valid price is required.'); return; }
    if (!formData.stock || isNaN(Number(formData.stock))) { setError('A valid stock count is required.'); return; }
    if (!formData.brand.trim()) { setError('Brand is required.'); return; }
    if (!formData.description.trim()) { setError('Description is required.'); return; }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name.trim(),
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        brand: formData.brand.trim(),
        isFeatured: formData.isFeatured,
        images: [formData.imageUrl, formData.imageUrl2, formData.imageUrl3]
          .map(url => url?.trim())
          .filter(Boolean).length > 0 
            ? [formData.imageUrl, formData.imageUrl2, formData.imageUrl3].map(url => url?.trim()).filter(Boolean)
            : ['https://images.unsplash.com/photo-1526733170373-be78f0f2e8f1?auto=format&fit=crop&q=80&w=800'],
        categories: formData.selectedCategories,
        category: formData.selectedCategories[0] ?? null,
        condition: formData.condition,
        specifications: formData.specifications,
      };

      const res = await fetch('/api/products/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Product created successfully! Redirecting...');
        setTimeout(() => router.push('/admin/products'), 1200);
      } else {
        setError(data.message || 'Failed to create product. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error - please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0046be] focus:border-transparent outline-none transition-all';

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">New Product</h1>
            <p className="text-sm text-gray-500 font-medium">Add a new item to your storefront catalog.</p>
          </div>
          <Link
            href="/admin/products"
            className="bg-white border text-gray-600 px-6 py-3 rounded-lg font-black text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
          >
            <X size={18} /> Cancel
          </Link>
        </div>

        {/* Error / Success Banners */}
        {error && (
          <div className="max-w-4xl mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium text-sm">
            <AlertCircle size={18} className="flex-shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="max-w-4xl mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl font-medium text-sm">
            <CheckCircle size={18} className="flex-shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 max-w-4xl">

          {/* Quick-Fill Template */}
          <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <label className="block text-sm font-black text-[#0046be] mb-2 uppercase tracking-widest">
              Quick-Fill Template
            </label>
            <select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0046be] outline-none font-semibold text-gray-700 shadow-sm transition-all"
            >
              <option value="">-- Select a product category to auto-fill the form --</option>
              {PRODUCT_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-blue-500 font-medium">
              Selecting a template auto-fills product name, description, brand, price, stock and image. You can edit any field afterwards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">

              {/* Product Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  list="product-name-suggestions"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. iPhone 15 Pro Max"
                  autoComplete="off"
                  className={inputClass}
                />
                <datalist id="product-name-suggestions">
                  {PRODUCT_NAME_SUGGESTIONS.map(name => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => updateField('slug', e.target.value)}
                  className={`${inputClass} font-mono text-gray-500`}
                />
                <p className="mt-1 text-xs text-gray-400">Auto-generated from product name.</p>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                  Brand <span className="text-red-400">*</span>
                  {autoBrand && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full normal-case tracking-normal">
                      Auto-detected
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  list="brand-suggestions"
                  value={formData.brand}
                  onChange={e => { updateField('brand', e.target.value); setAutoBrand(false); }}
                  placeholder="e.g. Apple, Samsung, Sony"
                  autoComplete="off"
                  className={inputClass}
                />
                <datalist id="brand-suggestions">
                  <option value="Apple" />
                  <option value="Samsung" />
                  <option value="Sony" />
                  <option value="Dell" />
                  <option value="HP" />
                  <option value="Lenovo" />
                  <option value="Asus" />
                  <option value="Acer" />
                  <option value="Microsoft" />
                  <option value="Google" />
                  <option value="OnePlus" />
                  <option value="Xiaomi" />
                </datalist>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="Tell customers about this product..."
                  className={inputClass}
                />
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400">
                    Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpec}
                    className="text-xs font-bold text-[#0046be] border border-[#0046be] px-3 py-1 rounded-lg hover:bg-[#0046be] hover:text-white transition-all"
                  >
                    + Add Row
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(formData.specifications).map(([key, value], i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={key}
                        onChange={e => updateSpec(key, e.target.value, value)}
                        placeholder="e.g. Display"
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 font-bold focus:bg-white focus:ring-2 focus:ring-[#0046be] outline-none"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={e => updateSpec(key, key, e.target.value)}
                        placeholder="e.g. 6.1-inch Super Retina XDR"
                        className="flex-[2] px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0046be] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(key)}
                        className="text-gray-300 hover:text-red-500 text-lg font-bold transition-colors px-1"
                      >
                        x
                      </button>
                    </div>
                  ))}
                  {Object.keys(formData.specifications).length === 0 && (
                    <p className="text-xs text-gray-400 italic">No specifications yet. Click &quot;+ Add Row&quot; or select a template to auto-fill.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Price (£) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e => updateField('price', e.target.value)}
                    placeholder="0.00"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Stock <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={e => updateField('stock', e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                  Categories
                  {autoCategory && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full normal-case tracking-normal">
                      Auto-detected
                    </span>
                  )}
                </label>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {categories.filter(c => c.slug !== 'clearance').map(c => {
                    const checked = formData.selectedCategories.includes(c._id);
                    const ICONS: Record<string, string> = {
                      'electronics': '⚡',
                      'computers-tablets': '💻',
                      'appliances': '🏠',
                      'tv-home-theatre': '📺',
                      'video-games': '🎮',
                      'cell-phones': '📱',
                      'smart-home': '🌐',
                    };
                    return (
                      <button
                        key={c._id}
                        type="button"
                        onClick={() => toggleCategory(c._id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-semibold text-left transition-all ${
                          checked
                            ? 'bg-[#0046be] text-white border-[#0046be] shadow-md'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0046be] hover:text-[#0046be]'
                        }`}
                      >
                        <span>{ICONS[c.slug] ?? '📦'}</span>
                        <span className="leading-tight">{c.name}</span>
                      </button>
                    );
                  })}
                </div>

                {(() => {
                  const clearanceCat = categories.find(c => c.slug === 'clearance');
                  if (!clearanceCat) return null;
                  const checked = formData.selectedCategories.includes(clearanceCat._id);
                  return (
                    <button
                      type="button"
                      onClick={() => toggleCategory(clearanceCat._id)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-bold transition-all ${
                        checked
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                          : 'bg-orange-50 text-orange-600 border-orange-200 hover:border-orange-400'
                      }`}
                    >
                      <span>🏷️</span>
                      <span>Clearance</span>
                      <span className="ml-auto text-[10px] uppercase tracking-widest opacity-70">Can combine with any category</span>
                    </button>
                  );
                })()}

                {formData.selectedCategories.length === 0 && (
                  <p className="mt-2 text-xs text-amber-500 font-medium">Select at least one category.</p>
                )}
              </div>

              {/* Image URLs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Main Image URL <span className="text-gray-300 font-normal">(Primary Photo)</span>
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={e => updateField('imageUrl', e.target.value)}
                      placeholder="https://..."
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center h-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.imageUrl}
                        alt="preview"
                        className="h-20 object-contain"
                        onError={e => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Image URL 2 <span className="text-gray-300 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={formData.imageUrl2}
                      onChange={e => updateField('imageUrl2', e.target.value)}
                      placeholder="https://..."
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Image URL 3 <span className="text-gray-300 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={formData.imageUrl3}
                      onChange={e => updateField('imageUrl3', e.target.value)}
                      placeholder="https://..."
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Condition toggle */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                  Item Condition
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => updateField('condition', 'new')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all ${
                      formData.condition === 'new'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    ✨ New
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField('condition', 'used')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all ${
                      formData.condition === 'used'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-amber-300 hover:text-amber-600'
                    }`}
                  >
                    🔄 Used
                  </button>
                </div>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={e => updateField('isFeatured', e.target.checked)}
                  className="w-5 h-5 text-[#0046be] rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-sm font-bold text-gray-700 cursor-pointer">
                  Display in Featured Section on Home
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-12 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0046be] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#003399] transition-all shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
