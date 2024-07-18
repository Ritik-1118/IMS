import express from 'express';
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from '../controllers/suppliersController.js';

const router = express.Router();

router.post( '/create', createSupplier );
router.get( '/', getSuppliers );
router.get( '/:id', getSupplierById );
router.put( '/:id', updateSupplier );
router.delete( '/:id', deleteSupplier );

export default router;
