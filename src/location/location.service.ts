import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    const { address, name } = createLocationDto;
    return await this.prismaClient.location.create({
      data: { address, name },
    });
  }

  async findAll() {
    return await this.prismaClient.location.findMany({
      include: {
        inventoryLevels: true,
        orders: true,
        stockMovements: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.location.findMany({
      include: {
        inventoryLevels: true,
        orders: true,
        stockMovements: true,
      },
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    return await this.prismaClient.location.update({
      where: {
        id,
      },
      data: updateLocationDto,
    });
  }

  async remove(id: string) {
    return this.prismaClient.location.delete({
      where: {
        id,
      },
    });
  }
}
