/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useAuth } from '../api';
import { SignInButton, SignOutButton } from '../api/useAuth';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Eclipse, House, ListPlus, Sun } from 'lucide-react';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const { user } = useAuth();
	const linkClass = ({ isActive }) =>
		isActive
			? 'bg-light-green dark:bg-primary-green dark:hover:bg-primary-green rounded-xl px-3 py-2 p-4'
			: 'hover:bg-light-green dark:hover:bg-green-400 dark:hover:text-white rounded-xl px-3 py-2 p-4';

	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<>
			<div className={`${darkMode && 'dark'}`}>
				<div className="Layout text-black dark:text-white bg-white dark:bg-black">
					<header className="Layout-header">
						{/* Desktop top nav here */}
						<div className="hidden lg:flex items-center justify-between p-4">
							<div className="w-full lg:w-auto text-center lg:text-left">
								<NavLink to="/" className="Nav-link">
									{darkMode ? (
										<img
											src="/src/LOGO-white.png"
											alt="GrocerEase logo"
											className="Logo mx-auto lg:mx-0"
										/>
									) : (
										<img
											src="/src/LOGO-black.png"
											alt="GrocerEase logo"
											className="Logo mx-auto lg:mx-0"
										/>
									)}
								</NavLink>
							</div>
							<div className="flex items-center space-x-4">
								{!!user && <p>Welcome, {user.displayName}</p>}
								<NavLink to="/" className={linkClass}>
									<Button
										variant="link"
										className="text-black dark:text-white text-base"
									>
										Home
									</Button>
								</NavLink>
								<NavLink to="/list" className={linkClass}>
									<Button
										variant="link"
										className="text-black dark:text-white text-base"
									>
										List
									</Button>
								</NavLink>
								{!!user ? <SignOutButton /> : <SignInButton />}
								<Button
									onClick={toggleDarkMode}
									className="absolute w-16 bottom-16 right-16 p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</Button>
							</div>
						</div>

						{/* Mobile/Tablet bottom nav here */}
						<div className="flex lg:hidden items-center justify-between p-4">
							<NavLink to="/" className="Nav-link">
								{darkMode ? (
									<img
										src="/src/LOGO-white.png"
										alt="GrocerEase logo"
										className="Logo mx-auto lg:mx-0"
									/>
								) : (
									<img
										src="/src/LOGO-black.png"
										alt="GrocerEase logo"
										className="Logo mx-auto lg:mx-0"
									/>
								)}
							</NavLink>

							<div className="flex items-center space-x-2 ">
								{!!user ? <SignOutButton /> : <SignInButton />}
								<Button
									onClick={toggleDarkMode}
									className=" p-2  text-primary-pink hover:text-primary-pink hover:text-opacity-60 rounded-full  font-semibold"
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</Button>
							</div>
						</div>
					</header>

					<main className="Layout-main">
						<Outlet />
					</main>

					{/* Mobile/Tablet Bottom Nav here */}
					<nav className="block lg:hidden fixed bottom-0 left-0 right-0 shadow-lg p-4 ">
						<div className="flex justify-around items-center">
							<NavLink to="/" className={linkClass}>
								<Button className="text-black dark:text-white text-base">
									<House />
								</Button>
							</NavLink>
							<NavLink to="/list" className={linkClass}>
								<Button className="text-black dark:text-white text-base">
									<ListPlus />
								</Button>
							</NavLink>
						</div>
					</nav>
					<Toaster />
				</div>
			</div>
		</>
	);
}
