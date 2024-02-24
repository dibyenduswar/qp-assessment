import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
    
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}
   
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findByName(productName : string ) : Promise<Product> {
        return this.productModel.findOne({name: productName, isDeleted: false});
    }

    async findById(productId : string ) : Promise<Product> {
        return this.productModel.findOne({id: new mongoose.Types.ObjectId(productId), isDeleted: false}).lean();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new:true });
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, {
            isActive: false,
            isDeleted: true,
            updatedAt: new Date()
        }, { new:true });
    }

}
