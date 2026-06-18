export class CreatePurchaseOrderItemDto {
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
  purchaseOrderId: string;
  productVariantId: string;
}
