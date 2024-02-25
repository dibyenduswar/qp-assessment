import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema, Product, ProductSchema } from './schemas/product.schema';
import { User, UserSchema } from './schemas/user.schema';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ListingController } from './listing/listing.controller';
import { ListingService } from './listing/listing.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://qp-assessment-admin:kcQRgZfl0UI4ViFS@cluster0.nxrvjlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Inventory.name, schema: InventorySchema },
      { name: User.name, schema: UserSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Order.name, schema: OrderSchema }
    ]),
    UsersModule
  ],
  controllers: [AppController, ProductsController, AuthController, ListingController, OrderController  ],
  providers: [AppService, ProductsService, AuthService, ListingService, OrderService ],
})

export class AppModule {}
