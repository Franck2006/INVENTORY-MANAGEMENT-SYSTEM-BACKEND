import { Module } from '@nestjs/common';
import { InventoryLevelService } from './inventory-level.service';
import { InventoryLevelController } from './inventory-level.controller';

@Module({
  controllers: [InventoryLevelController],
  providers: [InventoryLevelService],
})
export class InventoryLevelModule {}
