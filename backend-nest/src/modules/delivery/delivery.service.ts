import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../../dto/delivery.dto';
import { Token } from '../../interfaces/token';
import { UserService } from '../user/user.service';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getDeliveries(currentLang: string) {
    const deliveries = await this.prisma.delivery.findMany({});

    if (deliveries === null) {
      throw new NotFoundException(lang[currentLang].global.noData);
    }

    return deliveries;
  }

  async getDelivery(id: string, currentLang: string) {
    return this.retrieveDelivery(id, currentLang);
  }

  private async retrieveDelivery(id: string, currentLang: string) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id } });

    if (delivery === null) {
      throw new NotFoundException(
        lang[currentLang].global.noDataWithProvidedID,
      );
    }

    return delivery;
  }

  private async doesCategoryTitleAlreadyExist(
    title: string,
    currentLang: string,
  ) {
    const category = await this.prisma.delivery.findFirst({
      where: { title },
    });

    console.log(title);

    if (category !== null) {
      throw new HttpException(lang[currentLang].global.titleAlreadyExists, 409);
    }

    return category;
  }

  async createDelivery(
    { priceToAddress, initialPrice, title, image }: CreateDeliveryDto,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    await this.doesCategoryTitleAlreadyExist(title, currentLang);

    try {
      const newDelivery = await this.prisma.delivery.create({
        data: {
          title,
          image,
          initialPrice: Number(initialPrice),
          priceToAddress: Number(priceToAddress),
        },
      });

      return {
        msg: lang[currentLang].controllers.delivery.deliveryCreated,
        delivery: newDelivery,
      };
    } catch (e) {
      throw new HttpException(`Something went wrong: ${e.message}`, 502);
    }
  }

  async updateDelivery(
    { priceToAddress, initialPrice, image, title }: UpdateDeliveryDto,
    id: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    const delivery = await this.retrieveDelivery(id, currentLang);

    if (delivery.title !== title && title !== undefined) {
      await this.doesCategoryTitleAlreadyExist(title, currentLang);
    }

    try {
      await this.prisma.delivery.update({
        where: { id },
        data: {
          title,
          image,
          initialPrice: Number(initialPrice) || delivery.initialPrice,
          priceToAddress: Number(priceToAddress) || delivery.priceToAddress,
        },
      });

      return {
        msg: lang[currentLang].global.dataUpdated,
      };
    } catch (e) {
      throw new HttpException(`Something went wrong: ${e.message}`, 502);
    }
  }
}
