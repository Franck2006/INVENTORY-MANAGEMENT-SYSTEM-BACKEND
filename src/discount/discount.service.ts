import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { DiscountType } from 'generated/prisma/enums';

@Injectable()
export class DiscountService {
  constructor(private prismaClient: PrismaService) {}

  async create(createDiscountDto: CreateDiscountDto) {
    const { code, type, value, startDate, endDate } = createDiscountDto;

    return await this.prismaClient.discount.create({
      data: {
        code,
        type,
        value,
        startDate,
        endDate,
      },
    });
  }

  async findAll() {
    return await this.prismaClient.discount.findMany({
      include: {
        orders: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.discount.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
      },
    });
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    return await this.prismaClient.discount.update({
      where: {
        id,
      },
      data: updateDiscountDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.discount.delete({
      where: {
        id,
      },
    });
  }
}