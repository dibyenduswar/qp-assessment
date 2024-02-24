import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';
import mongoose from 'mongoose';

export class DeleteProductDto {
    @IsNotEmpty()
    id: string;
}