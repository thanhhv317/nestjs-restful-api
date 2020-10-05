import { Controller, Get, Res, HttpStatus, Post, Body, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    // GET single product: /product/5f7b32c255bbba2242791938
    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID ) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException("Product does not exit!");
        return res.status(HttpStatus.OK).json(product);
    }

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: "The product successfully created",
            product
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('productID') productID: string, @Body() createProductDTO: CreateProductDTO) {
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO);
        if (!updateProduct) throw new NotFoundException("Product does not exit!")
        return res.status(HttpStatus.OK).json({
            message: "The product updated successfully!",
            updateProduct
        })
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID: string) {
        const deleteProduct = await this.productService.deleteProduct(productID);
        if (!deleteProduct) throw new NotFoundException("Product does not exit!")
        return res.status(HttpStatus.OK).json({
            message: "The product deleted successfully!",
            deleteProduct
        })
    }
}
