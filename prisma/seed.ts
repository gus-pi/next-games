import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    const res = await fetch(
      'https://api.rawg.io/api/games?key=76862f22b46441f39b06e0f08dcbd980'
    );
    const data = await res.json();
    const games = data.results;

    for (const game of games) {
      await prisma.game.create({
        data: {
          id: game.id,
          name: game.name,
          image: game.background_image,
          released: game.released,
          consoles: {
            connectOrCreate: game.platforms.map((platformData: any) => ({
              where: { id: platformData.platform.id },
              create: {
                id: platformData.platform.id,
                name: platformData.platform.name,
              },
            })),
          },
        },
      });
    }
    console.log('database seeded succesfully');
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
