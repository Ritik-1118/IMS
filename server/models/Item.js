import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema( {
    itemName: { type: String, required: true },
    description: { type: String },
    quantity:{type:Number},
    price: { type: Number, required: true },
    category:{type: String, required: true},
    itemLevel: { type: Number, default: 1},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true } );

const ItemModel = mongoose.model( 'ItemModel', itemSchema );

export default ItemModel;

