import express from 'express';
import {  
    createSalesOrder,
    getAllSalesOrders,
    getSalesOrderById,
    updateSalesOrder,
    deleteSalesOrder,
    getMonthlySalesData,
    getAllOrders
} from '../controllers/salesOrderController.js';
import {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder
} from '../controllers/purchaseOrderController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();
// Sales order Router
router.route( '/sales/' )
    .get( adminMiddleware, getAllSalesOrders )
    .post( createSalesOrder )
router.route('/sales/monthlySalesData')
    .get(adminMiddleware, getMonthlySalesData)
router.route( '/sales/:id' )
    .get( getSalesOrderById )
    .put( updateSalesOrder )
    .delete( deleteSalesOrder );

router.route("/").get(adminMiddleware, getAllOrders)

// Purchase order Router
router.route( '/purchase/' )
    .get( adminMiddleware, getAllPurchaseOrders )
    .post( adminMiddleware, createPurchaseOrder );
router.route( '/purchase/:id' )
    .get( adminMiddleware, getPurchaseOrderById )
    .put( adminMiddleware, updatePurchaseOrder )
    .delete( adminMiddleware, deletePurchaseOrder );

export default router;