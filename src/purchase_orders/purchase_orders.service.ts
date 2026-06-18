import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseOrdersService {
  constructor(private prismaClient: PrismaService) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const { totalCost, supplierId } = createPurchaseOrderDto;

    return await this.prismaClient.purchaseOrder.create({
      data: {
        totalCost,
        supplier: {
          connect: {
            id: supplierId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.purchaseOrder.findMany({
      include: {
        items: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.purchaseOrder.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return await this.prismaClient.purchaseOrder.update({
      where: {
        id,
      },
      data: updatePurchaseOrderDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.purchaseOrder.delete({
      where: {
        id,
      },
    });
  }
}
