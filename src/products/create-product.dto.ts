import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    make: string;

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    unitQuantity: number;

    @IsNumber()
    minOrderQuantiry: number;

    @IsNumber()
    maxOrderQuantiry: number;

    @IsNotEmpty()
    @IsArray()
    usedFor: [string];
}