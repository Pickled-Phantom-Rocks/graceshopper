import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ProductList} from '.'
import {fetchCategories} from '..';

const Products = (props) => {
	const {baseURL, userId, userToken, setShowProductsByCategory, showAllProducts, setShowAllProducts, showSingleProductFromCart} = props;
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('1');
	
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
	}, [])

	return <div id="products">
		<h1>Products</h1>
		<section>
			<form >
				<label>Categories: </label>
				<select id="categorySelect"
					onChange={(event) => {
						setSelectedCategory(event.target.value);
					}}>
					{
						categories.map((category) => {
						const { id: categoryId, name } = category;
						return <option value={categoryId} name={name} key={categoryId}>{name}</option>
						})
					}
				</select> <button><Link to={`/category/${selectedCategory}`}>Search</Link></button>
			</form>
			{showAllProducts && !showSingleProductFromCart ? null: <button onClick={()=>{
				setShowAllProducts(true);			
			}}>Show All Products</button>}
			{showSingleProductFromCart ? <Link to="/cart"> <button onClick={() => {
				setShowAllProducts(true)
			}}>Return to cart!</button></Link> : null}
		</section>
		{showAllProducts ? <ProductList baseURL={baseURL} userId={userId} userToken={userToken} /> : null}

	</div>
}

export default Products;