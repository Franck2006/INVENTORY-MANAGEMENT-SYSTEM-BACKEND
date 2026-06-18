import { Injectable } from '@nestjs/common';
import { CreateInventoryLevelDto } from './dto/create-inventory-level.dto';
import { UpdateInventoryLevelDto } from './dto/update-inventory-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryLevelService {
  constructor(private prismaClient: PrismaService) {}

  async create(createInventoryLevelDto: CreateInventoryLevelDto) {
    const { quantity, productVariantId, locationId } = createInventoryLevelDto;
    return await this.prismaClient.inventoryLevel.create({
      data: {
        quantity,
        productVariant: {
          connect: {
            id: productVariantId,
          },
        },
        location: {
          connect: {
            id: locationId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.inventoryLevel.findMany({
      include: {
        location: true,
        productVariant: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.inventoryLevel.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
        productVariant: true,
      },
    });
  }

  async update(id: string, updateInventoryLevelDto: UpdateInventoryLevelDto) {
    return await this.prismaClient.inventoryLevel.update({
      where: {
        id,
      },
      data: updateInventoryLevelDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.inventoryLevel.delete({
      where: {
        id,
      },
    });
  }
}
