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
		<div className="fixed inset-0 flex justify-center items-center z-10">
			<div
				className="fixed inset-0 bg-[rgba(49,49,49,0.8)]"
				onClick={handleShareModalClick}
			></div>
			<div>
				<form
					onSubmit={(event) => handleSubmit(event)}
					className="relative text-black bg-slate-50 z-10 rounded p-10 w-full max-w-2xl  flex flex-col justify-between items-center space-y-6"
				>
					<h2 className="font-bold text-lg">You're sharing {name}</h2>
					<div className="w-full">
						<label htmlFor="email" className="block mb-2 text-sm">
							Invite a user by email:
						</label>
						<input
							className="w-full bg-white border-[1px] border-gray-400 focus-visible:outline-none focus:ring-1 focus:ring-green-500 rounded-xl p-2"
							type="text"
							id="email"
							required
							value={recipientEmail}
							onChange={(e) => setRecipientEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-row justify-center space-x-4 w-full">
						<button
							aria-label="Close share button"
							onClick={handleShareModalClick}
							className="bg-white  hover:bg-slate-100 hover:bg-opacity-80 py-62 px-8 border rounded-xl w-1/2"
						>
							Close
						</button>
						<button
							aria-label="Invite user to list"
							type="submit"
							className="bg-pink-500  hover:bg-pink-500 hover:bg-opacity-80  py-3 px-8 rounded-xl w-1/2"
						>
							Invite
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
