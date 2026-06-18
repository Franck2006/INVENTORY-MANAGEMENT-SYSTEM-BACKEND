import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaClient: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const {
      userId,
      customerId,
      locationId,
      discountId,
      paymentMethod,
      totalAmount,
    } = createOrderDto;

    return await this.prismaClient.order.create({
      data: {
        paymentMethod,
        totalAmount,
        user: {
          connect: {
            id: userId,
          },
        },
        location: {
          connect: {
            id: locationId,
          },
        },
        customer: {
          connect: {
            id: customerId,
          },
        },
        discount: {
          connect: {
            id: discountId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.order.findMany({
      include: {
        user: true,
        location: true,
        customer: true,
        discount: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.order.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        location: true,
        customer: true,
        discount: true,
      },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prismaClient.order.update({
      where: {
        id,
      },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.order.delete({
      where: {
        id,
      },
    });
  }
}
