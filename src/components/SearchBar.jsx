import { Input } from './ui/input';

export function SearchBar({ allData, setDisplayData, setSearch, search }) {
	const handleInputChange = (e) => {
		const searchTerm = e.target.value;
		setSearch(searchTerm);

		const filteredData = allData.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
		);

		setDisplayData(filteredData);
	};

	return (
		<form className="text-black">
			<Input
				type="text"
				id="item-filter"
				value={search}
				placeholder="Search..."
				onChange={handleInputChange}
			/>
		</form>
	);
}
