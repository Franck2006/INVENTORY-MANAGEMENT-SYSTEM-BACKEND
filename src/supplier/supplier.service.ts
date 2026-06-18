import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private prismaClient: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const { companyName, contactName, phone, email } = createSupplierDto;
    return await this.prismaClient.supplier.create({
      data: {
        companyName,
        contactName,
        phone,
        email,
      },
    });
  }

  async findAll() {
    return await this.prismaClient.supplier.findMany({
      include: {
        products: true,
        purchaseOrders: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.supplier.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
        purchaseOrders: true,
      },
    });
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return await this.prismaClient.supplier.update({
      where: {
        id,
      },
      data: updateSupplierDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.supplier.delete({
      where: {
        id,
      },
    });
  }
}
