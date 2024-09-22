import './ListItem.css';
import { updateItem, deleteItem } from '../api';
import { useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';
import toast from 'react-hot-toast';

export function ListItem({
	listPath,
	name,
	id,
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
		<li className="ListItem">
			<input
				type="checkbox"
				id={id}
				onChange={handleOnChange}
				checked={isChecked}
				disabled={isChecked}
			/>
			<label htmlFor={`${id}`}>{name}</label>
			{/* Add CSS to dynamically change bg-color for badges? */}
			<p className="TimeBadge">{indicator}</p>
			<button type="button" id={id} onClick={handleDelete}>
				Delete
			</button>
		</li>
	);
}
