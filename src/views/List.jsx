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

export function List({ data, listPath }) {
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
		<div className="flex flex-col items-center gap-4">
			<div className="flex gap-2">
				<SearchBar
					setDisplayData={setDisplayData}
					allData={allData}
					setSearch={setSearch}
					search={search}
				/>
				<Dialog open={isOpen} onOpenChange={handleAddModal}>
					<DialogTrigger asChild>
						<Button>
							<SquarePlus />
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
			<ul className="w-full max-w-[500px]">
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
			{data.length === 0 && (
				<div className="flex flex-col gap-4">
					<p>You currently have no shopping items. Click below to add items</p>
					<Button
						className="bg-main-green text-white rounded-lg w-full"
						id="addFirstItem"
						onClick={() => setIsOpen((prev) => !prev)}
					>
						Start adding items!
					</Button>
				</div>
			)}
		</div>
	);
}
