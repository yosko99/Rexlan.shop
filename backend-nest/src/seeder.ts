import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';

import { categorySchema } from './schemas/category.schema';
import { deliverySchema } from './schemas/delivery.schema';
import { productSchema } from './schemas/product.schema';
import { ProductsSeeder } from './seeders/products.seeder';
import { CategoriesSeeder } from './seeders/categories.seeder';
import { DeliveriesSeeder } from './seeders/deliveries.seeder';

import dotenv = require('dotenv');
dotenv.config();

seeder({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'Category', schema: categorySchema },
      { name: 'Delivery', schema: deliverySchema },
    ]),
  ],
}).run([ProductsSeeder, CategoriesSeeder, DeliveriesSeeder]);
