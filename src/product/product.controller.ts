import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('get-all-products')
  findAll() {
    return this.productService.findAll();
  }

  @Get('get-unique-product/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('update-product/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete-product/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
