/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable } from '@nestjs/common';

import lang from '../../resources/lang';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { AddCartProductDto } from 'src/dto/cart.dto';
import { UserService } from '../user/user.service';
import { Token } from '../../interfaces/token';
import extractProductData from '../../functions/extractProductData';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async getCartProducts(cartId: string, currentLang: string) {
    const cart = await this.retrieveCart(cartId, currentLang);

    return {
      products: cart.products.map((product) => {
        return {
          ...extractProductData(
            // @ts-ignore
            product.product,
            currentLang,
          ),
          quantity: product.quantity,
        };
      }),
      defaultValues: { ...cart.user },
    };
  }

  async retrieveCart(cartId: string, currentLang: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        user: {
          select: {
            phone: true,
            address: true,
            name: true,
            zipcode: true,
          },
        },
        products: {
          select: {
            id: true,
            quantity: true,
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

    if (cart === null) {
      throw new HttpException(
        lang[currentLang].controllers.cart.invalidCartID,
        404,
      );
    }

    return cart;
  }

  async addProductToCart(
    cartId: string,
    { productId, productQuantity }: AddCartProductDto,
    currentLang: string,
  ) {
    await this.productService.retrieveProduct(productId, currentLang);

    const qty = productQuantity !== undefined ? Number(productQuantity) : 1;

    if (cartId !== null && cartId !== 'null') {
      await this.addProductToUserCart(cartId, productId, qty, currentLang);
      return {
        cartId,
      };
    }

    // Create cart without user
    const newCart = await this.prisma.cart.create({
      data: {
        products: {
          create: [
            {
              quantity: qty,
              product: {
                connect: { id: productId },
              },
            },
          ],
        },
      },
    });

    return { cartId: newCart.id };
  }

  async addProductToUserCart(
    cartId: string,
    productId: string,
    qty: number,
    currentLang: string,
  ) {
    const cart = await this.retrieveCart(cartId, currentLang);
    const cartProduct = cart.products.find(
      (product) => product.product.id === productId,
    );

    if (cartProduct) {
      await this.prisma.cartProduct.update({
        where: { id: cartProduct.id },
        data: { quantity: qty + cartProduct.quantity },
      });
    } else {
      await this.prisma.cart.update({
        where: { id: cartId },
        data: {
          products: {
            create: [
              {
                quantity: qty,
                product: {
                  connect: { id: productId },
                },
              },
            ],
          },
        },
      });
    }
  }

  async removeProductFromCart(
    cartId: string,
    productId: string,
    currentLang: string,
  ) {
    await this.productService.retrieveProduct(productId, currentLang);
    const cart = await this.retrieveCart(cartId, currentLang);

    const cartProduct = cart.products.find(
      (product) => product.product.id === productId,
    );

    await this.prisma.cartProduct.delete({
      where: { id: cartProduct.id },
    });

    return {
      msg: `${lang[currentLang].global.product} ${lang[
        currentLang
      ].global.removed.toLowerCase()}`,
    };
  }

  async deleteCart(cartId: string, { email }: Token, currentLang: string) {
    const user = await this.userService.retrieveUserByEmail(email);
    await this.userService.isAdmin(user);

    await this.retrieveCart(cartId, currentLang);
    await this.prisma.cart.delete({ where: { id: cartId } });

    return {
      msg: lang[currentLang].controllers.cart.cartDeleted,
    };
  }

  public async deleteCategoryProductsFromCarts(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    // Find carts containing any of the products
    const cartsToUpdate = await this.prisma.cart.findMany({
      where: {
        products: {
          some: {
            id: {
              in: products.map((product) => product.id),
            },
          },
        },
      },
    });
    // Update each cart to remove the products
    for (const cart of cartsToUpdate) {
      await this.prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          products: {
            disconnect: products.map((product) => ({ id: product.id })),
          },
        },
      });
    }
  }
}
