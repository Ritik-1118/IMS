import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema( {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemModel', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' },
    totalAmount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true } );

const SalesOrder = mongoose.model( 'SalesOrder', salesOrderSchema );
export default SalesOrder;
