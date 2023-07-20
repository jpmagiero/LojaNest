import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/createProduct.dto';
import { ProductEntity } from './product.entity';
import { v4 as uuid } from 'uuid';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Controller('/products')
export class ProductController {
  constructor(private productRepository: ProductRepository) { }

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.name = productData.name;
    productEntity.userId = productData.userId;
    productEntity.value = productData.value;
    productEntity.availableQuantity = productData.availableQuantity;
    productEntity.description = productData.description;
    productEntity.characteristics = productData.characteristics;
    productEntity.images = productData.images;
    productEntity.category = productData.category;
    productEntity.creationDate = productData.creationDate;
    productEntity.updateDate = productData.updateDate;

    this.productRepository.save(productEntity);
    return { 
      product: productData, 
      message: 'Product created successfully' 
    };
  }

  @Get()
  async listProduct() {
    return this.productRepository.list();
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() newData: UpdateProductDTO) {
    const productUpdated = await this.productRepository.update(id, newData);

    return {
      product: productUpdated,
      message: 'Product updated successfully'
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string){
    const productDeleted = await this.productRepository.delete(id);

    return {
      user: productDeleted,
      message: 'Product delete successfully'
    }
  }

}
