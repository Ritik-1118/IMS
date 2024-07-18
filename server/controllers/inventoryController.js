import Inventory from '../models/Inventory.js';
import ItemModel from '../models/Item.js';

// Get all rowMaterials IDs
export const getAllRowMaterials = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().select( 'rowMaterials' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.rowMaterials );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all workInProgress IDs
export const getAllWorkInProgress = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().select( 'workInProgress' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.workInProgress );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all finished IDs
export const getAllFinished = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().select( 'Finished' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.Finished );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all rowMaterials items
export const getAllRowMaterialItems = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().populate( 'rowMaterials' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.rowMaterials );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all workInProgress items
export const getAllWorkInProgressItems = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().populate( 'workInProgress' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.workInProgress );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all finished items
export const getAllFinishedItems = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().populate( 'Finished' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.Finished );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get current inventory level
export const getCurrentInventoryLevel = async ( req, res ) => {
    try {
        const inventory = await Inventory.findOne().select( 'inventoryLevel' );
        if ( !inventory ) {
            return res.status( 404 ).json( { message: 'No inventory found' } );
        }
        res.status( 200 ).json( inventory.inventoryLevel );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};
