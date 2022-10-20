import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from 'src/cache/redis.service';

import { ProductType } from 'src/types/product.types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductType>,
    private readonly redisService: RedisService,
  ) {}
}
