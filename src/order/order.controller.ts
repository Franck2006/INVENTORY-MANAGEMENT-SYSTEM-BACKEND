import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('get-orders')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('get-unique-order/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('update-order/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete('delete-order/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
