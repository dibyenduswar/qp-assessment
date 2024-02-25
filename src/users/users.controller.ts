import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    @HttpCode(200)
    findAll(): string {
        return 'This action returns all users';
    }
}
