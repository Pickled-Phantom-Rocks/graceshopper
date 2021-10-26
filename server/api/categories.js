const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const categoriesRouter = express.Router();

const {
	createCategory,
	getAllCategories,
	getCategoryById,
	getCategoryByName,
	updateCategory,
	deleteCategory
} = require('../db/categories');
const { 
	getCategoryProductsByCategory, 
	addProductToCategory 
} = require('../db/category_products');

categoriesRouter.use((req, res, next) => {
	console.log("A request is being made to /categories");
    next(); 
});

categoriesRouter.get('/', async (req, res, next) => {
	try {
		const categories = await getAllCategories();
		res.send(categories);
	} catch(error) {
		next(error);
	}
});

categoriesRouter.post('/', async (req, res, next) => {
	try {
		const {name} = req.body;
		const existingCategory = await getCategoryByName(name);

		if(!existingCategory){
			const newCategory = await createCategory(name);
			res.send({
				status: 204,
				message: "Category successfully created."
			});			
		} else {
			next({
				name: "Already Exists",
				message: "This category already exists.",
			})
		}
	} catch(error) {
		next(error);
	}
});

categoriesRouter.patch('/:categoryId', async (req, res, next) => {
	try {
		const {categoryId} = req.params;
		console.log(categoryId);
		const {name} = req.body;
		const categoryToUpdate = await getCategoryById(categoryId);

		if(categoryToUpdate) {
			const updated = await updateCategory(categoryId, name);
			if(updated){
				res.send({
					status: 204,
					message: "Category successfully updated."
				});
			} else {
				res.send({
					name: "Duplication Error",
					message: "A category with this name already exists."
				})
			}
		} else {
			next({
				name: "Not Found",
				message: "This category does not exist.",
			});
		}
	} catch(error) {
		next(error);
	}
});

categoriesRouter.delete('/:categoryId', async (req, res, next) => {
	try {
		const {categoryId} = req.params;
		await deleteCategory(categoryId);
		res.send({
			status: 204,
			message: "Category successfully deleted."
		})
	} catch(error) {
		next(error);
	}
});

categoriesRouter.post('/:categoryId/products', async (req, res, next) => {
	try {
		const {categoryId} = req.params;
		const {productId} = req.body;
		const categoryProducts = await getCategoryProductsByCategory(categoryId);

		if(categoryProducts.length != 0) {
			categoryProducts.map((product) => {
				if(product.productId == productId){
					res.send({
						name: "Duplication Error",
						message: "This product already exists in the category."
					})
				} else {
					const result = addProductToCategory(categoryId, productId);
					res.send({
						status: 204,
						message: "Product successfully added to the category."
					})
				}
			})
		} else {
			const result = await addProductToCategory(categoryId, productId);
			res.send({
				status: 204,
				message: "Product successfully added to the category."
			})
		}
	} catch(error){
		next(error);
	}
})

module.exports = categoriesRouter;