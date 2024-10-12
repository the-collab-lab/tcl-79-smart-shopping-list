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
		<li className="flex flex-row items-center justify-between rounded-[5px] text-[1em] space-x-5 w-full bg-white text-black h-[3.3rem]">
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
						className="capitalize justify-self-end text-lg"
					>
						{name}
					</label>
				</div>
				<div className="bg-pink w-6 h-6 flex items-center justify-center rounded-full">
					<span className="font-bold text-xs">{quantity}</span>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<div className={`${getIndicatorColor(indicator)} rounded-[5px] px-3`}>
					<p className="capitalize justify-self-end text-base">{indicator}</p>
				</div>
				<div className="flex items-center p-2">
					<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
						<AlertDialogTrigger asChild>
							<Button
								className="bg-transparent hover:bg-transparent"
								type="button"
								id={id}
								onClick={() => setIsAlertOpen(true)}
							>
								<Trash2 className="text-primary-green w-6 h-6 md:w-7 md:h-7" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. Do you really want to delete{' '}
									{name}?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDelete}
									className="bg-primary-pink text-white"
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<Dialog open={isOpen} onOpenChange={() => handleOpenModal(id)}>
						<DialogTrigger asChild>
							<Button className="bg-transparen hover:bg-transparen p-0">
								<Pencil className="text-primary-green w-6 h-6 md:w-7 md:h-7" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit {name}</DialogTitle>
								<DialogDescription>
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
				</div>
			</div>
		</li>
	);
}
