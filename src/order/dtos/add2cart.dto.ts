import { IsNotEmpty , IsDecimal, IsNumber, IsArray, Min, Max } from 'class-validator';

export class Add2CartDto {
    // @IsNotEmpty()
    userID: string;

    @IsNotEmpty()
    productID: string

    @IsNotEmpty()
    @Min(1)
    @Max(100)
    orderQty: number
}