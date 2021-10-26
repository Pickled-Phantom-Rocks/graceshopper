const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const categoryProductsRouter = express.Router();

const {
	getAllCategoryProducts,
	getCategoryProductsByCategory,
	updateCategoryProduct,
	deleteCategoryProduct
} = require('../db/category_products');

categoryProductsRouter.use((req, res, next) => {
	console.log("A request is being made to /category_products");
    next(); 
});

categoryProductsRouter.get('/', async (req, res, next) => {
	try {
		const categoryProducts = await getAllCategoryProducts();
		res.send(categoryProducts);
	} catch(error) {
		next(error);
	}
})

categoryProductsRouter.get('/:categoryId', async (req, res, next) => {
	try	{
		const {categoryId} = req.params;
		console.log("from api:",categoryId);
		const categoryProducts = await getCategoryProductsByCategory(categoryId);
		res.send(categoryProducts);

	} catch(error) {
		next(error);
	}
})

categoryProductsRouter.patch('/:categoryProductId', async (req, res, next) => {
	try {
		const {categoryProductId} = req.params;
		const {categoryId, productId} = req.body;

		const updatedCategoryProduct = await updateCategoryProduct({categoryId, productId});
		res.send(updatedCategoryProduct)

	} catch(error) {
		next(error);
	}
});

categoryProductsRouter.delete('/:categoryProductId', async (req, res, next) => {
	try {
		const {categoryProductId} = req.params;
		const deletedCategoryProduct = await deleteCategoryProduct(categoryProductId);
		res.send(deletedCategoryProduct);

	} catch(error) {
		next(error);
	}
});

module.exports = categoryProductsRouter;