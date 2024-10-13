import { Input } from './ui/input';
import { ListFilter } from 'lucide-react';

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
		<form className="relative w-full -top-[3px]">
			<label htmlFor="shoppingList" className="text-sm font-light">
				Filter lists
			</label>
			<Input
				type="text"
				id="item-filter"
				value={search}
				placeholder="Search..."
				onChange={handleInputChange}
				className="border-[1px] rounded-[5px] text-[1em] h-[3rem] pl-10 focus-visible:outline-none focus:ring-1 focus:ring-primary-green text-black dark:text-white bg-white dark:bg-bg-black"
			/>
			<span className="absolute inset-y-0 left-0  top-6 flex items-center pl-3 pointer-events-none">
				<ListFilter className="h-5 w-5 text-grey" />
			</span>
		</form>
	);
}
