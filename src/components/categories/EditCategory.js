import {React, useState, useEffect} from 'react';
import {fetchCategories, editCategory} from '.';

const EditCategory = (props) => {
	const {baseURL, userToken} = props;
	const [categories, setCategories] = useState([]);
	const [newName, setNewName] = useState('');

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

	categories.sort((a, b) => {
		const nameA = a.name.toLowerCase()
		const nameB = b.name.toLowerCase()
		if(nameA < nameB) {
			return -1
		}
		if(nameA > nameB) {
			return 1
		}
		return 0
	})

	async function sendEditCategory(){
		event.preventDefault();

		const selector = document.getElementById("categorySelect");
		const categoryId = selector.options[selector.selectedIndex].value;

		editCategory(baseURL, userToken, categoryId, newName)
	}

	return <div className="form">
		<h3>Edit Category</h3>
		<br/>
		<form onSubmit={sendEditCategory}>
		<select id="categorySelect" size="5">
				{
					categories.map((category) => {
						const { id, name } = category;
						return <option value={id} key={id}>{name}</option>
					})
				}
			</select><br/><br/>
			<label>New Name: </label><br/>
			<input
				className="newInputLine"
				type="text"
				value={newName}
				onChange={(event) => {
					setNewName(event.target.value);
				}}
			></input><br/>
			<button>Submit</button>
		</form>
	</div>
};

export default EditCategory;