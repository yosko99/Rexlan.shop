import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisService } from 'src/cache/redis.service';
import { ProductsController } from 'src/controllers/products.controller';
import { productSchema } from 'src/schemas/product.schema';
import { ProductsService } from 'src/services/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, RedisService],
})
export class ProductModule {}
