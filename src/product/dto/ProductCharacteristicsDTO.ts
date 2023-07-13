import { IsNotEmpty, MaxLength } from 'class-validator';

export class ProductCharacteristicsDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}
