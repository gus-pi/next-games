// ROUTE /API/GAMES

import { prisma } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const game = await prisma.game.create({
      data: {
        id: data.id,
        name: data.name,
        image: data.image,
        released: data.released,
        consoles: {
          connect: data.consoles.map((consoleData: any) => ({
            id: consoleData.console.id,
          })),
        },
      },
    });
    return NextResponse.json({ success: true, data: game });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  try {
    const games = await prisma.game.findMany({
      include: { consoles: true },
    });
    return NextResponse.json({ success: true, data: games });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
