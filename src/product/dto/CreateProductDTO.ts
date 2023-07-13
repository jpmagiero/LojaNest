import { Type } from 'class-transformer';
import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicsDTO } from './ProductCharacteristicsDTO';
import { ProductImageDTO } from './ProductImageDTO';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  value: number;

  @IsNumber()
  @Min(0)
  availableQuantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @Type(() => ProductCharacteristicsDTO)
  characteristics: [];

  @ValidateNested()
  @IsArray()
  @Type(() => ProductImageDTO)
  images: [];

  @IsNotEmpty()
  category: string;

  @IsISO8601()
  creationDate: string;

  @IsISO8601()
  updateDate: string;
}
