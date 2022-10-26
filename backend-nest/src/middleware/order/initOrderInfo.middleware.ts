import { Request, Response, NextFunction } from 'express';
import { Injectable } from '@nestjs/common';
import { OrderType } from 'src/types/order.types';
import { CartType } from 'src/types/cart.types';

type ExtendedRequest = Request & { orderInfo: OrderType; cart: CartType };

@Injectable()
export class InitOrderInfoMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { delivery, name, address, city, zipcode, phone, deliveryPrice } =
      req.body;

    req.orderInfo = {
      userID: req.cart.userID === undefined ? null : req.cart.userID,
      productsPrice: req.cart.totalPrice,
      products: req.cart.products,
      selectedCourier: delivery,
      deliveryPrice,
      zipcode,
      address,
      name,
      city,
      phone,
    };

    next();
  }
}
