export class CreateProductVariantDto {
  sku: string;
  size: string;
  color: string;

  price: string;
  lowStockThreshold: number;
  productId: string;
}
