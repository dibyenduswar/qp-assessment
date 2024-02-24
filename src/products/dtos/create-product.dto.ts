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
    minOrderQuantity: number;

    @IsNumber()
    maxOrderQuantity: number;

    @IsNotEmpty()
    @IsArray()
    usedFor: [string];
}