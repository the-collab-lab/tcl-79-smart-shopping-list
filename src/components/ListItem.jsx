import { updateItem, deleteItem } from '../api';
import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { Trash2, Pencil } from 'lucide-react';
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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import EditItemForm from './ManageListForms/EditItemForm';

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
	isOpen,
	handleOpenModal,
	dateNextPurchased,
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
		<li className="flex flex-row align-middle justify-between px-2 py-[4px] rounded-[3px] text-[0.9em] space-x-4 w-full bg-white dark:bg-[#2f3031] text-black dark:text-gray-200 shadow-md shadow-slate-400 dark:shadow-gray-600 border border-gray-300 dark:border-gray-500 sm:py-[8px] sm:rounded-[5px] sm:text-[1.2em] sm:space-x-8">
			<div className="flex items-center gap-2 ml-2 sm:gap-3 sm:ml-4">
				<input
					type="checkbox"
					id={id}
					onChange={handleOnChange}
					checked={isChecked}
					disabled={isChecked}
					className="w-4 h-4 cursor-pointer sm:w-5 sm:h-5"
				/>
				<div
					className={`flex items-center gap-1 ${isChecked ? 'line-through' : ''} sm:gap-2`}
				>
					<label
						htmlFor={`${id}`}
						className="capitalize text-sm sm:text-base md:text-lg hover:font-bold text-gray-800 dark:text-gray-300"
					>
						{name}
					</label>
				</div>
				{quantity && (
					<div className="bg-primary-pink text-black w-5 h-5 flex items-center justify-center rounded-full sm:w-6 sm:h-6">
						<span className="font-bold text-xs">{quantity}</span>
					</div>
				)}
			</div>
			<div className="flex items-center gap-3">
				<div
					className={`${getIndicatorColor(indicator)} rounded-[3px] px-2 sm:rounded-[5px] sm:px-3`}
				>
					<p className="capitalize text-xs sm:text-sm text-black dark:text-gray-800">
						{indicator}
					</p>
				</div>
				<div className="flex gap-3 px-1">
					<Dialog open={isOpen} onOpenChange={() => handleOpenModal(id)}>
						<DialogTrigger asChild>
							<Button className="bg-transparent hover:bg-transparent p-0">
								<Pencil className="w-5 h-5 text-light-grey hover:text-opacity-75 dark:text-emerald-500 dark:hover:text-opacity-80  transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit {name}</DialogTitle>
								<DialogDescription className="text-md md:text-lg">
									Modify the details of the item you&apos;d like to edit.
								</DialogDescription>
							</DialogHeader>
							<EditItemForm
								listPath={listPath}
								name={name}
								id={id}
								quantity={quantity}
								dateNextPurchased={dateNextPurchased}
								handleOpenModal={handleOpenModal}
							/>
							<DialogFooter className="sm:justify-start"></DialogFooter>
						</DialogContent>
					</Dialog>
					<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
						<AlertDialogTrigger asChild>
							<Button
								className="bg-transparent hover:bg-transparent p-0"
								type="button"
								id={id}
								onClick={() => setIsAlertOpen(true)}
							>
								<Trash2 className="w-5 h-5 text-gray-600 hover:text-opacity-75 dark:text-emerald-500 dark:hover:text-opacity-80  transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="p-6 sm:p-10">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-sm text-slate-800 dark:text-slate-400 sm:text-lg">
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription className="text-slate-700">
									This action cannot be undone. Do you really want to delete{' '}
									{name}?
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
									onClick={handleDelete}
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</li>
	);
}
