import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prismaClient: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const { quantity, unitPrice, orderId, productVariantId } =
      createOrderItemDto;
    return await this.prismaClient.orderItem.create({
      data: {
        quantity,
        unitPrice,
        order: {
          connect: {
            id: orderId,
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
    return await this.prismaClient.orderItem.findMany({
      include: {
        order: true,
        productVariant: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.orderItem.findUnique({
      where: {
        id,
      },
      include: {
        order: true,
        productVariant: true,
      },
    });
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return await this.prismaClient.orderItem.update({
      where: {
        id,
      },
      data: updateOrderItemDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.orderItem.delete({
      where: {
        id,
      },
    });
  }
}
