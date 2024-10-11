// ROUTE /API/GAMES/[ID]

import { prisma } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const game = await prisma.game.findUnique({
      where: { id },
      include: { consoles: true },
    });
    return NextResponse.json({ success: true, data: game });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const newData = await req.json();

    const existingGame = await prisma.game.findUnique({
      where: { id },
      include: { consoles: true },
    });

    if (!existingGame) {
      return NextResponse.json(
        { success: false, message: 'Game not found' },
        { status: 404 }
      );
    }

    const currentConsolesIds = existingGame.consoles.map(
      (console) => console.id
    );

    const newConsoleIds = newData.consoles.map(
      (consoleData: any) => consoleData.console.id
    );

    const consolesToConnect = newConsoleIds.filter(
      (id: number) => !currentConsolesIds.includes(id)
    );

    const consolesToDisconnect = currentConsolesIds.filter(
      (id: number) => !newConsoleIds.includes(id)
    );

    const game = await prisma.game.update({
      where: { id },
      data: {
        name: newData.name,
        image: newData.image,
        released: newData.released,
        consoles: {
          connect: consolesToConnect.map((consoleId: number) => ({
            id: consoleId,
          })),
          disconnect: consolesToDisconnect.map((consoleId: number) => ({
            id: consoleId,
          })),
        },
      },
      include: { consoles: true },
    });
    return NextResponse.json({ success: true, data: game });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
