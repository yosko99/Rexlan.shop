import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RedisCacheModule } from '../cache/redis.module';
import { TranslationModule } from '../translation/translation.module';

import { productSchema } from '../schemas/product.schema';

import { ProductsController } from '../controllers/products.controller';

import { ProductsService } from '../services/products.service';

@Module({
  imports: [
    RedisCacheModule,
    TranslationModule,
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
