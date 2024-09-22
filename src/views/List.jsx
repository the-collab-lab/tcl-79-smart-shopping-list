import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { getIndicator } from '../utils/helpers';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [allData, setAllData] = useState([]);
	const [displayData, setDisplayData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const arrayWithIndicator = data.map((item) => ({
			...item,
			indicator: getIndicator(item),
		}));
		const urgencyData = [...comparePurchaseUrgency(arrayWithIndicator)];
		setAllData(urgencyData);
		setDisplayData(urgencyData);
	}, [data]);

	return (
		<>
			<SearchBar
				setDisplayData={setDisplayData}
				allData={allData}
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
