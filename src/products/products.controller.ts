import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteProductDto } from './dtos/delete-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    findAll(@Req() request: Request): string {
        return 'This action returns all products';
    }

    @Post('/')
    @HttpCode(201)
    async create(@Body() createProductDto: CreateProductDto) {
        let product = await this.productsService.findByName(createProductDto.name);
        if(product) {
            throw new HttpException('The item already exists!', HttpStatus.CONFLICT);
        } else {
            product = await this.productsService.create(createProductDto);
            return product;
        }
    }

    @Put('/')
    @HttpCode(200)
    async update(@Body() updateProductDto: UpdateProductDto) {
        let product = await this.productsService.findById(updateProductDto.id);
        if(!product) {
            throw new HttpException('The item is not available!', HttpStatus.NOT_FOUND);
        } else {
            product.updatedAt = new Date();
            product = await this.productsService.update(updateProductDto.id, updateProductDto);
            return product;
        }
    }

    @Delete('/')
    @HttpCode(200)
    async delete(@Body() deleteProductDto: DeleteProductDto) {
        let product = await this.productsService.findById(deleteProductDto.id);
        if(!product) {
            throw new HttpException('The item is not available!', HttpStatus.NOT_FOUND);
        } else {
            product = await this.productsService.delete(deleteProductDto.id);
            return product;
        }
    }
}
