import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeliveryType } from '../types/delivery.types';

import lang from '../resources/lang';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectModel('Delivery')
    private readonly deliveryModel: Model<DeliveryType>,
  ) {}

  async getDeliveries(currentLang: string) {
    const deliveries = await this.deliveryModel.find({});

    if (deliveries === null) {
      return new NotFoundException(lang[currentLang].global.noData);
    }

    return deliveries;
  }
}
