import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';

export function List({ data }) {
	const [search, setSearch] = useState('');
	const [displayData, setDisplayData] = useState(data);

	useEffect(() => {
		console.log('data', data);
		if (search === '') {
			setDisplayData(data);
		} else {
			const filteredItems = data.filter(
				(item) =>
					item.name !== '' &&
					item.name.toLowerCase().includes(search.toLowerCase()),
			);
			setDisplayData(filteredItems);
		}
	}, [search]);

	return (
		<>
			<SearchBar setSearch={setSearch} search={search} />
			<ul>
				{displayData.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
