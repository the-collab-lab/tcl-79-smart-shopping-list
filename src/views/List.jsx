import { useEffect, useState } from 'react';
import { ListItem, SearchBar } from '../components';
import { comparePurchaseUrgency } from '../api/firebase';
import { getIndicator } from '../utils/helpers';
import AddItemForm from '../components/ManageListForms/AddItemForm';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SquarePlus } from 'lucide-react';

export function List({ data, listPath, listName }) {
	const [search, setSearch] = useState('');
	const [allData, setAllData] = useState([]);
	const [displayData, setDisplayData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [openItemId, setOpenItemId] = useState(null);

	useEffect(() => {
		const arrayWithIndicator = data.map((item) => ({
			...item,
			indicator: getIndicator(item),
		}));
		const urgencyData = [...comparePurchaseUrgency(arrayWithIndicator)];
		setAllData(urgencyData);
		setDisplayData(urgencyData);
	}, [data]);

	const handleAddModal = () => {
		if (search.length > 0) {
			setDisplayData(allData);
			setSearch('');
		}

		setIsOpen((prev) => !prev);
	};

	const handleEditModal = (id) => {
		setOpenItemId((prevId) => (prevId === id ? null : id));
	};

	return (
		<div className="flex flex-col space-y-10 justify-center items-center">
			<div className="flex flex-row justify-center">
				<div className="relative inline-block">
					<h1 className="font-[montserrat] text-3xl font-bold text-slate-600 dark:text-gray-300">
						<span className=" capitalize relative inline-block">
							{listName}
						</span>
					</h1>
					{/* Did the conditional rendering of the underline like this cause we still need to hoist the darkMode */}
					<img
						src="/img/ruby-underline.png"
						alt="Description"
						className="absolute bottom-[-12px] -right-3 w-14 h-3 dark:hidden"
					/>
					<img
						src="/img/light-pink-underline.png"
						alt="Description"
						className="absolute bottom-[-12px] -right-3 w-14 h-3 hidden dark:block"
					/>
				</div>
			</div>
			<div className="flex flex-row justify-center items-center space-x-3 max-w-md w-full">
				<SearchBar
					setDisplayData={setDisplayData}
					allData={allData}
					setSearch={setSearch}
					search={search}
				/>
				<Dialog open={isOpen} onOpenChange={handleAddModal}>
					<DialogTrigger asChild>
						<Button className="bg-transparent hover:bg-transparent p-0">
							<SquarePlus
								aria-label="Add a new item"
								className="h-7 w-7 text-primary-green dark:text-primary-pink  transition-opacity hover:opacity-75"
							/>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Item</DialogTitle>
							<DialogDescription>
								Fill in the details of the item you want to add.
							</DialogDescription>
						</DialogHeader>
						<AddItemForm
							listPath={listPath}
							data={data}
							handleOpenModal={handleAddModal}
						/>
						<DialogFooter className="sm:justify-start"></DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<ul className="flex flex-col justify-center space-y-4 w-full max-w-md">
				{displayData.map((item) => (
					<ListItem
						key={item.id}
						name={item.name}
						listPath={listPath}
						id={item.id}
						quantity={item.quantity}
						isChecked={item.checked}
						dateLastPurchased={item.dateLastPurchased}
						totalPurchases={item.totalPurchases}
						dayInterval={item.dayInterval}
						dateCreated={item.dateCreated}
						dateNextPurchased={item.dateNextPurchased}
						indicator={item.indicator}
						isOpen={openItemId === item.id}
						handleOpenModal={handleEditModal}
					/>
				))}
			</ul>
			{displayData.length === 0 && search.length > 0 && (
				<div className="flex flex-col items-center">
					<p>No items found. Try searching for a different item!</p>
				</div>
			)}
			{data.length === 0 && (
				<div className="flex flex-col justify-center items-center gap-4 w-full mx-auto">
					<p className="text-grey text-center">
						Your list is empty. Start adding some items now!
					</p>
					<Button
						aria-label="Add item to list"
						className="bg-primary-pink dark:bg-primary-green text-black rounded-xl w-full hover:bg-primary-pink dark:hover:bg-primary-green hover:bg-opacity-75 dark:hover:bg-opacity-85 text-sm font-semibold max-w-[150px] p-6"
						id="addFirstItem"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						Add Item
					</Button>
				</div>
			)}
		</div>
	);
}
