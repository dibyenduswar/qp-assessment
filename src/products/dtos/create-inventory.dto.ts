import { IsNotEmpty , IsDecimal, IsNumber, IsArray } from 'class-validator';

export class CreateInventoryDto {
    @IsNotEmpty()
    productID: string;

    @IsNotEmpty()
    batchNo: string;

    @IsNotEmpty()
    @IsNumber()
    stockQty: number;

    @IsNotEmpty()
    expiry: string;

    @IsNotEmpty()
    isActive: Boolean;

    @IsNumber()
    priceListing: number;

    @IsNumber()
    priceListingDisc: number;

    // @IsNumber()
    // priceListingEffective: number;
}