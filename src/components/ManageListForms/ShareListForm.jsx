import { useState } from 'react';
import { shareList } from '../../api';

export default function ShareListForm({ listPath, user }) {
	const [recipientEmail, setRecipientEmail] = useState('');
	const currentUserId = user?.uid;

	const handleSubmit = async (event) => {
		event.preventDefault();
		await shareList(listPath, currentUserId, recipientEmail);
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
