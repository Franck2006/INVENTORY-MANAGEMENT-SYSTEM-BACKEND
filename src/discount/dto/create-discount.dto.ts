import { DiscountType } from "generated/prisma/enums";

export class CreateDiscountDto {
  code: string;
  type: DiscountType;
  value: number;
  startDate: Date;
  endDate: Date;
}