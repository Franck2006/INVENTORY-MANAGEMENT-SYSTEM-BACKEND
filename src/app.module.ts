import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseService } from './supabase/supabase.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { PurchaseOrdersModule } from './purchase_orders/purchase_orders.module';
import { PurchaseOrderItemsModule } from './purchase_order_items/purchase_order_items.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { LocationModule } from './location/location.module';
import { StcockMovementModule } from './stcock-movement/stcock-movement.module';
import { InventoryLevelModule } from './inventory-level/inventory-level.module';
import { StockMovementModule } from './stock-movement/stock-movement.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    SupplierModule,
    ProductVariantsModule,
    PurchaseOrdersModule,
    PurchaseOrderItemsModule,
    CustomerModule,
    OrderModule,
    LocationModule,
    StcockMovementModule,
    InventoryLevelModule,
    StockMovementModule,
    OrderItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, SupabaseService],
})
export class AppModule {}
