import { useState } from 'react';
import { addItem } from '../../api/firebase';
import toast from 'react-hot-toast';

export default function AddItemForm({ listPath, data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formattedItemName = formData.itemName
			.toLowerCase()
			.replace(/[^a-z]/g, '');

		const match = data.find((item) => item.name === formattedItemName);

		try {
			if (!match) {
				await addItem(listPath, { ...formData, itemName: formattedItemName });
				toast.success(`${formattedItemName} was added to your list`);
			} else {
				toast.error(`${formattedItemName} is already on your list`);
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

	return (
		<form onSubmit={(event) => handleSubmit(event)}>
			<div className="item-name">
				<label htmlFor="itemName">Enter the item name: </label>
				<input
					type="text"
					name="itemName"
					id="itemName"
					required
					value={formData.itemName}
					onChange={handleChange}
				/>
			</div>
			<div className="buy-again">
				<label htmlFor="daysUntilNextPurchase">
					When do you think you will need to purchase this item again?
				</label>
				<select
					name="daysUntilNextPurchase"
					id="daysUntilNextPurchase"
					value={formData.daysUntilNextPurchase}
					onChange={handleChange}
				>
					<option value="">Select Time</option>
					<option value="7">Soon (7 days)</option>
					<option value="14">Kind of soon (14 days)</option>
					<option value="30">Not soon (30 days)</option>
				</select>
			</div>
			<button type="submit">Add Item</button>
		</form>
	);
}
