import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('get-all-categories')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('get-unique-category/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch('update-category/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete-category/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
