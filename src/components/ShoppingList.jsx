import { useState } from 'react';
import { createList } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function ShoppingList({ user }) {
	const [listName, setListName] = useState('');
	const [error, setError] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const userId = user?.uid;
	const userEmail = user?.email;
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		//console.log(userId, userEmail, listName);
		try {
			createList(userId, userEmail, listName);
		} catch (error) {
			setError(true);
			submitted(false);
			console.log('error');
		}
		//setSubmitted(true)
		//setError(null)
		//navigate('/list')
	}

	return (
		<div>
			{submitted && <p>List created successfully</p>}
			{error && <p>Failed to create shopping list. Please try again</p>}
			<form onSubmit={handleSubmit}>
				<label htmlFor="shoppingList">Enter Shopping List name:</label>
				<input
					id="shoppingList"
					type="text"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				/>
				<button type="submit">Create shopping list</button>
			</form>
		</div>
	);
}
