import { ProductCharacteristicsDTO } from "./dto/productCharacteristics.dto";
import { ProductImageDTO } from "./dto/productImage.dto";

export class ProductEntity {
    id: string;
    name: string;
    userId: string;
    value: number;
    availableQuantity: number;
    description: string;
    characteristics: ProductCharacteristicsDTO[];
    images: ProductImageDTO[];
    category: string;
    creationDate: string;
    updateDate: string;
}