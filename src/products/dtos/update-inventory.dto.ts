import { IsNotEmpty , IsDecimal, IsNumber, IsArray, Max } from 'class-validator';

export class UpdateInventoryDto {
    @IsNotEmpty()
    productID: string;

    @IsNotEmpty()
    id: string;

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
    @Max(90, { message: 'priceListingDisc must be less than 100' })
    priceListingDisc: number;

    // @IsNumber()
    // priceListingEffective: number;
}
