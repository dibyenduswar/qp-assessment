import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Inventory, Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateInventoryDto } from './dtos/create-inventory.dto';
import { UpdateInventoryDto } from './dtos/update-inventory.dto';
import { DeleteInventoryDto } from './dtos/delete-inventory.dto';

@Injectable()
export class ProductsService {
    
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>
    ) {}
   
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findByName(productName : string ) : Promise<Product> {
        return this.productModel.findOne({name: productName, isDeleted: false});
    }

    async findById(productId : string ) : Promise<Product> {
        return this.productModel.findOne({id: new mongoose.Types.ObjectId(productId), isDeleted: false}).lean();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new:true });
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, {
            isActive: false,
            isDeleted: true,
            updatedAt: new Date()
        }, { new:true });
    }

    async findProductBatch(id: string, batchNo: string) : Promise<any>{
        return await this.productModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $unwind: '$inventories'
            },
            {
                $match: {
                    'inventories.isDeleted' : false,
                    'inventories.batchNo' : batchNo
                }
            }
        ]);
    }

    async createInventory(id: string, createInventoryDto: CreateInventoryDto): Promise<Product> {
        let item = await this.productModel.findById(id);
        if(!item) throw new Error("Item is not available!");

        let inventoryModel = new this.inventoryModel();
        
        inventoryModel.batchNo = createInventoryDto.batchNo;
        inventoryModel.stockQty = createInventoryDto.stockQty;
        inventoryModel.expiry = createInventoryDto.expiry;
        inventoryModel.isActive = createInventoryDto.isActive;
        inventoryModel.priceListing = createInventoryDto.priceListing;
        inventoryModel.priceListingDisc = createInventoryDto.priceListingDisc || 0;
        inventoryModel.priceListingEffective = createInventoryDto.priceListing * createInventoryDto.priceListingDisc / 100;

        let batchInfo = await this.findProductBatch(id, inventoryModel.batchNo);
        if(batchInfo.length) {
            throw new Error("Product batch already exists.");
        } else {
            return this.productModel.findByIdAndUpdate(id, { $push: { inventories: inventoryModel } }, { new:true }).lean();
        }
    }

    async updateInventory(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Product> {
        
        let item = await this.productModel.findById(updateInventoryDto.productID).lean();
        
        if (!item) {
            throw new Error("Item is not available!");
        }
        
        let batInfo = await this.findProductBatch(updateInventoryDto.productID, updateInventoryDto.batchNo);
        
        if (!batInfo.length) {
            throw new Error("Product batch is not available.");
        }
        
        const inventoryIndex = item.inventories.findIndex(inv => inv.batchNo === updateInventoryDto.batchNo);
        if (inventoryIndex === -1) {
            throw new Error("Product batch is not available.");
        }

        const update = {
            $set: {
                [`inventories.${inventoryIndex}.batchNo`]: updateInventoryDto.batchNo,
                [`inventories.${inventoryIndex}.stockQty`]: updateInventoryDto.stockQty,
                [`inventories.${inventoryIndex}.expiry`]: updateInventoryDto.expiry,
                [`inventories.${inventoryIndex}.priceListing`]: updateInventoryDto.priceListing,
                [`inventories.${inventoryIndex}.priceListingDisc`]: updateInventoryDto.priceListingDisc,
                [`inventories.${inventoryIndex}.priceListingEffective`]: updateInventoryDto.priceListing * (updateInventoryDto.priceListingDisc || 0) / 100,
                [`inventories.${inventoryIndex}.isActive`]: updateInventoryDto.isActive,
                [`inventories.${inventoryIndex}.updatedAt`]: new Date()
            }
        };
        
        return this.productModel.findByIdAndUpdate(
            item._id,
            update,
            { new: true }
        ).lean();       
    }

    async deleteInventory(deleteInventoryDto: DeleteInventoryDto): Promise<Product> {
        
        let item = await this.productModel.findById(deleteInventoryDto.productID).lean();
        
        if (!item) {
            throw new Error("Item is not available!");
        }
               
        const inventoryIndex = item.inventories.findIndex(inv => inv.batchNo.toString() === deleteInventoryDto.batchNo);
        if (inventoryIndex === -1) {
            throw new Error("Product batch is not available.");
        }

        const update = {
            $set: {
                [`inventories.${inventoryIndex}.isActive`]: false,
                [`inventories.${inventoryIndex}.isDeleted`]: true
            }
        };
        
        // Use findByIdAndUpdate to update only the relevant fields
        return this.productModel.findByIdAndUpdate(
            deleteInventoryDto.productID,
            update,
            { new: true }
        ).lean();    
    }
}
 