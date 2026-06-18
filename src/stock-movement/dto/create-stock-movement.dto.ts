export class CreateStockMovementDto {
  quantity: number;
  type: MovementType;
  reason: string;
  productVariantId: string;
  locationId: string;
  userId: string;
}

enum MovementType {
  SALE = 'SALE',
  RESTOCK = 'RESTOCK',
  RETURN = 'RETURN',
  DAMAGED = 'DAMAGED',
}
