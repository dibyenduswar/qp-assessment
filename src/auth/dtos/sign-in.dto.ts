import { IsNotEmpty , IsDecimal, IsNumber, IsArray, Max } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}
