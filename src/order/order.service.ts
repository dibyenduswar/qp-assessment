import { Injectable } from '@nestjs/common';
import { Add2CartDto } from './dtos/add2cart.dto';
import { Cart } from 'src/schemas/cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, Product } from 'src/schemas/product.schema';
import mongoose, { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';

@Injectable()
export class OrderService {
    
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
        @InjectModel(Cart.name) private cartModel: Model<Cart>,
        @InjectModel(Order.name) private orderModel: Model<Order>
    ) {}

    async findStock(productID: string, qty: number) {
        return this.productModel.aggregate([
            {
                $match: {
                    "isActive" : true,
                    "isDeleted" : false,
                    '_id': new mongoose.Types.ObjectId(productID),
                    "inventoryBatch": {
                        $ne: null
                    },
                    "minOrderQuantity" : {
                        $lte : qty
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
                    "inventoryBatch" : 1,
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
            },
            {
                $match: {
                    'inventories.stockQty' : {
                        $gte: qty
                    }
                }
            }
        ]);
    }

    async findItemFromCart(productID: string, userID: string) : Promise <Cart> {
        return await this.cartModel.findOne({
            userID: new mongoose.Types.ObjectId(userID),
            productID: new mongoose.Types.ObjectId(productID)
        }).lean();
    }

    async add2Cart(add2CartDto: Add2CartDto): Promise<Cart> {
        
        if(await this.findItemFromCart(add2CartDto.productID, add2CartDto.userID)) {
            throw new Error("Item is already available in your cart!");            
        }

        let product = await this.findStock(add2CartDto.productID, add2CartDto.orderQty);
       
        if(!product.length) {
            throw new Error("Product is not currently serviceable! Try with other products.");           
        } else {
            let newCart = new Cart();
            newCart.productID = new mongoose.Types.ObjectId(add2CartDto.productID);
            newCart.userID = new mongoose.Types.ObjectId(add2CartDto.userID);
            newCart.inventoryBatch = product[0]['inventoryBatch'];
            newCart.orderQty = add2CartDto.orderQty;
            newCart.orderTotalValue = product[0]['inventories'][0]['priceListing'] * newCart.orderQty;
            newCart.orderTotalFinalValue = product[0]['inventories'][0]['priceListingEffective'] * newCart.orderQty;
            newCart.orderTotalDisc = newCart.orderTotalValue - newCart.orderTotalFinalValue;
            newCart.productSnapshot = product;
            return this.cartModel.create(newCart);
        }
    }

    async cart2Order(userID: string): Promise<Order> {

        let cartItems = await this.cartModel.find({
            userID: new mongoose.Types.ObjectId(userID)
        }).lean();

        if(!cartItems.length) {
            throw new Error("Cart is empty!");            
        }
    
        const session = await this.orderModel.db.startSession();    // creating new session
        session.startTransaction();
    
        let orderTotalValue = 0;
        let orderTotalDisc = 0;
        let orderTotalFinalValue = 0;
        let cart: Cart[] = [];
    
        for (const el of cartItems) {
            let item = await this.findStock(el.productID.toString(), el.orderQty);
            if (!item) {
                await session.abortTransaction();
                session.endSession();
                throw new Error("Error in placing order!");
            }
    
            orderTotalValue += el.orderTotalValue;
            orderTotalDisc += el.orderTotalDisc;
            orderTotalFinalValue += el.orderTotalFinalValue;
            cart.push(el);

            await this.productModel.findByIdAndUpdate(
                new mongoose.Types.ObjectId(el.productID) , 
                { $inc: { "inventories.$[elem].stockQty": -el.orderQty } },
                {
                    arrayFilters: [{ "elem.batchNo": el.inventoryBatch }],
                    new: true 
                }
            ).session(session).exec();
        }
    
        let newOrder = new Order();
    
        newOrder.userID = new mongoose.Types.ObjectId(userID);
        newOrder.cart = cart;
        newOrder.orderTotalDisc = orderTotalDisc;
        newOrder.orderTotalFinalValue = orderTotalFinalValue;
        newOrder.orderTotalValue = orderTotalValue;
        
        let newOrderTxn = new this.orderModel(newOrder);

        try{
            let theOrder = await newOrderTxn.save({ session });

            await this.cartModel.deleteMany({userID: new mongoose.Types.ObjectId(userID)})
                .session(session)
                .exec();                         // clearing the cart
           
            await session.commitTransaction();  // commiting session
            session.endSession();               // ending session

            return theOrder;
        } catch(err) {
            await session.abortTransaction();
            session.endSession();
            throw new Error("Error in placing order!");
        }        
    }

    async findUserOrders(userID: string): Promise <Order []> {
        return this.orderModel.find({userID: new mongoose.Types.ObjectId(userID)}).sort({_id: -1}).lean()
    }
}
