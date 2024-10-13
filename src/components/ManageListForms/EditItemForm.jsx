import { useEffect, useState } from 'react';
import { editItem } from '../../api/firebase';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { getFutureDate } from '../../utils/dates';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function EditItemForm({
	listPath,
	id,
	name,
	quantity,
	dateNextPurchased,
	handleOpenModal,
}) {
	const [formData, setFormData] = useState({
		itemName: name || '',
		itemQuantity: quantity || 1,
		daysUntilNextPurchase: dateNextPurchased || '',
	});

	useEffect(() => {
		setFormData({
			itemName: name,
			itemQuantity: quantity,
			daysUntilNextPurchase: dateNextPurchased,
		});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formattedItemName = formData.itemName
			.toLowerCase()
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			.replace(/[^a-zA-Z ]/g, '');

		const formQuantity = parseInt(formData.itemQuantity, 10);
		const newDateNextPurchased = formData.daysUntilNextPurchase;

		if (formattedItemName.length === 0) {
			toast.error(`No numbers or special characters.`);
			resetItemName();
			return;
		}
		// check if any of the values have been edited
		const hasChanged =
			formattedItemName !== name ||
			formQuantity !== quantity ||
			newDateNextPurchased !== dateNextPurchased;

		// if no changes were made exit early
		if (!hasChanged) {
			toast.error('No changes were made.');
			handleOpenModal();
			return;
		}

		let updatedData = {
			itemName: formattedItemName,
			itemQuantity: formQuantity,
		};
		// check if dateNextPurchased have been edited to use getFutureDate if not use the same date
		if (newDateNextPurchased !== dateNextPurchased) {
			const futureDate = parseInt(newDateNextPurchased);
			updatedData.dateNextPurchased = getFutureDate(futureDate);
		} else {
			updatedData.dateNextPurchased = dateNextPurchased;
		}

		try {
			handleOpenModal();
			await editItem(listPath, id, updatedData);
			toast.success(`${formattedItemName} has been updated!`);
		} catch (error) {
			toast.error(`Failed to edit ${formattedItemName}`);
		}
	};

	const handleChange = (event) => {
		let { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleRadioChange = (value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			daysUntilNextPurchase: value,
		}));
	};

	return (
		<form
			className="flex flex-col items-center gap-8 max-w-[400px] text-black"
			onSubmit={(event) => handleSubmit(event)}
		>
			<div className="flex flex-col gap-2 w-full">
				<label htmlFor="itemName" className="text-md font-medium">
					Item name{' '}
				</label>
				<Input
					type="text"
					name="itemName"
					id="itemName"
					placeholder="Enter item name"
					required
					value={formData.itemName}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<label htmlFor="daysUntilNextPurchase" className="text-md font-medium">
					How soon would you like to buy this again?
				</label>
				<RadioGroup
					onValueChange={handleRadioChange}
					className="flex my-2 items-center justify-center gap-4"
					id="daysUntilNextPurchase"
				>
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-24 h-24 sm:w-28 sm:h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
						<RadioGroupItem
							value="7"
							id="soon"
							name="timeFrame"
							className="border border-soon text-soon"
						/>
						<label
							htmlFor="soon"
							className="font-semibold text-sm cursor-pointer"
						>
							Soon
						</label>
					</div>
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-24 h-24 sm:w-28 sm:h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
						<RadioGroupItem
							value="14"
							id="kind-of-soon"
							name="timeFrame"
							className="border border-kind-of-soon text-kind-of-soon"
						/>
						<label
							htmlFor="kind-of-soon"
							className="font-semibold text-sm cursor-pointer"
						>
							Kind of soon
						</label>
					</div>
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-24 h-24 sm:w-28 sm:h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
						<RadioGroupItem value="30" id="not-soon" name="timeFrame" />
						<label
							htmlFor="not-soon"
							className="font-semibold text-sm cursor-pointer"
						>
							Not soon
						</label>
					</div>
				</RadioGroup>
			</div>
			<div className="flex flex-col items-start gap-2 w-full">
				<label htmlFor="quantity" className="text-md font-medium">
					Quantity
				</label>
				<div className="flex items-start">
					<Input
						type="number"
						name="itemQuantity"
						id="quantity"
						required
						value={formData.itemQuantity}
						onChange={handleChange}
						min={1}
						max={100}
					/>
				</div>
			</div>
			<div className="flex w-full">
				<Button
					type="submit"
					className="bg-primary-pink text-white rounded-xl w-full hover:bg-primary-pink hover:bg-opacity-90 text-sm"
				>
					Apply Changes
				</Button>
			</div>
		</form>
	);
}
