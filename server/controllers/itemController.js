import ItemModel from '../models/Item.js';
import Inventory from '../models/Inventory.js';

// Get all items
export const getAllItems = async ( req, res ) => {
    try {
        const items = await ItemModel.find();
        // console.log(items)
        res.status( 200 ).json( items );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get an item by ID
export const getItemById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const item = await ItemModel.findById( id );

        if ( !item ) {
            return res.status( 404 ).json( { message: 'Item not found' } );
        }

        res.status( 200 ).json( item );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get items by category
export const getItemsByCategory = async ( req, res ) => {
    // console.log(req.params)
    try {
        const { category } = req.params;
        const items = await ItemModel.find( { category } );

        if ( items.length === 0 ) {
            return res.status( 404 ).json( { message: 'No items found for this category' } );
        }

        res.status( 200 ).json( items );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get items by item level
export const getItemsByItemLevel = async ( req, res ) => {
    try {
        const { itemLevel } = req.params;
        const items = await ItemModel.find( { itemLevel } );

        if ( items.length === 0 ) {
            return res.status( 404 ).json( { message: 'No items found for this item level' } );
        }

        res.status( 200 ).json( items );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Create a new item and add it to inventory
export const createItem = async ( req, res ) => {
    // console.log(req.body)
    try {
        const { itemName, description, price, category, itemLevel, inventoryType } = req.body;
        const userId = req.user._id;
        const newItem = new ItemModel( { itemName, description, price, category, itemLevel, userId } );
        const savedItem = await newItem.save();

        let inventoryField;

        switch ( inventoryType ) {
            case 'rowMaterials':
                inventoryField = 'rowMaterials';
                break;
            case 'workInProgress':
                inventoryField = 'workInProgress';
                break;
            case 'Finished':
                inventoryField = 'Finished';
                break;
            default:
                return res.status( 400 ).json( { message: 'Invalid inventory type' } );
        }

        const inventory = await Inventory.findOne();
        if ( !inventory ) {
            const newInventory = new Inventory( { [ inventoryField ]: [ savedItem._id ] } );
            await newInventory.save();
        } else {
            inventory[ inventoryField ].push( savedItem._id );
            await inventory.save();
        }

        res.status( 201 ).json( savedItem );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Update an item by ID
export const updateItem = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { itemName, description, price, category, itemLevel } = req.body;
        const userId = req.user._id;
        const updatedItem = await ItemModel.findByIdAndUpdate(
            id,
            { itemName, description, price, category, itemLevel, userId },
            { new: true }
        );

        if ( !updatedItem ) {
            return res.status( 404 ).json( { message: 'Item not found' } );
        }

        res.status( 200 ).json( updatedItem );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Delete an item by ID
export const deleteItem = async ( req, res ) => {
    try {
        const { id } = req.params;
        const deletedItem = await ItemModel.findByIdAndDelete( id );

        if ( !deletedItem ) {
            return res.status( 404 ).json( { message: 'Item not found' } );
        }

        // Remove the item ID from the inventory arrays
        const inventory = await Inventory.findOne();
        if ( inventory ) {
            inventory.rowMaterials.pull( deletedItem._id );
            inventory.workInProgress.pull( deletedItem._id );
            inventory.Finished.pull( deletedItem._id );
            await inventory.save();
        }

        res.status( 200 ).json( { message: 'Item deleted successfully' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};
