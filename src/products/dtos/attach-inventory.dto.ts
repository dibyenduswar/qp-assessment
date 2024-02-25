import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';

export class AttachInventoryDto {
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    inventoryBatch: string
}