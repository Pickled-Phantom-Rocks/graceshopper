import {React, useState} from 'react';
import {newCategory} from '.';

const NewCategory = (props) => {
	const {baseURL} = props;
	const [newName, setNewName] = useState('');

	async function sendNewCategory() {
		event.preventDefault();

		console.log('from NewCat:', newName);
		const result = await newCategory(baseURL, newName);
	}

	return <section className="form">
		<h3>Add New Category</h3>
		<br/>
		<form onSubmit={sendNewCategory}>
			<label>Name: </label><br/>
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
	</section>
};

export default NewCategory;