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

categoriesRouter.use((req, res, next) => {
	console.log("A request is being made to /activities");
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
			res.send(newCategory);			
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
		const id = req.params.categoryId;
		const {name} = req.body;
		const categoryToUpdate = await getCategoryById(id);

		if(categoryToUpdate) {
			const updatedCategory = await updateCategory(id, name);
			res.send(updatedCategory);
		} else {
			next({
				name: "Not Found",
				message: "This category does not yet exist.",
			});
		}
	} catch(error) {
		next(error);
	}
});

categoriesRouter.delete('/:categoryId', async (req, res, next) => {
	try {
		const id = req.params.categoryId;
		const categoryToDelete = await getCategoryById(id);

		
		const deletedCategory = await deleteCategory(id);
		res.send(deletedCategory);

	} catch(error) {
		next(error);
	}
});

module.exports = categoriesRouter;