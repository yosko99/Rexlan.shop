import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import deliveriesData from 'src/data/deliveries';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveriesSeeder implements Seeder {
  constructor(private readonly prisma: PrismaService) {}

  async seed(): Promise<void> {
    await this.drop();

    await this.prisma.delivery.createMany({
      data: deliveriesData,
    });
  }

  async drop(): Promise<void> {
    await this.prisma.delivery.deleteMany({});
  }
}
