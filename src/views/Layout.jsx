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
			<div className={`${darkMode && 'dark'} min-h-screen`}>
				<div className="Layout text-black dark:text-white bg-white dark:bg-black">
					<NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

					<main className="mx-auto px-8 md:px-8 lg:px-20 w-full max-w-screen-sm min-h-screen flex flex-col rounded-xl pt-20 pb-[100px]">
						{/* I have add rounded and padding classes here for the background container that we could add to break up the design from being too white */}
						<Outlet />
					</main>

					<Toaster />
				</div>
			</div>
		</>
	);
}
