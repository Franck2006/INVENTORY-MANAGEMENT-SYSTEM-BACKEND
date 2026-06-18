import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryLevelDto } from './create-inventory-level.dto';

export class UpdateInventoryLevelDto extends PartialType(CreateInventoryLevelDto) {}
