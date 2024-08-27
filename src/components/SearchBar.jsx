export function SearchBar({ setSearch, search }) {
	const handleClear = () => {
		setSearch('');
	};

	return (
		<form action="">
			<label htmlFor="item-filter">Search for an item here: </label>
			<input
				type="text"
				id="item-filter"
				value={search}
				placeholder="Search here"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button onClick={handleClear}>X</button>
		</form>
	);
}
