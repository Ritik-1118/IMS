import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema( {
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
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

const PurchaseOrder = mongoose.model( 'PurchaseOrder', purchaseOrderSchema );
export default PurchaseOrder;
