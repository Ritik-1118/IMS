import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema( {
    rowMaterials: [{type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel'}],
    workInProgress: [{type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel'}],
    Finished: [{type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel'}],
    inventoryLevel: { type: String, enum: [ 'OverStock', 'UnderStock', 'Average' ], default: "Average"},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true } );

const Inventory = mongoose.model( 'Inventory', inventorySchema );

export default Inventory;

