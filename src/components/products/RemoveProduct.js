import {React, useState, useEffect} from 'react';
import {fetchProducts} from '.';
import {fetchCategories} from '..';

const RemoveProduct = (props) => {
	const {baseURL} = props;
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL)
			setCategories(result)
		} catch (error) {
			console.error(error);
		}
	}	
	useEffect(() => {
		fetchTheCategories();
	}, []);

	//fetch the list of categories
	//when a catefory is selected, fetch the products in it
	//select product
	//delete category_product with the productID and categoryID

	return <div className="form">
		<h3>Remove a Product from a Category</h3>
		<br/>
		<form>
			<select id="categorySelect" size="10">
				{
					categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select>
			<select id="productSelect" size="10">

			</select>
			<br/><br/>
			<button>Remove</button>
		</form>
	</div>
}

export default RemoveProduct;