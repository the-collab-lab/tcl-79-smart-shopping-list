import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Layout, List } from './views';

import { useAuth, useShoppingListData, useShoppingLists } from './api';

import { useStateWithStorage } from './utils';

import { useState } from 'react';

export function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	/**
	 * This custom hook takes the path of a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We'll later use `setListPath` when we allow a user
	 * to create and switch between lists.
	 */
	const [listPath, setListPath] = useStateWithStorage(
		'tcl-shopping-list-path',
		null,
	);

	/**
	 * This custom hook holds info about the current signed in user.
	 * Check ./api/useAuth.jsx for its implementation.
	 */
	const { user } = useAuth();
	const userId = user?.uid;
	const userEmail = user?.email;

	/**
	 * This custom hook takes a user ID and email and fetches
	 * the shopping lists that the user has access to.
	 * Check ./api/firestore.js for its implementation.
	 */
	const lists = useShoppingLists(userId, userEmail);
	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(listPath);

	const handleShareModalClick = () => {
		console.log('isModalOpen', isModalOpen);
		setIsModalOpen(!isModalOpen);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<Home
								user={user}
								data={lists}
								listPath={listPath}
								setListPath={setListPath}
								isModalOpen={isModalOpen}
								handleShareModalClick={handleShareModalClick}
							/>
						}
					/>
					<Route
						path="/list"
						element={<List data={data} listPath={listPath} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
