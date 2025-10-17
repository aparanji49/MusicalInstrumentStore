import { model, Schema, Types } from "mongoose";


const CartItemSchema = new Schema(
    {
        product: {
            type: Types.ObjectId,
            ref:"Product",
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            min: 1
        },
        priceSnapshot: {
            type: Number,
        },
    },
    {
        _id: false,
    }
);

const CartSchema = new Schema(
    {
        userId:{
            type: Types.ObjectId,
            ref: "User",
            index:true,
            sparse: true,
        },
        guestId:{
            type: String,
            index: true,
            sparse: true
        },
        items:{
            type: [CartItemSchema],
            default: [],
        },
        status:{
            type: String,
            enum: ["active", "ordered", "abandoned"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

CartSchema.index(
    {
        userId: 1,
        guestId: 1,
        status: 1
    }
);

export default model("Cart", CartSchema);