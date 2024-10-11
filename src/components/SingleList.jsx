import { deleteList } from '@/api';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FaShareNodes } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export function SingleList({
	name,
	path,
	listPath,
	setListPath,
	handleShareModalClick,
	setSelectedItem,
}) {
	const [collectionId, setCollectionId] = useState('');
	const singleListPath = path.split('/')[0];
	const email = getAuth().currentUser.email;

	useEffect(() => {
		setCollectionId(singleListPath);
	}, []);

	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate(`/list`);
	}

	const handleShareClick = () => {
		setSelectedItem(name);
		handleShareModalClick();
	};

	const handleDeleteClick = async (name) => {
		await deleteList(collectionId, name, email);
		console.log(listPath, name);

		if (listPath.includes(name)) {
			console.log();

			setListPath('');
		}
		toast.success(`List ${name} was deleted`);
	};

	return (
		<li className="flex flex-row align-middle justify-between px-2 py-3 rounded-[5px] text-[1.2em] space-x-5 w-full bg-white text-black">
			<button
				className="capitalize justify-self-end text-sm hover:font-bold"
				onClick={handleClick}
			>
				{name}
			</button>
			<div className="flex flex-row relative space-x-2">
				<button
					onClick={handleShareClick}
					className="text-green-500 hover:text-green-600"
				>
					<FaShareNodes />
				</button>
				{getAuth().currentUser.uid === singleListPath ? (
					<button
						onClick={() => handleDeleteClick(name)}
						className="text-pink-500  hover:text-pink-600"
					>
						<RiDeleteBin5Fill />
					</button>
				) : (
					<div className="text-gray-500">
						<RiDeleteBin5Fill />
					</div>
				)}
			</div>
		</li>
	);
}
