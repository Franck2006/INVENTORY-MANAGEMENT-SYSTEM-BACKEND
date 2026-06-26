import { Decimal } from "@prisma/client/runtime/client";

export interface CreatePurchaseOrderDto {
  supplierName: string;
  totalCost: number; // Prisma handles Decimal objects, but they serialize to numbers/strings
  status: OrderStatus;
  expectedDelivery: Date; // Nullable fields in Prisma should be nullable in TS
  supplierId: string;
  totalItems: number;
}
enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}
