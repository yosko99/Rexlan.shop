import { Prisma } from '@prisma/client';

export const getProductIncludeQuery = (): Prisma.ProductInclude => {
  return {
    category: {
      include: {
        translations: {
          select: {
            title: true,
            lang: true,
          },
        },
      },
    },
    ratings: true,
    translations: {
      select: {
        title: true,
        description: true,
        lang: true,
        id: true,
      },
    },
  };
};
