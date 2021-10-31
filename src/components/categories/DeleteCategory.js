import {React, useState, useEffect} from 'react';
import { fetchCategories, deleteCategory } from '.';

const DeleteCategory = (props) => {
	const {baseURL} = props;
	const [categories, setCategories] = useState([])

	async function fetchTheCategories() {
		try {
			const result = await fetchCategories(baseURL)
			setCategories(result)

		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchTheCategories()
	}, [])

	async function deleteTheCategory() {
		event.preventDefault();

		const selector = document.getElementById("categorySelect");
		const categoryId = selector.options[selector.selectedIndex].value;
		await deleteCategory(baseURL, categoryId);
	}

	return <div className="form">
		<h3>Delete a Category</h3>
		<br/>
		<form onSubmit={deleteTheCategory}>
			<select id="categorySelect" size="5">
				{
					categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select><br/><br/>
			<button>Delete</button>
		</form>
	</div>
};

export default DeleteCategory;