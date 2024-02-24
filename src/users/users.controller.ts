import { Controller, Get, HttpCode, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    @HttpCode(200)
    findAll(@Req() request: Request): string {
        return 'This action returns all users';
    }
}
