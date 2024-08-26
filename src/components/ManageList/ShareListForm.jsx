import { useState } from 'react';

export function ShareListForm({ listPath }) {
	const [recipientEmail, setRecipientEmail] = useState('');

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			await addItem(listPath, formData);
			alert(`${formData.itemName} was added to the list successfully`);
		} catch (error) {
			alert(`There was a problem adding ${formData.itemName} to the list`);
		}
	};

	return (
		<form onSubmit={(event) => handleSubmit(event)}>
			<label htmlFor="email">Invite a user by email: </label>
			<input
				type="text"
				id="email"
				required
				value={recipientEmail}
				onChange={(e) => setRecipientEmail(e.target.value)}
			/>
			<button type="submit">Invite</button>
		</form>
	);
}
