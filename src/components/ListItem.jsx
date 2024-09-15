import './ListItem.css';
import { updateItem } from '../api';
import { useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';

export function ListItem({
	listPath,
	name,
	id,
	isChecked,
	dateLastPurchased,
	totalPurchases,
	dayInterval,
	dateCreated,
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
		</li>
	);
}
