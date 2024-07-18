import Supplier from '../models/Supplier.js';
import ItemModel from '../models/Item.js';

// Create a new supplier
export const createSupplier = async ( req, res ) => {
    try {
        const { name, contactInfo, itemsSupplied } = req.body;

        // Validate itemsSupplied
        for ( const itemId of itemsSupplied ) {
            const item = await ItemModel.findById( itemId );
            if ( !item ) {
                return res.status( 400 ).json( { message: `Item with ID ${itemId} not found` } );
            }
        }

        const newSupplier = new Supplier( { name, contactInfo, itemsSupplied } );
        const savedSupplier = await newSupplier.save();
        res.status( 201 ).json( savedSupplier );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get all suppliers
export const getSuppliers = async ( req, res ) => {
    try {
        const suppliers = await Supplier.find().populate( 'itemsSupplied' );
        res.status( 200 ).json( suppliers );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Get supplier by ID
export const getSupplierById = async ( req, res ) => {
    try {
        const supplier = await Supplier.findById( req.params.id ).populate( 'itemsSupplied' );
        if ( !supplier ) {
            return res.status( 404 ).json( { message: 'Supplier not found' } );
        }
        res.status( 200 ).json( supplier );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Update supplier
export const updateSupplier = async ( req, res ) => {
    try {
        const { name, contactInfo, itemsSupplied } = req.body;

        // Validate itemsSupplied
        for ( const itemId of itemsSupplied ) {
            const item = await ItemModel.findById( itemId );
            if ( !item ) {
                return res.status( 400 ).json( { message: `Item with ID ${itemId} not found` } );
            }
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name, contactInfo, itemsSupplied },
            { new: true }
        ).populate( 'itemsSupplied' );

        if ( !updatedSupplier ) {
            return res.status( 404 ).json( { message: 'Supplier not found' } );
        }

        res.status( 200 ).json( updatedSupplier );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};

// Delete supplier
export const deleteSupplier = async ( req, res ) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete( req.params.id );
        if ( !deletedSupplier ) {
            return res.status( 404 ).json( { message: 'Supplier not found' } );
        }
        res.status( 200 ).json( { message: 'Supplier deleted successfully' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: error.message } );
    }
};
