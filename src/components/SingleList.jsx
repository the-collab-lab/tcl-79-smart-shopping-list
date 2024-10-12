import { deleteList } from '@/api';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FaShareNodes } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export function SingleList({
	name,
	path,
	listPath,
	setListPath,
	handleShareModalClick,
	setSelectedItem,
}) {
	const [isAlertOpen, setIsAlertOpen] = useState(false);
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
		setIsAlertOpen(false);
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
					<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
						<AlertDialogTrigger asChild>
							<Button
								className="bg-transparent hover:bg-transparent"
								type="button"
								onClick={() => setIsAlertOpen(true)}
							>
								<Trash2 className="text-pink-500  hover:text-pink-600" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="text-pink-500">
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This will permanently delete your list. Do you really want to
									delete {name}?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									className="p-5 bg-red-600 rounded text-white hover:bg-red-800"
									onClick={() => setIsAlertOpen(false)}
								>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="p-5 bg-green-600 rounded text-white hover:bg-green-800"
									onClick={() => handleDeleteClick(name)}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				) : (
					<TooltipProvider>
						<Tooltip delayDuration={100}>
							<TooltipTrigger asChild>
								<Button
									className="bg-transparent hover:bg-transparent"
									type="button"
									onClick={() => setIsAlertOpen(true)}
								>
									<Trash2 className="text-gray-500" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>You cannot delete a list you don&#39;t own!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
		</li>
	);
}
