import { updateItem, deleteItem } from '../api';
import { useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import toast from 'react-hot-toast';
import { Button } from './ui/button';

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
		const confirm = window.confirm(`are you sure you want to delete ${name}?`);
		if (confirm) {
			await deleteItem(listPath, id);
			toast.success(`${name} was deleted from the list`);
		} else {
			toast.error('Deletion canceled');
		}
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
		<li className="flex justify-between">
			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					id={id}
					onChange={handleOnChange}
					checked={isChecked}
					disabled={isChecked}
				/>
				<div className="flex items-center gap-2">
					<label htmlFor={`${id}`} className="font-medium text-lg">
						{quantity}
					</label>
					<label htmlFor={`${id}`} className="font-medium text-lg">
						{name}
					</label>
				</div>
			</div>
			{/* Add CSS to dynamically change bg-color for badges? */}
			<div className="flex items-center gap-4">
				<p className="">{indicator}</p>
				<Button type="button" id={id} onClick={handleDelete}>
					Delete
				</Button>
			</div>
		</li>
	);
}
