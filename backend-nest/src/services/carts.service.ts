import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CartProductsType, ProductType } from '../types/product.types';
import { OrderType } from '../types/order.types';
import { CartType } from '../types/cart.types';
import { UserType } from '../types/user.types';

import lang from '../resources/lang';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel('Cart')
    private readonly cartModel: Model<CartType>,
    @InjectModel('User')
    private readonly userModel: Model<UserType>,
    @InjectModel('Order')
    private readonly orderModel: Model<OrderType>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductType>,
  ) {}

  async getCartProducts(cartID: string, currentLang: string) {
    if (!mongoose.Types.ObjectId.isValid(cartID)) {
      return {
        err: lang[currentLang].controllers.cart.invalidCartID,
      };
    }

    const cart = await this.cartModel.findOne({ _id: cartID });

    if (cart.products.length === 0) {
      return {
        err: lang[currentLang].controllers.cart.noItemsInCart,
      };
    }

    // Cart is not linked to user (cart is anonymous)
    if (!cart.isLinked) {
      return {
        products: cart.products,
        defaultValues: null,
      };
    } else {
      // Cart is linked to user
      const userID = cart.userID;
      const user = await this.userModel.findOne({ _id: userID });
      const { phone, address, name, zipcode } = user;

      // Send user details and cart items
      return {
        products: cart.products,
        defaultValues: {
          phone,
          address,
          name,
          zipcode,
        },
      };
    }
  }

  async addProductToCart(
    productID: string,
    cartID: string,
    productQuantity: number,
    currentLang: string,
  ) {
    productQuantity =
      productQuantity !== undefined ? Number(productQuantity) : 1;

    let currentCart =
      cartID !== null ? await this.cartModel.findOne({ _id: cartID }) : null;

    if (productID === undefined) {
      return new NotFoundException(lang[currentLang].global.noProductID);
    }

    // Check if cart with provdided id exists
    // If a cart exists check if the product exists in the cart
    // Otherwise create new cart and assign the new prodcut

    if (currentCart !== null) {
      // Check if item is already in cart
      const product = currentCart.products.find(
        (product) => product.productID === productID,
      );

      // Already in cart (increment quantity)
      if (product !== undefined) {
        product.productQuantity += productQuantity;
      } else {
        // Add new item to cart
        currentCart.products.push({
          productID,
          productQuantity,
        });
      }
      currentCart.totalPrice = await this.calculateCartTotalPrice(
        currentCart.products,
      );
      currentCart = await currentCart.save();

      return {
        cartID: currentCart._id,
      };
    } else {
      try {
        const addedProduct = await this.productModel.findOne({ id: productID });

        const newCart = new this.cartModel({
          isLinked: false,
          products: [
            {
              productID,
              productQuantity,
            },
          ],
          totalPrice: addedProduct.price * productQuantity,
        });

        const savedCart = await newCart.save();

        return {
          cartID: savedCart._id,
        };
      } catch (error) {
        return new NotFoundException(error.message);
      }
    }
  }

  async deleteProductFromCart(
    cartID: string,
    productID: string,
    currentLang: string,
  ) {
    if (!mongoose.Types.ObjectId.isValid(cartID)) {
      return new NotFoundException(
        lang[currentLang].controllers.cart.invalidCartID,
      );
    }

    const cart = await this.cartModel.findOne({ _id: cartID });

    if (cart === null) {
      return new NotFoundException(
        lang[currentLang].controllers.cart.invalidCartID,
      );
    }

    const productsWithRemovedProduct: CartProductsType[] = [];

    cart.products.forEach((product) => {
      if (product.productID === productID) {
        // Decrement quantity
        if (product.productQuantity > 1) {
          product.productQuantity--;
          productsWithRemovedProduct.push(product);
        }
      } else {
        productsWithRemovedProduct.push(product);
      }
    });

    cart.products = productsWithRemovedProduct;

    cart.totalPrice = await this.calculateCartTotalPrice(cart.products);

    await cart.save();

    return {
      msg: `${lang[currentLang].global.product} ${lang[
        currentLang
      ].global.removed.toLowerCase()}`,
    };
  }

  async deleteCart(
    currentCart: mongoose.Document<CartType> & CartType,
    reassignCartToUser: 'true' | 'false',
    currentLang: string,
  ) {
    const newCart = await this.reassignNewCartToUser(
      reassignCartToUser,
      currentCart.userID,
    );

    await this.updateOrderStatus(currentCart._id.toString());
    await this.cartModel.deleteOne({ _id: currentCart._id });

    return {
      msg: lang[currentLang].controllers.cart.cartDeleted,
      cartID: newCart._id,
    };
  }

  private async reassignNewCartToUser(
    reassignCartToUser: 'true' | 'false',
    userID: string,
  ) {
    if (reassignCartToUser === 'true') {
      const newCart = await new this.cartModel({
        userID,
        isLinked: true,
      }).save();

      await this.userModel.updateOne(
        { _id: userID },
        {
          cartID: newCart._id,
        },
      );

      return newCart;
    } else {
      return {
        _id: null,
      };
    }
  }

  private async updateOrderStatus(cartID: string) {
    const order = await this.orderModel.findOne({ cartID });

    if (order !== null) {
      order.orderStatus = 'Processing';
      await order.save();
    }
  }

  private async calculateCartTotalPrice(cartProducts: CartProductsType[]) {
    const productPrices = await Promise.all(
      cartProducts.map(async (product) => {
        const { price } = await this.productModel.findOne({
          id: product.productID,
        });

        return price * product.productQuantity;
      }),
    );

    return productPrices.length !== 0
      ? Number(productPrices.reduce((a, b) => a + b).toFixed(2))
      : 0;
  }

  public async deleteProductFromAllCarts(productID: string) {
    const allCarts = await this.cartModel.find({});

    allCarts.forEach(async (cart) => {
      if (cart.products.length > 0) {
        const cartProductsWithRemovedProduct = cart.products.filter(
          (product) => {
            return product.productID !== productID;
          },
        );
        cart.products = cartProductsWithRemovedProduct;
        await cart.save();
      }
    });
  }
}
