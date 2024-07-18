import SalesOrder from '../models/SalesOrder.js';
import ItemModel from '../models/Item.js';
import PurchaseOrder from '../models/PurchaseOrders.js';

// Create a new sales order
export const createSalesOrder = async ( req, res ) => {
    try {
        const { customerId, items, totalAmount } = req.body;
        const userId = req.cookies.user._id;

        // Validate item quantities
        for ( const item of items ) {
            const inventoryItem = await ItemModel.findById( item.itemId );
            if ( !inventoryItem ) {
                return res.status( 400 ).json( { message: `Item with ID ${item.itemId} not found` } );
            }
        }

        const newSalesOrder = new SalesOrder( { customerId, items, totalAmount, userId } );
        const savedOrder = await newSalesOrder.save();
        res.status( 201 ).json( savedOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all sales orders
export const getAllSalesOrders = async ( req, res ) => {
    try {
        const salesOrders = await SalesOrder.find().populate( 'customerId' ).populate( 'items.itemId' );
        res.status( 200 ).json(salesOrders );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

//  get both sales and purchase orders
export const getAllOrders = async ( req, res ) => {
    try {
        const salesOrders = await SalesOrder.find().populate( 'customerId' ).populate( 'items.itemId' );
        // get total Price
        let totalSalesPrice = 0;
        for (const order of salesOrders) {
            for (const item of order.items) {
                const itemPrice = item.itemId.price;
                const itemQuantity = item.quantity;
                totalSalesPrice += itemPrice * itemQuantity;
            }
        }
        const purchaseOrders = await PurchaseOrder.find().populate( 'supplierId' ).populate( 'items.itemId' );
        let totalPurchasePrice = 0;
        for (const order of purchaseOrders) {
            for (const item of order.items) {
                const itemPrice = item.itemId.price;
                const itemQuantity = item.quantity;
                totalPurchasePrice += itemPrice * itemQuantity;
            }
        }
        res.status( 200 ).json({ "sales":salesOrders, "purchase":purchaseOrders, "totalSalesPrice": totalSalesPrice, "totalPurchasePrice": totalPurchasePrice} );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get a sales order by ID
export const getSalesOrderById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const salesOrder = await SalesOrder.findById( id ).populate( 'customerId' ).populate( 'items.itemId' );

        if ( !salesOrder ) {
            return res.status( 404 ).json( { message: 'Sales order not found' } );
        }

        res.status( 200 ).json( salesOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Update a sales order by ID
export const updateSalesOrder = async ( req, res ) => {
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

        const updatedOrder = await SalesOrder.findByIdAndUpdate(
            id,
            { items, status, totalAmount },
            { new: true }
        ).populate( 'customerId' ).populate( 'items.itemId' );

        if ( !updatedOrder ) {
            return res.status( 404 ).json( { message: 'Sales order not found' } );
        }

        res.status( 200 ).json( updatedOrder );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Delete a sales order by ID
export const deleteSalesOrder = async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedOrder = await SalesOrder.findByIdAndDelete( id );

        if ( !deletedOrder ) {
            return res.status( 404 ).json( { message: 'Sales order not found' } );
        }

        res.status( 200 ).json( { message: 'Sales order deleted successfully' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

export const getMonthlySalesData = async(req, res) =>{
    try {
        const salesOrders = await SalesOrder.find();

        // Initialize array with 12 zeros
        const salesAmount = Array(12).fill(0);

        salesOrders.forEach((order) => {
            // Use createdAt or updatedAt to determine the month
            const monthIndex = new Date(order.createdAt).getMonth();
            
            salesAmount[monthIndex] += order.totalAmount;
        });

        res.status(200).json({ salesAmount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}