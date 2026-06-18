export class CreatePurchaseOrderDto {
  totalCost: number;
  supplierId: string;
  status: OrderStatus;
}

enum OrderStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}
