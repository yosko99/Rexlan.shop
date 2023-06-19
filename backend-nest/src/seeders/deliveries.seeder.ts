import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

import { DeliveryType } from 'src/types/delivery.types';
import * as deliveryData from '../data/deliveries.json';

@Injectable()
export class DeliveriesSeeder implements Seeder {
  constructor(
    @InjectModel('Delivery')
    private readonly deliveryModel: Model<DeliveryType>,
  ) {}

  async seed(): Promise<any> {
    return this.deliveryModel.insertMany(deliveryData);
  }

  async drop(): Promise<any> {
    return this.deliveryModel.deleteMany({});
  }
}
