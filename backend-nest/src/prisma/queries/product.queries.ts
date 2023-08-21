import { Prisma } from '@prisma/client';

export const getProductIncludeQuery = (): Prisma.ProductInclude => {
  return {
    category: {
      include: {
        translations: {
          select: { title: true, lang: true },
        },
      },
    },
    rating: {
      select: {
        rate: true,
        count: true,
      },
    },
    translations: {
      select: { title: true, description: true, lang: true, id: true },
    },
  };
};
