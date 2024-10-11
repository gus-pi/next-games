// ROUTE /API/CONSOLES

import { prisma } from '@/app/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const console = await prisma.console.create({
      data: {
        id: data.id,
        name: data.name,
      },
    });
    return NextResponse.json({ success: true, data: console });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
