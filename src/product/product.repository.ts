import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = [];

  async save(product: ProductEntity) {
    this.products.push(product);
    return product;
  }

  async list() {
    return this.products;
  }

  async findByProductId(id: string) {
    const product = this.products.find(
      saveProduct => saveProduct.id == id 
    );

    if(!product) {
      throw new Error('Product does not exist');
    }

    return product;
  }

  async update(id: string, updateData: Partial<ProductEntity>) {
    const product = this.findByProductId(id);

    Object.entries(updateData).forEach(([key, value]) => {
      if(key === 'id') {
        return;
      }

      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const product = this.findByProductId(id);

    this.products = this.products.filter(
      (saveProduct) => saveProduct.id !== id
    );
    
    return product;
  }
}
