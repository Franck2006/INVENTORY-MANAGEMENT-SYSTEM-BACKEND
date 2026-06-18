import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prismaClient: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { name, phone, email, loyaltyPoints } = createCustomerDto;
    return await this.prismaClient.customer.create({
      data: {
        name,
        phone,
        email,
        loyaltyPoints,
      },
    });
  }

  async findAll() {
    return await this.prismaClient.customer.findMany({
      include: {
        orders: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaClient.customer.findUnique({
      where: {
        id,
      },
      include: {
        orders: true,
      },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.prismaClient.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.customer.delete({
      where: {
        id,
      },
    });
  }
}
