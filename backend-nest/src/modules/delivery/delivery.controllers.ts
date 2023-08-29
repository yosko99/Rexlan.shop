import { Controller, Get } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { DeliveryService } from './delivery.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { currentLangQuery } from '../../swagger/apiQueryOptions';

@Controller('deliveries')
@ApiTags('Deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all deliveries' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Deliveries fetched' })
  getDeliveries(@RequestData('currentLang') currentLang: string) {
    return this.deliveryService.getDeliveries(currentLang);
  }
}
