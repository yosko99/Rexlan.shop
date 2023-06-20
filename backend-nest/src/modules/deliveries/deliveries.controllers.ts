import { Controller, Get } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { DeliveriesService } from './deliveries.service';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  getDeliveries(@RequestData('currentLang') currentLang: string) {
    return this.deliveriesService.getDeliveries(currentLang);
  }
}
