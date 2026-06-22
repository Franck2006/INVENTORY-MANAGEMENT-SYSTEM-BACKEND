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
import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('product-variants')
export class ProductVariantsController {
  constructor(
    private readonly productVariantsService: ProductVariantsService,
  ) {}

  @Post('create-product-variant')
  create(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productVariantsService.create(createProductVariantDto);
  }

  @Get('get-all-product-variants')
  findAll() {
    return this.productVariantsService.findAll();
  }

  @Get('get-unique-product-variant/:id')
  findOne(@Param('id') id: string) {
    return this.productVariantsService.findOne(id);
  }

  @Patch('update-product-variant/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productVariantsService.update(id, updateProductVariantDto);
  }

  @Delete('delete-product-variant/:id')
  remove(@Param('id') id: string) {
    return this.productVariantsService.remove(id);
  }
}
