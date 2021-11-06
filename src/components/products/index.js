export {default as Products} from './Products';
export {default as ProductList} from './ProductList'
export {default as SingleProduct} from './SingleProduct';
export {default as NewProduct} from './NewProduct';
export {default as EditProduct} from './EditProduct';
export {default as DeleteProduct} from './DeleteProduct';
export {default as AddProduct} from './AddProduct';
export {default as RemoveProduct} from './RemoveProduct';
export {default as ProductsByCategory} from './ProductsByCategory'

export {
	fetchProducts,
	fetchProductById,
	fetchProductsByCategory,
	fetchTheProductsByCategory,
	newProduct,
	editProduct,
	deleteProduct,
	addProduct,
	removeProduct
} from './productUtils';