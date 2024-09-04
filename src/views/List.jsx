import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';

export function List({ data, listPath }) {
	const [search, setSearch] = useState('');
	const [displayData, setDisplayData] = useState([]);

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
					/>
				))}
			</ul>
		</>
	);
}
