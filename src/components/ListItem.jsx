import './ListItem.css';
import { updateItem } from '../api';
import { useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS, getDaysBetweenDates } from '../utils/dates';

export function ListItem({
	listPath,
	name,
	id,
	isChecked,
	dateLastPurchased,
	dateNextPurchased,
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

	//We are repeating logic form firebase file, maybe we should extract this into a function?

	const dateLastPurchasedJavaScriptObject = dateLastPurchased
		? dateLastPurchased.toDate()
		: dateCreated.toDate();

	const daysSinceLastPurchase = getDaysBetweenDates(
		new Date(),
		dateLastPurchasedJavaScriptObject,
	);

	const daysUntilNextPurchase = getDaysBetweenDates(
		dateNextPurchased.toDate(),
		new Date(),
	);

	//_________

	const getIndicator = () => {
		if (daysSinceLastPurchase > 60) {
			return 'Inactive';
		} else if (daysUntilNextPurchase <= 7) {
			return 'Soon';
		} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
			return 'Kind of soon';
		} else if (daysUntilNextPurchase >= 30) {
			return 'Not soon';
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
			<p className="TimeBadge">{getIndicator()}</p>
		</li>
	);
}
