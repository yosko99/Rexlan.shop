import { Controller, Get } from '@nestjs/common';

import { CurrentLang } from '../decorators/currentLang.decorator';

import { DeliveriesService } from '../services/deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  getDeliveries(@CurrentLang() currentLang: string) {
    return this.deliveriesService.getDeliveries(currentLang);
  }
}
