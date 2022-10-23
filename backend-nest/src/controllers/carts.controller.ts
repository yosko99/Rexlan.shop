import { Controller } from '@nestjs/common';

import { CartsService } from '../services/carts.service';

@Controller('carts')
export class CartsControler {
  constructor(private readonly cartsService: CartsService) {}
}
