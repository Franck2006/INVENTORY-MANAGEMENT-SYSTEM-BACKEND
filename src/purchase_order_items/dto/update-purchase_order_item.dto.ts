import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseOrderItemDto } from './create-purchase_order_item.dto';

export class UpdatePurchaseOrderItemDto extends PartialType(CreatePurchaseOrderItemDto) {}
