import { NavLink } from 'react-router-dom';
import '../views/Layout.css';

import { useAuth } from '../api';
import { SignInButton, SignOutButton } from '../api/useAuth';
import { Button } from '@/components/ui/button';
import { Eclipse, House, ListPlus, Sun } from 'lucide-react';

export function NavBar({ darkMode, toggleDarkMode }) {
	const { user } = useAuth();
	const linkClass = ({ isActive }) =>
		isActive
			? 'bg-light-green dark:bg-primary-green dark:hover:bg-primary-green rounded-xl px-3 py-2 p-4'
			: 'hover:bg-light-green dark:hover:bg-primary-green dark:hover:text-white rounded-xl px-3 py-2 p-4';

	return (
		<>
			<header className="Layout-header">
				{/* Desktop top nav here */}
				<nav className="hidden lg:flex items-center justify-between p-4">
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
						{!!user ? (
							<abbr title="Sign out">
								<SignOutButton />
							</abbr>
						) : (
							<abbr title="Sign in">
								<SignInButton />
							</abbr>
						)}
						<Button
							onClick={toggleDarkMode}
							className="absolute w-16 bottom-16 right-16 p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
						>
							<abbr
								title={
									darkMode ? 'Switch to light mode' : 'Switch to dark mode'
								}
							>
								<button
									onClick={toggleDarkMode}
									className="p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</button>
							</abbr>
						</Button>
					</div>
				</nav>

				{/* Mobile/Tablet bottom nav here */}
				<nav className="flex lg:hidden items-center justify-between p-4">
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
						{!!user ? (
							<abbr title="Sign out">
								<SignOutButton />
							</abbr>
						) : (
							<abbr title="Sign in">
								<SignInButton />
							</abbr>
						)}
						<Button
							onClick={toggleDarkMode}
							className=" p-2 text-primary-pink hover:text-primary-pink hover:text-opacity-60 rounded-full font-semibold"
						>
							<abbr
								title={
									darkMode ? 'Switch to light mode' : 'Switch to dark mode'
								}
							>
								<button
									onClick={toggleDarkMode}
									className="p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</button>
							</abbr>
						</Button>
					</div>
				</nav>
			</header>

			<nav className="block lg:hidden fixed bottom-0 left-0 right-0 shadow-lg p-4">
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
		</>
	);
}
