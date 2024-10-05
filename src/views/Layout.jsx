/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';
import { Toaster } from 'react-hot-toast';
import { NavBar } from '@/components/NavBar';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<>
			<div className={`${darkMode && 'dark'}`}>
				<div className="Layout text-black dark:text-white bg-white dark:bg-black">
					<NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

					<main className="Layout-main">
						<Outlet />
					</main>

					<Toaster />
				</div>
			</div>
		</>
	);
}
