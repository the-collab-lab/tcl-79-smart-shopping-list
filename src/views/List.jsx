import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { getDaysBetweenDates } from '../utils/dates';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [displayData, setDisplayData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getIndicator = (item) => {
			const dateLastPurchasedJavaScriptObject = item.dateLastPurchased
				? item.dateLastPurchased.toDate()
				: item.dateCreated.toDate();

			const daysSinceLastPurchase = getDaysBetweenDates(
				new Date(),
				dateLastPurchasedJavaScriptObject,
			);

			const daysUntilNextPurchase = getDaysBetweenDates(
				item.dateNextPurchased.toDate(),
				new Date(),
			);

			if (daysSinceLastPurchase > 60) {
				return 'Inactive';
			} else if (daysSinceLastPurchase > 30 && daysSinceLastPurchase < 60) {
				return 'Overdue';
			} else if (daysUntilNextPurchase <= 7) {
				return 'Soon';
			} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
				return 'Kind of soon';
			} else if (daysUntilNextPurchase >= 30) {
				return 'Not soon';
			}
		};
		const arrayWithIndicator = data.map((item) => ({
			...item,
			indicator: getIndicator(item),
		}));
		setDisplayData([...comparePurchaseUrgency(arrayWithIndicator)]);
	}, [data]);

	return (
		<>
			<SearchBar
				setDisplayData={setDisplayData}
				data={data}
				setSearch={setSearch}
				search={search}
			/>
			<ul>
				{displayData.map((item) => (
					<ListItem
						key={item.id}
						name={item.name}
						listPath={listPath}
						id={item.id}
						isChecked={item.checked}
						dateLastPurchased={item.dateLastPurchased}
						totalPurchases={item.totalPurchases}
						dayInterval={item.dayInterval}
						dateCreated={item.dateCreated}
						dateNextPurchased={item.dateNextPurchased}
						indicator={item.indicator}
					/>
				))}
			</ul>
			{data.length === 0 && (
				<div>
					<p>You currently have no shopping items. Click below to add items</p>
					<button id="addFirstItem" onClick={() => navigate('/manage-list')}>
						Start adding items!
					</button>
				</div>
			)}
		</>
	);
}
