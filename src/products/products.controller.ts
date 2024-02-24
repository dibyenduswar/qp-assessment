import { Body, Controller, Get, HttpCode, Post, Req, } from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    @HttpCode(200)
    findAll(@Req() request: Request): string {
        return 'This action returns all products';
    }

    @Post('/create')
    @HttpCode(201)
    create(@Body() createProductDto: CreateProductDto): string {
        console.log(createProductDto)
        return 'This action create a new product';
    }
}
