import { Controller, Get, HttpCode, HttpException, HttpStatus, Req } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { ListingService } from './listing.service';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/product.schema';
import { Model } from 'mongoose';

@Controller('listing')
export class ListingController {
    constructor(
        private listingService: ListingService
    ) {}

    @Get('/products')
    @HttpCode(200)
    findAll(@Req() request: Request) {
        try {
            return this.listingService.listProducts();
        } catch(err) {
            throw new HttpException('Error in listing items!', HttpStatus.FORBIDDEN);
        }
    }
}
