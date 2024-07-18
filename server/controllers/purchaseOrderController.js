import PurchaseOrder from '../models/PurchaseOrders.js';
import ItemModel from '../models/Item.js';
import Supplier from '../models/Supplier.js';

// Create a new purchase order
export const createPurchaseOrder = async ( req, res ) => {
    try {
        const { supplierId, items, totalAmount } = req.body;
        const userId = req.cookies.user._id;

        const supplier = await Supplier.findById( supplierId );
        if ( !supplier ) {
            return res.status( 400 ).json( { message: `Supplier with ID ${supplierId} not found` } );
        }

        for ( const item of items ) {
            const inventoryItem = await ItemModel.findById( item.itemId );
            if ( !inventoryItem ) {
                return res.status( 400 ).json( { message: `Item with ID ${item.itemId} not found` } );
            }
        }

        const newPurchaseOrder = new PurchaseOrder( { supplierId, items, totalAmount, userId } );
        const savedOrder = await newPurchaseOrder.save();
        res.status( 201 ).json( savedOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all purchase orders
export const getAllPurchaseOrders = async ( req, res ) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate( 'supplierId' ).populate( 'items.itemId' );
        res.status( 200 ).json( purchaseOrders );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get a purchase order by ID
export const getPurchaseOrderById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findById( id ).populate( 'supplierId' ).populate( 'items.itemId' );

        if ( !purchaseOrder ) {
            return res.status( 404 ).json( { message: 'Purchase order not found' } );
        }

        res.status( 200 ).json( purchaseOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Update a purchase order by ID
export const updatePurchaseOrder = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { items, status, totalAmount } = req.body;

        // Validate item quantities
        for ( const item of items ) {
            const inventoryItem = await ItemModel.findById( item.itemId );
            if ( !inventoryItem ) {
                return res.status( 400 ).json( { message: `Item with ID ${item.itemId} not found` } );
            }
        }

        const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
            id,
            { items, status, totalAmount },
            { new: true }
        ).populate( 'supplierId' ).populate( 'items.itemId' );

        if ( !updatedOrder ) {
            return res.status( 404 ).json( { message: 'Purchase order not found' } );
        }

        res.status( 200 ).json( updatedOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Delete a purchase order by ID
export const deletePurchaseOrder = async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedOrder = await PurchaseOrder.findByIdAndDelete( id );

        if ( !deletedOrder ) {
            return res.status( 404 ).json( { message: 'Purchase order not found' } );
        }

        res.status( 200 ).json( { message: 'Purchase order deleted successfully' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};
