import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, Product } from 'src/schemas/product.schema';

@Injectable()
export class ListingService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>
    ) {}

    async listProducts() : Promise<Product[]> {
        return this.productModel.aggregate([
            {
                $match: {
                    "isActive" : true,
                    "isDeleted" : false,
                    "inventoryBatch": {
                        $ne: null
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "inventoryBatch",
                    foreignField: "inventories.batchNo",
                    as: "matchedInventory"
                }
            },
            {
                $unwind: "$matchedInventory"
            },
            {
                $replaceRoot: { newRoot: "$matchedInventory" }
            },
            {
                $project: {
                    "_id": 1,
                    "name": 1,
                    "brand": 1,
                    "make": 1,
                    "model": 1,
                    "unitQuantity": 1,
                    "minOrderQuantity": 1,
                    "maxOrderQuantity": 1,
                    "usedFor": 1,
                    "isActive": 1,
                    "isDeleted": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "__v": 1,
                    "inventories": {
                        $filter: {
                            input: "$inventories",
                            as: "inventory",
                            cond: {
                                $eq: ["$$inventory.batchNo", "$inventoryBatch"]
                            }
                        }
                    }
                }
            }
        ]);
    }
   
}
