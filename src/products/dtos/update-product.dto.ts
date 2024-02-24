import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateProductDto {
    @IsNotEmpty()
    id: string;

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

    updatedAt: Date
}