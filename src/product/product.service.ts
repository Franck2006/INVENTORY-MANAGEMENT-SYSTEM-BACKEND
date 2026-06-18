import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaClient: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, basePrice, categoryId, supplierId } =
      createProductDto;

    return await this.prismaClient.product.create({
      data: {
        name,
        description,
        basePrice,
        supplier: {
          connect: {
            id: supplierId,
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.product.findMany({
      include: {
        supplier: true,
        category: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prismaClient.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.product.delete({
      where: {
        id,
      },
    });
  }
}
