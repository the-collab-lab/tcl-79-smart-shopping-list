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
import { useNavigate } from 'react-router-dom';

export function List({ data, listPath, listName, isLoading }) {
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

	const navigate = useNavigate();

	function handleClick() {
		navigate('/');
	}

	return (
		<>
			{listPath === '' || !listPath ? (
				<div className="flex flex-col space-y-10 justify-center items-center gap-3">
					<div className="relative inline-block">
						<h1 className="font-[montserrat] text-3xl font-bold text-gray">
							<span className="relative inline-block">No list selected</span>
						</h1>
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
					<Button
						onClick={handleClick}
						className="bg-ruby-pink text-white rounded-xl dark:bg-primary-green dark:text-black w-full hover:bg-ruby-pink dark:hover:bg-primary-green hover:bg-opacity-75 dark:hover:bg-opacity-75 text-sm md:text-base font-semibold max-w-[250px]"
					>
						<SquarePlus className="h-5 w-5 md:w-6 md:h-6 mr-2" />
						Let&#39;s get you started!
					</Button>
				</div>
			) : (
				<div className="flex flex-col space-y-10 justify-center items-center">
					<div className="flex flex-row justify-center">
						<div className="relative inline-block">
							<h1 className="font-[montserrat] text-3xl font-bold text-gray">
								<span className="relative inline-block">{listName}</span>
							</h1>
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
							<DialogTrigger asChild className="items-start mt-[19px]">
								<Button className="bg-transparen hover:bg-transparen p-0">
									<SquarePlus className="h-10 w-10 mt-2 text-primary-green dark:text-primary-pink transition-opacity hover:opacity-75" />
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
					{isLoading ? (
						<div role="status">
							<svg
								aria-hidden="true"
								className="w-8 h-8 md:w-10 md:h-10 text-gray-200 animate-spin dark:text-gray-600 fill-primary-green"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<span className="sr-only">Loading...</span>
						</div>
					) : (
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
					)}
					{!isLoading && data.length === 0 && (
						<div className="flex flex-col justify-center items-center gap-4 w-full mx-auto">
							<p className="text-grey text-center">
								Your list is empty. Start adding some items now!
							</p>
							<Button
								className="bg-primary-pink text-white rounded-xl dark:bg-primary-green dark:text-black w-full hover:bg-primary-pink dark:hover:bg-primary-green hover:bg-opacity-75 dark:hover:bg-opacity-75 text-sm font-semibold max-w-[150px]"
								id="addFirstItem"
								onClick={() => setIsOpen((prev) => !prev)}
							>
								Add Item
							</Button>
						</div>
					)}
					{displayData.length === 0 && search.length > 0 && (
						<div className="flex flex-col items-center">
							<p>No items found. Try searching for a different item!</p>
						</div>
					)}
				</div>
			)}
		</>
	);
}
