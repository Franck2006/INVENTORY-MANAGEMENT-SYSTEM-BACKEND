import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class OrderService {
  constructor(private prismaClient: PrismaService) { }

  async createOrder(dto: CreateOrderDto, userId: string) {
    // 1. Calculate and build everything inside a robust Prisma Transaction
    return this.prismaClient.$transaction(async (tx) => {
      let totalAmount = 0;
      let discountId: string | null = null;
      const orderItemsData: Prisma.OrderItemCreateWithoutOrderInput[] = [];

      // 2. Validate and handle discount if provided
      if (dto.discountId) {
        const discount = await tx.discount.findUnique({
          where: { code: dto.discountId },
        });
        if (!discount || new Date() > discount.endDate || new Date() < discount.startDate) {
          throw new BadRequestException('Invalid or expired discount code');
        }
        discountId = discount.id;
      }

      // 3. Process each item, check stock level, and compute prices
      if (!dto.items || dto.items.length === 0) {
        throw new BadRequestException('No items provided for order');
      }
      for (const item of dto.items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.productVariantId },
          include: { product: true },
        });

        if (!variant) {
          throw new NotFoundException(`Product Variant with ID ${item.productVariantId} not found`);
        }

        // Deduce item price (variant overriding base price)
        const unitPrice = variant.price ? Number(variant.price) : Number(variant.product.basePrice);
        const itemTotal = unitPrice * item.quantity;
        totalAmount += itemTotal;

        // Check Inventory Availability at the selected Location
        const inventory = await tx.inventoryLevel.findUnique({
          where: {
            productVariantId_locationId: {
              productVariantId: item.productVariantId,
              locationId: dto.locationId,
            },
          },
        });

        if (!inventory || inventory.quantity < item.quantity) {
          throw new BadRequestException(`Insufficient stock for SKU ${variant.sku} at this location`);
        }

        // Decrement physical stock level
        await tx.inventoryLevel.update({
          where: { id: inventory.id },
          data: { quantity: { decrement: item.quantity } },
        });

        // Track the movement historical log
        await tx.stockMovement.create({
          data: {
            quantity: item.quantity,
            type: 'SALE',
            locationId: dto.locationId,
            productVariantId: item.productVariantId,
            userId: userId,
            reason: 'Customer Checkout Sale',
          },
        });

        orderItemsData.push({
          quantity: item.quantity,
          unitPrice: unitPrice,
          productVariant: {
            connect: { id: item.productVariantId } // This is how Prisma handles foreign keys on creation
          }
        });
      }

      // 4. Apply total discount calculation if valid code exists
      if (dto.discountId) {
        // Example logic: handles fixed or flat percentage logic based on your DiscountType structure
        const discountEntity = await tx.discount.findUnique({ where: { id: discountId! } });
        // Assuming flat deduction here for simplicity; adapt to your type field if percentage
        totalAmount = Math.max(0, totalAmount - Number(discountEntity!.value));
      }

      // 5. Build and insert the parent order record along with child list items
      const createdOrder = await tx.order.create({
        data: {
          locationId: dto.locationId,
          userId: userId, // Logged in user/employee handling checkout
          customerId: dto.customerId || null,
          discountId: discountId,
          paymentMethod: dto.paymentMethod,
          totalAmount: totalAmount,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      // 6. Give reward points to customer if attached
      if (dto.customerId) {
        await tx.customer.update({
          where: { id: dto.customerId },
          data: { loyaltyPoints: { increment: Math.floor(totalAmount / 10) } }, // 1 point per $10 spent
        });
      }

      return createdOrder;
    });
  }

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
    const data: any = {};
    if (updateOrderDto.paymentMethod !== undefined) data.paymentMethod = updateOrderDto.paymentMethod;
    if (updateOrderDto.totalAmount !== undefined) data.totalAmount = updateOrderDto.totalAmount;
    if (updateOrderDto.userId) data.user = { connect: { id: updateOrderDto.userId } };
    if (updateOrderDto.locationId) data.location = { connect: { id: updateOrderDto.locationId } };
    if (updateOrderDto.customerId) data.customer = { connect: { id: updateOrderDto.customerId } };
    if (updateOrderDto.discountId) data.discount = { connect: { id: updateOrderDto.discountId } };

    return await this.prismaClient.order.update({
      where: { id },
      data,
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




