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
	setIsLoading,
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
		setIsLoading(true);
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
		<li className="flex flex-row align-middle justify-between pl-4 pr-4 py-[10px] rounded-[3px] text-[1em] space-x-3 w-full bg-white dark:bg-[#2f3031] text-black dark:text-gray-200 shadow-md shadow-slate-400 dark:shadow-gray-600 border border-gray-300 dark:border-gray-500 mt-2 sm:pl-6 sm:pr-2 sm:py-[14px] sm:rounded-[5px] sm:text-[1.2em] sm:space-x-5">
			<button
				className="capitalize text-sm hover:font-bold text-gray-800 dark:text-gray-300 sm:text-lg"
				onClick={handleClick}
			>
				{name}
			</button>
			<div className="flex flex-row relative space-x-1 items-center">
				{getAuth().currentUser.uid === singleListPath ? (
					<button
						onClick={handleShareClick}
						aria-label="Share list"
						className="text-green-500 hover:text-green-500 dark:text-ruby-pink dark:hover:text-primary-pink hover:text-opacity-80 dark:hover:text-opacity-80 transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125"
					>
						<FaShareNodes className="w-5 h-5 md:w-6 md:h-6" />
					</button>
				) : (
					<TooltipProvider>
						<Tooltip delayDuration={100}>
							<TooltipTrigger asChild className="p-0 m-0">
								<Button
									className="bg-transparent hover:bg-transparent"
									type="button"
									onClick={() => setIsAlertOpen(true)}
								>
									<FaShareNodes className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>You cannot share a list you don&#39;t own!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
				{getAuth().currentUser.uid === singleListPath ? (
					<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
						<AlertDialogTrigger asChild>
							<Button
								className="bg-transparent hover:bg-transparent"
								type="button"
								onClick={() => setIsAlertOpen(true)}
							>
								<Trash2 className="w-5 h-5 md:w-6 md:h-6 text-primary-pink hover:text-opacity-75 dark:text-emerald-500 dark:hover:text-opacity-80  transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="text-sm text-slate-800 dark:text-slate-400 sm:text-lg">
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription className="text-slate-700">
									This will permanently delete your list. Do you really want to
									delete {name}?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel
									className="bg-white text-slate-700 hover:bg-slate-100 px-6 border rounded-lg sm:px-8 sm:rounded-xl"
									onClick={() => setIsAlertOpen(false)}
								>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="bg-primary-pink text-white hover:bg-opacity-90 px-6 border rounded-lg sm:px-8 sm:rounded-xl"
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
