export {default as Header} from './Header';
export {default as Footer} from './Footer';
export {default as Greeting} from './Greeting';
export {default as Cart} from './cart/Cart';
export {default as Admin} from './Admin';

export {
	Login,
	Register,
	Profile,
	UserList
} from './users';

export {
	Products,
	NewProduct,
	EditProduct,
	DeleteProduct,
	AddProduct,
	RemoveProduct,
	SingleProduct,
	ProductsByCategory
} from './products';

export {
	fetchCategories,
	NewCategory,
	EditCategory,
	DeleteCategory
} from './categories';

export {
	ProfileOrders
} from './ordersForProfile';

export {
	OrderList,
	OrdersByStatus
} from './order';
