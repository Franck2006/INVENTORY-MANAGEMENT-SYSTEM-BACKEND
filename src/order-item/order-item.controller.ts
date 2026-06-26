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
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
 
  @Post('create-order-item')
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get('get-order-items')
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get('get-unique-order-item/:id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(id);
  }

  @Patch('update-order-item/:id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @Delete('delete-order-item/:id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
