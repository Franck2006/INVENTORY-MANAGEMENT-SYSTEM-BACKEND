import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase_orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)  
@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) { }

  @Post('create-purchase-order')
  create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.create(createPurchaseOrderDto);
  }

  @Get('get-purchase-orders')
  findAll() {
    return this.purchaseOrdersService.findAll();
  }

  @Get('get-unique-order/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrdersService.findOne(id);
  }

  @Patch('update-purchase-order/:id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto,
  ) {
    return this.purchaseOrdersService.update(id, updatePurchaseOrderDto);
  }

  @Delete('delete-purchase-order/:id')
  remove(@Param('id') id: string) {
    return this.purchaseOrdersService.remove(id);
  }
}
