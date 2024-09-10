import './ListItem.css';
import { updateItem } from '../api';
import { useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates';

export function ListItem({
	name,
	listPath,
	id,
	isChecked,
	datePurchased,
	dayInterval,
}) {
	const handleOnChange = async (event) => {
		let { checked } = event.target;
		if (!checked) return;

		await updateItem(listPath, id, checked, dayInterval);
	};

	useEffect(() => {
		const today = new Date().getTime();
		const datePurchasedInMillis = datePurchased?.toMillis();

		if (isChecked && today - datePurchasedInMillis >= ONE_DAY_IN_MILLISECONDS) {
			updateItem(listPath, id, !isChecked, dayInterval);
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
