import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseGuards,  Request, Get } from '@nestjs/common';
import { Add2CartDto } from './dtos/add2cart.dto';
import { OrderService } from './order.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Post('/addToCart')
    @HttpCode(200)
    @Roles('User')
    @UseGuards(AuthGuard, RolesGuard)
    async add2cart(@Body() add2CartDto: Add2CartDto, @Request() req) {
        try {
            add2CartDto.userID = req.user._id;
            return await this.orderService.add2Cart(add2CartDto);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }
    }

    @Post('/checkout')
    @HttpCode(200)
    @Roles('User')
    @UseGuards(AuthGuard, RolesGuard)
    async cart2order(@Request() req) {
        try {
            return await this.orderService.cart2Order(req.user._id);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('/list')
    @HttpCode(200)
    @Roles('User')
    @UseGuards(AuthGuard, RolesGuard)
    async orders(@Request() req) {
        try {
            return await this.orderService.findUserOrders(req.user._id);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }
    }
}
