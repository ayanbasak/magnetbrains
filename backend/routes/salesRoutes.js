import express from 'express';
const router = express.Router();
import SaleController from '../controllers/saleController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

// Protected Routes
router.post('/add', checkUserAuth, SaleController.productUpload)
router.get('/all', checkUserAuth, SaleController.getAllProducts)
router.get('/top-products', checkUserAuth, SaleController.getTopProducts)
router.get('/today-sold', checkUserAuth, SaleController.todaySold)

export default router
