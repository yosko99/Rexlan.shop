import { Injectable, NotFoundException } from '@nestjs/common';

import lang from '../../resources/lang';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getDeliveries(currentLang: string) {
    const deliveries = await this.prisma.delivery.findMany({});

    if (deliveries === null) {
      throw new NotFoundException(lang[currentLang].global.noData);
    }

    return deliveries;
  }
}
