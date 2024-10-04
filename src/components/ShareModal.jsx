/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { shareList } from '@/api';

export default function ShareModal({
	handleShareModalClick,
	listPath,
	user,
	name,
}) {
	const [recipientEmail, setRecipientEmail] = useState('');
	const currentUserId = user?.uid;

	const handleSubmit = async (event) => {
		event.preventDefault();
		await shareList(listPath, currentUserId, recipientEmail);
		setRecipientEmail('');
	};

	return (
		<div className="size-full">
			<div
				className="size-full absolute top-0 bg-[rgba(49,49,49,0.8)]"
				onClick={handleShareModalClick}
			></div>
			<div>
				<form
					onSubmit={(event) => handleSubmit(event)}
					className="absolute top-1/4 left-1/4 text-black bg-slate-50 z-10 rounded p-5 w-1/2 h-1/2 flex flex-col justify-between items-center"
				>
					<h2 className="font-bold">You're sharing {name}</h2>
					<div>
						<label htmlFor="email">Invite a user by email: </label>
						<input
							className="bg-white border-[1px] border-gray-400 rounded-sm"
							type="text"
							id="email"
							required
							value={recipientEmail}
							onChange={(e) => setRecipientEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-row justify-center space-x-3">
						<button
							onClick={handleShareModalClick}
							className="bg-white py-2 px-6 border rounded-[100px]"
						>
							Close
						</button>
						<button
							type="submit"
							className="bg-[#FBB300] py-2 px-6 border rounded-[100px]"
						>
							Invite
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
