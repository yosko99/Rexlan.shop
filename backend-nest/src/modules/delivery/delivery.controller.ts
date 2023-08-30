import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { DeliveryService } from './delivery.service';
import {
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { currentLangQuery } from '../../swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
} from '../../swagger/apiResponseOptions';
import { Token } from '../../interfaces/token';
import { CreateDeliveryDto, UpdateDeliveryDto } from '../../dto/delivery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFilter } from '../../config/multer';

@Controller('deliveries')
@ApiTags('Deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all deliveries' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Deliveries fetched',
  })
  getDeliveries(@RequestData('currentLang') currentLang: string) {
    return this.deliveryService.getDeliveries(currentLang);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch delivery by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({
    status: 200,
    description: 'Delivery fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery with id not found',
  })
  getDelivery(
    @Param('id') deliveryId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.deliveryService.getDelivery(deliveryId, currentLang);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Create new delivery' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 201,
    description: 'Delivery created',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Delivery title already exists',
  })
  createDelivery(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() createDeliveryDto: CreateDeliveryDto,
    @RequestData('currentLang') currentLang: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.deliveryService.createDelivery(
      createDeliveryDto,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerFilter))
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Update delivery' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Delivery updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery with id not found',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Delivery title already exists',
  })
  updateDelivery(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
    @Param('id') deliveryId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.deliveryService.updateDelivery(
      updateDeliveryDto,
      deliveryId,
      file.filename,
      userDataFromToken,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiHeader({
    name: 'Authorization',
    required: true,
  })
  @ApiOperation({ summary: 'Delete delivery' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({
    status: 200,
    description: 'Delivery deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Delivery not found',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  deleteDelivery(
    @Param('id') deliveryId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.deliveryService.deleteDelivery(
      deliveryId,
      userDataFromToken,
      currentLang,
    );
  }
}
