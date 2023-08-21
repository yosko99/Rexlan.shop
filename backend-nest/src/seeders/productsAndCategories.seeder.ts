import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import categoryData from 'src/data/categories';
import getProductsData from 'src/data/getProductsData';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsAndCategoriesSeeder implements Seeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed(): Promise<void> {
    await this.drop();

    const categoriesPromises = categoryData.map(async (category) => {
      return await this.prisma.category.create({ data: category });
    });

    const categories = await Promise.all(categoriesPromises);

    getProductsData(
      categories[0].id,
      categories[1].id,
      categories[2].id,
      categories[3].id,
    ).map(async (category) => {
      return await this.prisma.product.create({ data: category });
    });
  }

  async drop(): Promise<void> {
    await this.prisma.category.deleteMany({});
    await this.prisma.product.deleteMany({});
  }
}
