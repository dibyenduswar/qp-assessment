import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { UsersController } from './users/users.controller';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://qp-assessment-admin:kcQRgZfl0UI4ViFS@cluster0.nxrvjlc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {}
