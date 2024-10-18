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
			? 'text-black bg-light-green dark:bg-primary-green dark:text-black rounded-xl px-3 py-2 p-4'
			: 'text-black dark:text-white hover:opacity-70 dark:hover:text-white rounded-xl px-3 py-2 p-4';
	return (
		<>
			<div className="max-w-[1200px] mx-auto">
				<header className="bg-white dark:bg-black px-8 md:px-8 lg:px-20 pb-2 pt-[max(env(safe-area-inset-top),1rem)] text-center">
					{/* Desktop top nav */}
					<nav className="hidden lg:flex items-center justify-between p-4">
						<div className="w-full lg:w-auto text-center lg:text-left">
							<NavLink to="/" className="Nav-link">
								{darkMode ? (
									<img
										src="grocerease-light.png"
										alt="GrocerEase logo"
										className="w-[200px]"
									/>
								) : (
									<img
										src="grocerease.png"
										alt="GrocerEase logo"
										className="w-[200px]"
									/>
								)}
							</NavLink>
						</div>
						<div className="flex items-center space-x-4">
							{!!user && <p>Welcome, {user.displayName}</p>}
							<NavLink to="/" className={linkClass}>
								<Button variant="link" className="text-base">
									Home
								</Button>
							</NavLink>

							<NavLink to="/list" className={linkClass}>
								<Button variant="link" className="text-base">
									List
								</Button>
							</NavLink>
							<div className=" pt-2 pl-2">
								{!!user ? (
									<abbr title="Sign out">
										<SignOutButton />
									</abbr>
								) : (
									<abbr title="Sign in">
										<SignInButton />
									</abbr>
								)}
							</div>
							<Button
								onClick={toggleDarkMode}
								className="fixed w-16 bottom-16 right-16 p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
							>
								<abbr
									title={
										darkMode ? 'Switch to light mode' : 'Switch to dark mode'
									}
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</abbr>
							</Button>
						</div>
					</nav>

					{/* Mobile/Tablet bottom nav */}
					<nav className="flex lg:hidden items-center justify-between p-4">
						<NavLink to="/" className="Nav-link">
							{darkMode ? (
								<img
									src="grocerease-light.png"
									alt="GrocerEase logo"
									className="w-[170px]"
								/>
							) : (
								<img
									src="grocerease.png"
									alt="GrocerEase logo"
									className="w-[170px]"
								/>
							)}
						</NavLink>
						<div className="flex items-center space-x-2">
							<Button
								onClick={toggleDarkMode}
								className="p-2 text-primary-pink hover:text-opacity-60 rounded-full font-semibold"
							>
								<abbr
									title={
										darkMode ? 'Switch to light mode' : 'Switch to dark mode'
									}
								>
									{darkMode ? <Eclipse /> : <Sun />}
								</abbr>
							</Button>
							{!!user ? (
								<abbr title="Sign out">
									<SignOutButton />
								</abbr>
							) : (
								<abbr title="Sign in">
									<SignInButton />
								</abbr>
							)}
						</div>
					</nav>
				</header>

				<nav className="block z-10 lg:hidden fixed bottom-0 left-0 right-0 shadow-lg p-4 bg-white dark:bg-black">
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
			</div>
		</>
	);
}
