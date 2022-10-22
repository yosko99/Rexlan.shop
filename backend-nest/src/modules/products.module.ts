import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RedisCacheModule } from 'src/cache/redis.module';
import { TranslationModule } from 'src/translation/translation.module';

import { productSchema } from 'src/schemas/product.schema';

import { ProductsController } from 'src/controllers/products.controller';

import { ProductsService } from 'src/services/products.service';

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
