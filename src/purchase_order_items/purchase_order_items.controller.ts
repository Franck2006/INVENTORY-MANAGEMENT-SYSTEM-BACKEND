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
import { PurchaseOrderItemsService } from './purchase_order_items.service';
import { CreatePurchaseOrderItemDto } from './dto/create-purchase_order_item.dto';
import { UpdatePurchaseOrderItemDto } from './dto/update-purchase_order_item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)  
@Controller('purchase-order-items')
export class PurchaseOrderItemsController {
  constructor(
    private readonly purchaseOrderItemsService: PurchaseOrderItemsService,
  ) { }

  @Post('create-order-item')
  create(@Body() createPurchaseOrderItemDto: CreatePurchaseOrderItemDto) {
    return this.purchaseOrderItemsService.create(createPurchaseOrderItemDto);
  }

  @Get('get-order-items')
  findAll() {
    return this.purchaseOrderItemsService.findAll();
  }

  @Get('get-unique-order-item/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderItemsService.findOne(id);
  }

  @Patch('update-order-item/:id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
  ) {
    return this.purchaseOrderItemsService.update(
      id,
      updatePurchaseOrderItemDto,
    );
  }

  @Delete('delete-order-item/:id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderItemsService.remove(id);
  }
}
