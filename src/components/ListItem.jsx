import { updateItem, deleteItem } from '../api';
import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { getIndicatorColor } from '../utils/helpers';
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

export function ListItem({
	listPath,
	name,
	id,
	quantity,
	isChecked,
	dateLastPurchased,
	totalPurchases,
	dayInterval,
	dateCreated,
	indicator,
}) {
	const [isAlertOpen, setIsAlertOpen] = useState(false);

	const handleOnChange = async (event) => {
		let { checked } = event.target;
		if (!checked) return;

		await updateItem(listPath, checked, {
			id,
			dateLastPurchased,
			totalPurchases,
			dayInterval,
			dateCreated,
		});
	};

	const handleDelete = async () => {
		await deleteItem(listPath, id);
		toast.success(`${name} was deleted from the list`);
		setIsAlertOpen(false);
	};

	useEffect(() => {
		const today = new Date().getTime();
		const datePurchasedInMillis = dateLastPurchased?.toMillis();

		if (isChecked && today - datePurchasedInMillis >= ONE_DAY_IN_MILLISECONDS) {
			updateItem(listPath, !isChecked, {
				id,
				dateLastPurchased,
				totalPurchases,
				dayInterval,
				dateCreated,
			});
		}
	}, []);

	return (
		<li className="flex  flex-row align-middle justify-between px-2  py-[8px] rounded-[5px] text-[1.2em] space-x-8 w-full bg-white dark:bg-[#2f3031]   text-black dark:text-gray-200 shadow-md shadow-slate-400 dark:shadow-gray-600 border border-gray-300 dark:border-gray-500">
			<div className="flex items-center gap-3 ml-4">
				<input
					type="checkbox"
					id={id}
					onChange={handleOnChange}
					checked={isChecked}
					disabled={isChecked}
					className="w-5 h-5 cursor-pointer"
				/>
				<div
					className={`flex items-center gap-2 ${isChecked ? 'line-through' : ''}`}
				>
					<label
						htmlFor={`${id}`}
						className="capitalize justify-self-end text-lg hover:font-bold"
					>
						{name}
					</label>
				</div>
				{quantity && (
					<div className="bg-primary-pink text-black w-6 h-6 flex items-center justify-center rounded-full">
						<span className="font-bold text-xs">{quantity}</span>
					</div>
				)}
			</div>
			<div className="flex items-center gap-2">
				<div className={`${getIndicatorColor(indicator)} rounded-[5px] px-3`}>
					<p className="capitalize justify-self-end text-sm text-black dark:text-gray-800">
						{indicator}
					</p>
				</div>
				<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
					<AlertDialogTrigger asChild>
						<Button
							className="bg-transparent hover:bg-transparent"
							type="button"
							id={id}
							onClick={() => setIsAlertOpen(true)}
						>
							<Trash2 className="text-ruby-pink hover:text-opacity-75 dark:text-emerald-500 dark:hover:text-opacity-80 transform hover:scale-125 transition-transform duration-150 w-6 h-6 md:w-7 md:h-7" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="p-10">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-lg text-slate-500 dark:text-slate-400">
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription className="text-black">
								This action cannot be undone. Do you really want to delete{' '}
								{name}?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel
								className="bg-white hover:bg-slate-100 px-8 border rounded-xl"
								onClick={() => setIsAlertOpen(false)}
							>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								className="bg-primary-pink hover:bg-opacity-75 rounded-xl"
								onClick={handleDelete}
							>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</li>
	);
}
