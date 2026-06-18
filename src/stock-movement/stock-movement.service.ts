import { Injectable } from '@nestjs/common';
import { CreateStockMovementDto } from './dto/create-stock-movement.dto';
import { UpdateStockMovementDto } from './dto/update-stock-movement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockMovementService {
  constructor(private prismaClient: PrismaService) {}

  async create(createStockMovementDto: CreateStockMovementDto) {
    const { quantity, type, reason, productVariantId, locationId, userId } =
      createStockMovementDto;

    return await this.prismaClient.stockMovement.create({
      data: {
        quantity,
        type,
        reason,
        location: {
          connect: {
            id: locationId,
          },
        },
        productVariant: {
          connect: {
            id: productVariantId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.stockMovement.findMany({
      include: {
        location: true,
        productVariant: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.stockMovement.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
        productVariant: true,
        user: true,
      },
    });
  }

  async update(id: string, updateStockMovementDto: UpdateStockMovementDto) {
    return await this.prismaClient.stockMovement.update({
      where: {
        id,
      },
      data: updateStockMovementDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.stockMovement.delete({
      where: {
        id,
      },
    });
  }
}
