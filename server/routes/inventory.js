import express from 'express';
import {
    getAllRowMaterials,
    getAllWorkInProgress,
    getAllFinished,
    getAllRowMaterialItems,
    getAllWorkInProgressItems,
    getAllFinishedItems,
    getCurrentInventoryLevel,
    getAllMaterials
} from '../controllers/inventoryController.js';
import {
    getAllItems,
    getItemById,
    getItemsByCategory,
    getItemsByItemLevel,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/itemController.js';

const router = express.Router();

// Inventory Routes
router.route('/').get(getAllMaterials);
router.route( '/rowMaterials' ).get( getAllRowMaterials );
router.route( '/workInProgress' ).get( getAllWorkInProgress );
router.route( '/finished' ).get( getAllFinished );
router.route( '/rowMaterials/items' ).get( getAllRowMaterialItems );
router.route( '/workInProgress/items' ).get( getAllWorkInProgressItems );
router.route( '/finished/items' ).get( getAllFinishedItems );
router.route( '/currentInventoryLevel' ).get( getCurrentInventoryLevel );

// Item Routes
router.route( '/items' ).get( getAllItems );
router.route( '/item' ).post( createItem );

router.route( '/item/:id' )
    .get( getItemById )
    .put( updateItem )
    .delete( deleteItem );

router.route( '/item/category/:category' ).get( getItemsByCategory );
router.route( '/item/itemLevel/:itemLevel' ).get( getItemsByItemLevel );

export default router;
