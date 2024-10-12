import { useState } from 'react';
import { addItem } from '../../api/firebase';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AddItemForm({ listPath, data, handleOpenModal }) {
	const [formData, setFormData] = useState({
		itemName: '',
		itemQuantity: 1,
		daysUntilNextPurchase: '',
	});

	const resetItemName = () => {
		setFormData((prevFormData) => ({
			...prevFormData,
			itemName: '',
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formattedItemName = formData.itemName
			.toLowerCase()
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			.replace(/[^a-zA-Z ]/g, '');

		const match = data.find((item) => item.name === formattedItemName);

		if (formattedItemName.length === 0) {
			toast.error(`No numbers or special characters.`);
			resetItemName();
			return;
		}

		try {
			if (!match && formattedItemName.length >= 1) {
				handleOpenModal();
				await addItem(listPath, { ...formData, itemName: formattedItemName });
				toast.success(`${formattedItemName} was added to your list`);
			} else {
				toast.error(`${formattedItemName} is already on your list`);
				resetItemName();
				return;
			}
		} catch (error) {
			toast.error(`Failed to add ${formattedItemName}`);
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
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-28 h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
						<RadioGroupItem
							value="7"
							id="soon"
							name="timeFrame"
							className="border  border-soon text-soon"
						/>
						<label
							htmlFor="soon"
							className="font-semibold text-sm cursor-pointer"
						>
							Soon
						</label>
					</div>
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-28 h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
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
					<div className="flex flex-col items-center justify-center rounded-xl border border-light-pink gap-4 w-28 h-28 shadow-bottom-right transition-transform duration-200 ease-in-out transform active:scale-95">
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
					className="bg-primary-pink text-white rounded-xl w-full hover:bg-primary-pink hover:bg-opacity-90 text-sm p-6"
				>
					Add Item
				</Button>
			</div>
		</form>
	);
}
