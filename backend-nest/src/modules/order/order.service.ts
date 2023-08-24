/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NotFoundException } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { Token } from 'src/interfaces/token';
import { CreateOrderDto } from 'src/dto/order.dto';
import calculateTotalProductsPrice from 'src/functions/calculateTotalProductsPrice';
import excludeObjectFields from 'src/functions/excludeObjectFields';
import { UserService } from '../user/user.service';
import extractProductData from 'src/functions/extractProductData';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getOrder(orderId: string, currentLang: string) {
    const order = await this.retrieveOrder(orderId);

    return {
      ...excludeObjectFields(order, ['products', 'userId']),
      products: order.products.map((product) => {
        return {
          ...extractProductData(
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
    tokenHeader: string,
  ) {
    const productsPrice = calculateTotalProductsPrice(products);

    const token = tokenHeader && tokenHeader.split(' ')[1];

    return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
      const orderData = {
        data: {
          address,
          city,
          name,
          phone,
          productsPrice,
          selectedCourier: delivery,
          deliveryPrice: Number(deliveryPrice),
          zipcode,
        },
      };
      if (!err) {
        const { email } = data as Token;
        // @ts-ignore
        orderData.data.user = { connect: { email } };

        await this.prisma.user.update({
          where: { email },
          data: { cart: { update: { products: { set: [] } } } },
        });
      }
      const newOrder = await this.prisma.order.create(orderData);

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

      return {
        order: newOrder,
      };
    });
  }
}
