import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderItemDto } from './dto/create-purchase_order_item.dto';
import { UpdatePurchaseOrderItemDto } from './dto/update-purchase_order_item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(private prismaClient: PrismaService) { }

  async create(createPurchaseOrderItemDto: CreatePurchaseOrderItemDto) {
    const {
      quantityOrdered,
      quantityReceived,
      unitCost,
      purchaseOrderId,
      productVariantId,
    } = createPurchaseOrderItemDto;

    return await this.prismaClient.purchaseOrderItem.create({
      data: {
        quantityOrdered,
        quantityReceived,
        unitCost,
        purchaseOrder: {
          connect: {
            id: purchaseOrderId,
          },
        },
        productVariant: {
          connect: {
            id: productVariantId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.purchaseOrderItem.findMany({
      include: {
        purchaseOrder: true,
        productVariant: {
          include: {
            product: {
              include: {
                supplier: true
              }
            }
          },
        }
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.purchaseOrderItem.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto,
  ) {
    return await this.prismaClient.purchaseOrderItem.update({
      where: {
        id,
      },
      data: updatePurchaseOrderItemDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.purchaseOrderItem.delete({
      where: {
        id,
      },
    });
  }
}
