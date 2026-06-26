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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('create-location')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get('get-all-locations')
  findAll() {
    return this.locationService.findAll();
  }

  @Get('get-unique-location/:id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch('update-location/:id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete('delete-location/:id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
