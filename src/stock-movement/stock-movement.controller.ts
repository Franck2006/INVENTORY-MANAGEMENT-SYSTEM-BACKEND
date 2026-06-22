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
import { StockMovementService } from './stock-movement.service';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('stock-movement')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}

  @Post('create-stock-movement')
  create(@Body() createStockMovementDto: CreateStockMovementDto) {
    return this.stockMovementService.create(createStockMovementDto);
  }

  @Get('get-stock-movements')
  findAll() {
    return this.stockMovementService.findAll();
  }

  @Get('get-unique-stock-movement/:id')
  findOne(@Param('id') id: string) {
    return this.stockMovementService.findOne(id);
  }

  @Patch('update-stock-movement/:id')
  update(
    @Param('id') id: string,
    @Body() updateStockMovementDto: UpdateStockMovementDto,
  ) {
    return this.stockMovementService.update(id, updateStockMovementDto);
  }

  @Delete('delete-stock-movement/:id')
  remove(@Param('id') id: string) {
    return this.stockMovementService.remove(id);
  }
}
