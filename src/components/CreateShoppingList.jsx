import { useState } from 'react';
import { createList } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from './ui/input';
import { ListPlus } from 'lucide-react';

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
		<form
			onSubmit={handleSubmit}
			className="relative w-full flex items-center justify-center gap-4 max-w-lg mx-auto "
		>
			<div className="flex flex-col w-full max-w-xs relative">
				<label htmlFor="shoppingList" className="text-sm font-light pb-2">
					Create a new list
				</label>
				<Input
					className="border-[1px] rounded-[5px] text-[1em] h-[3rem] pl-10 focus-visible:outline-none focus:ring-1 focus:ring-primary-green text-black dark:text-white bg-white dark:bg-bg-black"
					id="shoppingList"
					type="text"
					value={listName}
					placeholder="Enter your list name..."
					onChange={(e) => setListName(e.target.value)}
					required
				/>
				<span className="absolute inset-y-0 left-0 top-7 flex items-center pl-3 pointer-events-none">
					<ListPlus className="h-5 w-5 text-grey" />
				</span>
			</div>
			<div className="flex pt-5 mt-2">
				<button
					type="submit"
					className="bg-light-green hover:bg-light-green dark:bg-primary-green dark:hover:bg-primary-green hover:bg-opacity-75 dark:hover:bg-opacity-75 text-black font-bold h-[3rem] px-5 rounded-[5px] flex items-center space-x-2"
				>
					<span>Create</span>
					<span>+</span>
				</button>
			</div>
		</form>
	);
}
