export class CreateOrderDto {
  userId: string;
  customerId: string;
  locationId: string;
  discountId: string;
  paymentMethod: string;
  totalAmount: number;
}
