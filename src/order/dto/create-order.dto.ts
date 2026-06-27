export class CreateOrderDto {
  userId: string;
  customerId: string;
  locationId: string;
  discountId: string;
  paymentMethod: string;
  totalAmount: number;
  items?: OrderItemPayload[];
}

export class OrderItemPayload {
  productVariantId: string;
  quantity: number;
  unitPrice: number;
}