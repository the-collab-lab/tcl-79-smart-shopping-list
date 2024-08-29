export function SearchBar({ data, setDisplayData, setSearch, search }) {
	const handleInputChange = (e) => {
		const searchTerm = e.target.value;
		setSearch(searchTerm);

		const filteredUsers = data.filter((item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setDisplayData(filteredUsers);
	};

	const handleClear = () => {
		setDisplayData(data);
		setSearch('');
	};

	return (
		<form>
			<label htmlFor="item-filter">Search for an item here: </label>
			<input
				type="text"
				id="item-filter"
				value={search}
				placeholder="Search here"
				onChange={handleInputChange}
			/>
			<button type="button" onClick={handleClear}>
				Clear Input
			</button>
		</form>
	);
}
