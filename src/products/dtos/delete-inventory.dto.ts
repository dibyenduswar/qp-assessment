import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';
import mongoose from 'mongoose';

export class DeleteInventoryDto {
    @IsNotEmpty()
    productID: string;

    @IsNotEmpty()
    batchNo: string;
}