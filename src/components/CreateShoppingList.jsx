import { useState } from 'react';
import { createList } from '../api/firebase';
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
		<form onSubmit={handleSubmit} className="flex flex-row space-x-3 items-end">
			<div className="flex flex-col">
				<label htmlFor="shoppingList" className="text-xs font-extralight">
					Create a new list
				</label>
				<input
					className="border-[1px] rounded-lg h-[3rem] focus-visible:outline-none focus:ring-1 focus:ring-green-500"
					id="shoppingList"
					type="text"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				/>
			</div>

			<button
				type="submit"
				className="bg-green-500 hover:bg-green-500 hover:bg-opacity-80 text-black font-bold h-[3rem] p-3 rounded-lg align-bottom"
			>
				Create +
			</button>
		</form>
	);
}
