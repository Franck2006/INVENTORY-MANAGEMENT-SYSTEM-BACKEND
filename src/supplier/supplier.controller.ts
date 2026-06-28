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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard) 
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post('create-supplier')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get('get-all-suppliers')
  findAll() {
    return this.supplierService.findAll();
  }

  @Get('get-unique-supplier/:id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch('update-supplier/:id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete('delete-delete/:id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
