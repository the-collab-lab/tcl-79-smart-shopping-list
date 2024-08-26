import { useState } from 'react';
import { createList } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateShoppingList({ user, setListPath }) {
	const [listName, setListName] = useState('');
	const userId = user?.uid;
	const userEmail = user?.email;
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const listPath = await createList(userId, userEmail, listName);
			setListPath(listPath);
			toast.success('List created successfully!');
			navigate('/list');
		} catch (error) {
			toast.error('List creation failed. Please try again');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="shoppingList">Enter Shopping List name:</label>
			<input
				id="shoppingList"
				type="text"
				value={listName}
				onChange={(e) => setListName(e.target.value)}
				required
			/>
			<button type="submit">Create Shopping List</button>
		</form>
	);
}
