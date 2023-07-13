import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}
