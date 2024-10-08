import { useState } from 'react';
import { addItem } from '../../api/firebase';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '../ui/select';

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
			.replace(/\s\s*$/, '');

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

	const handleSelectChange = (value) => {
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
				<Select onValueChange={handleSelectChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select Time" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7">Soon (7 days)</SelectItem>
						<SelectItem value="14">Kind of soon (14 days)</SelectItem>
						<SelectItem value="30">Not soon (30 days)</SelectItem>
					</SelectContent>
				</Select>
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
					className="bg-pink text-white rounded-xl w-full hover:bg-pink hover:bg-opacity-75 text-sm"
				>
					Add Item
				</Button>
			</div>
		</form>
	);
}
