import { Type } from 'class-transformer';
import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicsDTO } from './productCharacteristics.dto';
import { ProductImageDTO } from './productImage.dto';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsUUID(undefined, { message: 'Invalid UserId'})
  userId: string;

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
