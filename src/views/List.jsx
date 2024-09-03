import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';
import { useNavigate } from 'react-router-dom';
import addFirstItem from '../pictures/addFirstItem.png';

export function List({ data }) {
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
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
			{data.length === 0 && (
				<div>
					<img
						className="addItemPNG"
						src={addFirstItem}
						alt="add item example"
					/>
					<p>
						You currently have no shopping items click below to add items like
						shown above
					</p>
					<button id="addFirstItem" onClick={() => navigate('/manage-list')}>
						Start adding items!
					</button>
				</div>
			)}
		</>
	);
}
