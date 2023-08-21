/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NotFoundException } from '@nestjs/common';

import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { Token } from 'src/interfaces/token';
import { CreateOrderDto } from 'src/dto/order.dto';
import calculateTotalProductsPrice from 'src/functions/calculateTotalProductsPrice';
import excludeObjectFields from 'src/functions/excludeObjectFields';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
  ) {}

  async getOrder(orderId: string, currentLang: string) {
    const order = await this.retrieveOrder(orderId);

    return {
      ...excludeObjectFields(order, ['products', 'userId']),
      products: order.products.map((product) => {
        return {
          ...this.productsService.extractProductData(
            // @ts-ignore
            product.product,
            currentLang,
          ),
          quantity: product.quantity,
        };
      }),
    };
  }

  private async retrieveOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            product: {
              include: {
                translations: true,
                category: { include: { translations: true } },
              },
            },
          },
        },
      },
    });

    if (order === null) {
      throw new NotFoundException('Could not find order with provided id');
    }

    return order;
  }

  async deleteOrder(orderId: string, { email }: Token, currentLang: string) {
    const user = await this.userService.retrieveUserByEmail(email);
    await this.userService.isAdmin(user);

    await this.retrieveOrder(orderId);
    await this.prisma.order.delete({ where: { id: orderId } });

    return {
      msg: lang[currentLang].controllers.order.orderDeleted,
    };
  }

  async createOrder(
    {
      address,
      city,
      delivery,
      deliveryPrice,
      name,
      phone,
      products,
      zipcode,
    }: CreateOrderDto,
    { email }: Token,
  ) {
    const productsPrice = calculateTotalProductsPrice(products);

    const newOrder = await this.prisma.order.create({
      data: {
        address,
        city,
        name,
        phone,
        productsPrice,
        selectedCourier: delivery,
        deliveryPrice: Number(deliveryPrice),
        zipcode,
        user: { connect: { email } },
      },
    });

    const orderProducts = products.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        orderId: newOrder.id,
      };
    });

    await this.prisma.cartProduct.createMany({
      data: orderProducts,
    });

    await this.prisma.user.update({
      where: { email },
      data: { cart: { update: { products: { set: [] } } } },
    });

    return {
      order: newOrder,
    };
  }
}
