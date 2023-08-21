import { seeder } from 'nestjs-seeder';

import { DeliveriesSeeder } from './seeders/deliveries.seeder';

import dotenv = require('dotenv');
import { PrismaService } from './prisma/prisma.service';
import { ProductsAndCategoriesSeeder } from './seeders/productsAndCategories.seeder';
dotenv.config();

seeder({
  providers: [PrismaService],
}).run([DeliveriesSeeder, ProductsAndCategoriesSeeder]);
