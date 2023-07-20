import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";
import { ProductImageDTO } from "./productImage.dto";
import { ProductCharacteristicsDTO } from "./productCharacteristics.dto";

export class UpdateProductDTO {

    @IsUUID(undefined, { message: 'Invalid productId' })
    id: string;

    @IsUUID(undefined, { message: 'Invalid userId' })
    userId: string;

    @IsString()
    @IsNotEmpty({ message: 'Product name cannot be empty' })
    @IsOptional()
    name: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @IsOptional()
    @Min(1, { message: 'The value must be greater than zero' })
    @IsOptional()
    value: number;

    @IsNumber()
    @Min(0, { message: 'Invalid minimum quantity' })
    @IsOptional()
    availableQuantity: number;

    @IsString()
    @IsOptional()
    description: string;

    @ValidateNested()
    @IsArray()
    @Type(() => ProductCharacteristicsDTO)
    @IsOptional()
    characteristics: ProductCharacteristicsDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ProductImageDTO)
    @IsOptional()
    images: ProductImageDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Product category cannot be empty' })
    @IsOptional()
    category: string;

}
