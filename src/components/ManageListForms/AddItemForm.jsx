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
		// (for later) maybe simplified the replace and added trim() to remove spaces like this:
		// .toLowerCase().replace(/[^\w]/g, '').trim();
		// (for later) maybe make this a function and move it into utils
		const formattedItemName = formData.itemName
			.toLowerCase()
			.replace(/[.,/#!$%^&*;:{}=\-_~()\s]/g, '')
			.replace(/[^\w\s]/gi, '');

		console.log('formattedItemName', formattedItemName);

		try {
			// (for later) replace .filter with .some to make this true or false because it didnt work in some cases
			const filteredList = data?.filter((item) => {
				item.name === formData.itemName;
			});

			console.log('filteredList', filteredList);

			if (filteredList.length === 0) {
				// (done) replaced setFormData we had before with { ...formData, itemName: formattedItemName }
				await addItem(listPath, { ...formData, itemName: formattedItemName });
				alert(`${formattedItemName} was added to the list successfully`);
			} else {
				toast.error(`${formattedItemName} is already on your list`);
			}
		} catch (error) {
			alert(`There was a problem adding ${formData.itemName} to the list`);
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
