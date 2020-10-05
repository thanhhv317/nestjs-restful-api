import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';


@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    // Get all product
    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    // Get a product
    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID);
        return product;
    }

    // Post a single product
    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newProduct = new this.productModel(createProductDTO);
        return newProduct.save();
    }

    // Update a product
    async updateProduct(productID: string, createProductCTO: CreateProductDTO) : Promise<Product> {
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductCTO, {new: true})
        return updateProduct;
    }

    // Delete a Product
    async deleteProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(productID);
        return product;
    }
}