import { HttpException, Injectable, NotFoundException } from '@nestjs/common';

import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../../dto/delivery.dto';
import { Token } from '../../interfaces/token';
import { UserService } from '../user/user.service';
import deleteImage from '../../functions/deleteImage';

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

  private async doesDeliveryTitleAlreadyExist(
    title: string,
    currentLang: string,
    image?: string,
  ) {
    const category = await this.prisma.delivery.findFirst({
      where: { title },
    });

    if (category !== null) {
      await deleteImage(image);
      throw new HttpException(lang[currentLang].global.titleAlreadyExists, 409);
    }

    return category;
  }

  async createDelivery(
    { priceToAddress, initialPrice, title }: CreateDeliveryDto,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    await this.doesDeliveryTitleAlreadyExist(title, currentLang, filename);

    try {
      const newDelivery = await this.prisma.delivery.create({
        data: {
          title,
          image: filename,
          initialPrice: Number(initialPrice),
          priceToAddress: Number(priceToAddress),
        },
      });

      return {
        msg: lang[currentLang].controllers.delivery.deliveryCreated,
        delivery: newDelivery,
      };
    } catch (e) {
      await deleteImage(filename);
      throw new HttpException(`Something went wrong: ${e.message}`, 502);
    }
  }

  async updateDelivery(
    { priceToAddress, initialPrice, title }: UpdateDeliveryDto,
    id: string,
    filename: string,
    { email }: Token,
    currentLang: string,
  ) {
    await this.userService.isAdmin(email);
    const delivery = await this.retrieveDelivery(id, currentLang);

    if (delivery.title !== title && title !== undefined) {
      await this.doesDeliveryTitleAlreadyExist(title, currentLang, filename);
    }

    try {
      await this.prisma.delivery.update({
        where: { id },
        data: {
          title,
          image: filename,
          initialPrice: Number(initialPrice) || delivery.initialPrice,
          priceToAddress: Number(priceToAddress) || delivery.priceToAddress,
        },
      });

      await deleteImage(delivery.image);

      return {
        msg: lang[currentLang].global.dataUpdated,
      };
    } catch (e) {
      await deleteImage(filename);
      throw new HttpException(`Something went wrong: ${e.message}`, 502);
    }
  }

  async deleteDelivery(id: string, { email }: Token, currentLang: string) {
    await this.userService.isAdmin(email);
    const delivery = await this.retrieveDelivery(id, currentLang);
    await deleteImage(delivery.image);
    await this.prisma.delivery.delete({ where: { id } });

    return {
      msg: lang[currentLang].global.dataDeleted,
    };
  }
}
