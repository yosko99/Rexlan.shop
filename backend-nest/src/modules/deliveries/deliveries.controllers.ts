import { Controller, Get } from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { DeliveriesService } from './deliveries.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { currentLangQuery } from 'src/swagger/apiQueryOptions';

@Controller('deliveries')
@ApiTags('Deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all deliveries' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Deliveries fetched' })
  getDeliveries(@RequestData('currentLang') currentLang: string) {
    return this.deliveriesService.getDeliveries(currentLang);
  }
}
