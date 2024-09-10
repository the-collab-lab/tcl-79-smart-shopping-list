import { useState } from 'react';
import { addItem } from '../../api/firebase';

export default function AddItemForm({ listPath, data }) {
	const [formData, setFormData] = useState({
		itemName: '',
		daysUntilNextPurchase: '',
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(formData.itemName);
			const submittedItem = formData.itemName
				.toLowerCase()
				.replace(/[.,/#!$%^&*;:{}=\-_`~()\s]/g, '')
				.replace(/[^\w\s]/gi, '');
			setFormData((prevData) => ({
				...prevData,
				itemName: submittedItem,
			}));
			console.log('after set form data,', submittedItem);
			await addItem(listPath, formData);
			alert(`${formData.itemName} was added to the list successfully`);
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
