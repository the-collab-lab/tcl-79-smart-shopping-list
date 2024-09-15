import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';
import { useNavigate } from 'react-router-dom';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [displayData, setDisplayData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		setDisplayData([...data]);
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
