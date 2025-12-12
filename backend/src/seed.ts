import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Simple SVG placeholder generator to avoid external requests during dev
const svgPlaceholder = (w: number, h: number, text: string, bg = '4F46E5', fg = 'FFFFFF') => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
    `<rect width='100%' height='100%' fill='#${bg}'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='${Math.floor(Math.min(w, h) / 10)}' fill='#${fg}'>${text}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

async function main() {
  console.log('🌱 Starting database seed...');

  // 기존 데이터 정리
  await prisma.publicLook.deleteMany();
  await prisma.look.deleteMany();
  await prisma.clothingItem.deleteMany();
  await prisma.user.deleteMany();

  // 데모 사용자 생성
  const user1 = await prisma.user.create({
    data: {
      id: 'demo-user-1',
      email: 'demo1@lookmate.com',
      name: 'Fashion Lover',
      displayName: 'Fashion Lover',
      avatarUrl: svgPlaceholder(400, 800, 'Avatar 1'),
      height: 170,
      bodyType: 'normal',
      gender: 'female',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'demo-user-2',
      email: 'demo2@lookmate.com',
      name: 'Style Master',
      displayName: 'Style Master',
      avatarUrl: svgPlaceholder(400, 800, 'Avatar 2'),
      height: 175,
      bodyType: 'slim',
      gender: 'male',
    },
  });

  console.log('✅ Created users:', user1.displayName, user2.displayName);

  // user1의 옷 아이템 생성
  const item1 = await prisma.clothingItem.create({
    data: {
      id: 'item-1',
      userId: user1.id,
      category: 'top',
      imageUrl: svgPlaceholder(400, 400, 'White Tshirt', 'ffffff', '000000'),
      originalImageUrl: svgPlaceholder(400, 400, 'White Tshirt', 'ffffff', '000000'),
      color: 'white',
      season: 'summer',
      brand: 'Uniqlo',
      size: 'M',
      tags: JSON.stringify(['casual', 'basic']),
      isFavorite: true,
      isPurchased: true,
      price: 15000,
    },
  });

  const item2 = await prisma.clothingItem.create({
    data: {
      id: 'item-2',
      userId: user1.id,
      category: 'bottom',
      imageUrl: svgPlaceholder(400, 400, 'Black Jeans', '1a1a2e', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Black Jeans', '1a1a2e', 'ffffff'),
      color: 'black',
      season: 'fall',
      brand: 'Levi\'s',
      size: '28',
      tags: JSON.stringify(['denim', 'classic']),
      isFavorite: true,
      isPurchased: true,
      price: 89000,
    },
  });

  const item3 = await prisma.clothingItem.create({
    data: {
      id: 'item-3',
      userId: user1.id,
      category: 'outer',
      imageUrl: svgPlaceholder(400, 400, 'Navy Jacket', '3d5a80', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Navy Jacket', '3d5a80', 'ffffff'),
      color: 'navy',
      season: 'winter',
      brand: 'The North Face',
      size: 'L',
      tags: JSON.stringify(['outdoor', 'warm']),
      isFavorite: false,
      isPurchased: true,
      price: 250000,
    },
  });

  const item4 = await prisma.clothingItem.create({
    data: {
      id: 'item-4',
      userId: user1.id,
      category: 'shoes',
      imageUrl: svgPlaceholder(400, 400, 'White Sneakers', 'e5e5e5', '000000'),
      originalImageUrl: svgPlaceholder(400, 400, 'White Sneakers', 'e5e5e5', '000000'),
      color: 'white',
      brand: 'Nike',
      size: '250',
      tags: JSON.stringify(['sneakers', 'comfortable']),
      isFavorite: true,
      isPurchased: true,
      price: 120000,
      shoppingUrl: 'https://www.nike.com',
    },
  });

  const item5 = await prisma.clothingItem.create({
    data: {
      id: 'item-5',
      userId: user1.id,
      category: 'accessory',
      imageUrl: svgPlaceholder(400, 400, 'Brown Bag', 'c69b7b', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Brown Bag', 'c69b7b', 'ffffff'),
      color: 'brown',
      brand: 'Coach',
      tags: JSON.stringify(['leather', 'crossbody']),
      isFavorite: false,
      isPurchased: false,
      price: 350000,
      shoppingUrl: 'https://www.coach.com',
    },
  });

  // user2의 옷 아이템 생성
  const item6 = await prisma.clothingItem.create({
    data: {
      id: 'item-6',
      userId: user2.id,
      category: 'top',
      imageUrl: svgPlaceholder(400, 400, 'Black Shirt', '000000', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Black Shirt', '000000', 'ffffff'),
      color: 'black',
      season: 'spring',
      brand: 'Zara',
      size: 'L',
      tags: JSON.stringify(['formal', 'business']),
      isFavorite: true,
      isPurchased: true,
      price: 59000,
    },
  });

  const item7 = await prisma.clothingItem.create({
    data: {
      id: 'item-7',
      userId: user2.id,
      category: 'bottom',
      imageUrl: svgPlaceholder(400, 400, 'Beige Pants', '8b7355', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Beige Pants', '8b7355', 'ffffff'),
      color: 'beige',
      season: 'spring',
      brand: 'Gap',
      size: '32',
      tags: JSON.stringify(['chinos', 'casual']),
      isFavorite: false,
      isPurchased: true,
      price: 69000,
    },
  });

  const item8 = await prisma.clothingItem.create({
    data: {
      id: 'item-8',
      userId: user2.id,
      category: 'onepiece',
      imageUrl: svgPlaceholder(400, 400, 'Gray Suit', '4a5759', 'ffffff'),
      originalImageUrl: svgPlaceholder(400, 400, 'Gray Suit', '4a5759', 'ffffff'),
      color: 'gray',
      season: 'fall',
      brand: 'Hugo Boss',
      size: 'L',
      tags: JSON.stringify(['formal', 'suit']),
      isFavorite: true,
      isPurchased: false,
      price: 890000,
      shoppingUrl: 'https://www.hugoboss.com',
    },
  });

  console.log('✅ Created 8 clothing items');

  // user1의 룩 생성
  const look1 = await prisma.look.create({
    data: {
      id: 'look-1',
      userId: user1.id,
      name: 'Casual Summer Look',
      itemIds: JSON.stringify(['item-1', 'item-2', 'item-4']),
      layers: JSON.stringify([
        { clothingId: 'item-1', x: 0, y: -50, scale: 1, rotation: 0, visible: true },
        { clothingId: 'item-2', x: 0, y: 100, scale: 1, rotation: 0, visible: true },
        { clothingId: 'item-4', x: 0, y: 250, scale: 0.8, rotation: 0, visible: true },
      ]),
      snapshotUrl: svgPlaceholder(400, 800, 'Summer Look', 'f0f0f0', '333333'),
      isPublic: true,
      tags: JSON.stringify(['casual', 'summer', 'daily']),
    },
  });

  const look2 = await prisma.look.create({
    data: {
      id: 'look-2',
      userId: user1.id,
      name: 'Winter Outdoor',
      itemIds: JSON.stringify(['item-1', 'item-2', 'item-3']),
      layers: JSON.stringify([
        { clothingId: 'item-1', x: 0, y: -30, scale: 1, rotation: 0, visible: true },
        { clothingId: 'item-2', x: 0, y: 120, scale: 1, rotation: 0, visible: true },
        { clothingId: 'item-3', x: 0, y: -100, scale: 1.1, rotation: 0, visible: true },
      ]),
      snapshotUrl: svgPlaceholder(400, 800, 'Winter Look', 'e0e0e0', '666666'),
      isPublic: false,
      tags: JSON.stringify(['winter', 'outdoor']),
    },
  });

  // user2의 룩 생성
  const look3 = await prisma.look.create({
    data: {
      id: 'look-3',
      userId: user2.id,
      name: 'Business Casual',
      itemIds: JSON.stringify(['item-6', 'item-7']),
      layers: JSON.stringify([
        { clothingId: 'item-6', x: 0, y: -40, scale: 1, rotation: 0, visible: true },
        { clothingId: 'item-7', x: 0, y: 110, scale: 1, rotation: 0, visible: true },
      ]),
      snapshotUrl: svgPlaceholder(400, 800, 'Business Look', 'fafafa', '444444'),
      isPublic: true,
      tags: JSON.stringify(['business', 'casual', 'office']),
    },
  });

  console.log('✅ Created 3 looks');

  // 공개 룩 생성
  await prisma.publicLook.create({
    data: {
      id: 'pub-look-1',
      lookId: look1.id,
      publicId: 'summer-casual-2024',
      ownerName: user1.displayName,
      ownerId: user1.id,
      snapshotUrl: look1.snapshotUrl,
      itemsSnapshot: JSON.stringify([item1, item2, item4]),
      tags: JSON.stringify(['casual', 'summer', 'daily']),
      likesCount: 42,
      bookmarksCount: 18,
    },
  });

  await prisma.publicLook.create({
    data: {
      id: 'pub-look-2',
      lookId: look3.id,
      publicId: 'business-casual-2024',
      ownerName: user2.displayName,
      ownerId: user2.id,
      snapshotUrl: look3.snapshotUrl,
      itemsSnapshot: JSON.stringify([item6, item7]),
      tags: JSON.stringify(['business', 'casual', 'office']),
      likesCount: 28,
      bookmarksCount: 12,
    },
  });

  console.log('✅ Created 2 public looks');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
