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
import { InventoryLevelService } from './inventory-level.service';
import { CreateInventoryLevelDto } from './dto/create-inventory-level.dto';
import { UpdateInventoryLevelDto } from './dto/update-inventory-level.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('inventory-level')
export class InventoryLevelController {
  constructor(private readonly inventoryLevelService: InventoryLevelService) {}

  @Post('create-inventory-level')
  create(@Body() createInventoryLevelDto: CreateInventoryLevelDto) {
    return this.inventoryLevelService.create(createInventoryLevelDto);
  }

  @Get('get-inventory-levels')
  findAll() {
    return this.inventoryLevelService.findAll();
  }

  @Get('get-unique-inventory-level/:id')
  findOne(@Param('id') id: string) {
    return this.inventoryLevelService.findOne(id);
  }

  @Patch('update-inventory-level/:id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryLevelDto: UpdateInventoryLevelDto,
  ) {
    return this.inventoryLevelService.update(id, updateInventoryLevelDto);
  }

  @Delete('delete-inventory-level/:id')
  remove(@Param('id') id: string) {
    return this.inventoryLevelService.remove(id);
  }
}
