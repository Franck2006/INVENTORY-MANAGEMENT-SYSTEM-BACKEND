import { Injectable } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductVariantsService {
  constructor(private prismaClient: PrismaService) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    const { sku, size, color, price, lowStockThreshold, productId } =
      createProductVariantDto;
    return await this.prismaClient.productVariant.create({
      data: {
        sku,
        size,
        color,
        price,
        lowStockThreshold,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.productVariant.findMany({
      include: {
        product: true,
        orderItems: true,
        inventoryLevels: true,
        purchaseOrderItems: true,
        stockMovements: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.productVariant.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        orderItems: true,
        inventoryLevels: true,
        purchaseOrderItems: true,
        stockMovements: true,
      },
    });
  }

  async update(id: string, updateProductVariantDto: UpdateProductVariantDto) {
    return await this.prismaClient.productVariant.update({
      where: {
        id,
      },
      data: updateProductVariantDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.productVariant.delete({
      where: {
        id,
      },
    });
  }
}
