import {React, useState} from 'react';
import { fetchProducts } from '..';

const EditProduct = (props) => {
	const {baseURL} = props;
	const products = fetchProducts(baseURL);
	return <div>
		<form>
			<select id="productSelect" size="10">
				{
					products.map((product) => {
						const { id, name } = product;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select><br/>
		</form>
	</div>
};

export default EditProduct;