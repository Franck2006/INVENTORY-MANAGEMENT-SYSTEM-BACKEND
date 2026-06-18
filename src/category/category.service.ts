import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaClient: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, slug, product_id } = createCategoryDto;

    return await this.prismaClient.category.create({
      data: {
        name,
        slug,
        products: {
          connect: {
            id: product_id,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaClient.category.findMany({
      include: {
        products: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaClient.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prismaClient.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return await this.prismaClient.category.delete({
      where: {
        id,
      },
    });
  }
}
