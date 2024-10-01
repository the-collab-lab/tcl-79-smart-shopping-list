/* eslint-disable jsx-a11y/anchor-is-valid */
import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useAuth } from '../api';
import { SignInButton, SignOutButton } from '../api/useAuth';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

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
			? 'bg-pink-500 text-red-500 hover:bg-pink-500 hover:text-white rounded-2xl px-3 py-2 p-4'
			: 'text-yellow-500 hover:bg-pink-500 hover:text-white rounded-2xl px-3 py-2 p-4';
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<div className="flex items-center justify-between p-4">
						<div className="w-full lg:w-auto text-center lg:text-left">
							<NavLink to="/" className="Nav-link">
								<img
									src="/src/LOGO-FRAME.png"
									alt="GrocerEase logo"
									className="Logo mx-auto lg:mx-0"
								/>
							</NavLink>
						</div>
						<div className="hidden lg:flex items-center space-x-4">
							{!!user && <p>Welcome, {user.displayName}</p>}
							<NavLink to="/" className={linkClass}>
								<Button variant="link" className="text-white text-base">
									Home
								</Button>
							</NavLink>
							<NavLink to="/list" className={linkClass}>
								<Button variant="link" className="text-white text-base">
									List
								</Button>
							</NavLink>
							{!!user ? (
								<>
									<SignOutButton>
										<Button variant="outline">Sign Out</Button>
									</SignOutButton>
								</>
							) : (
								<SignInButton>
									<Button variant="outline">Sign In</Button>
								</SignInButton>
							)}
						</div>
						{!!user && (
							<div className="block lg:hidden">
								<SignOutButton>
									<Button variant="outline">Sign Out</Button>
								</SignOutButton>
							</div>
						)}
					</div>
				</header>

				<main className="Layout-main">
					<Outlet />
				</main>

				{/* Mobile/Tablet bottom nav here */}
				<nav className="block lg:hidden fixed bottom-0 left-0 right-0 shadow-lg p-4 text-white">
					<div className="flex justify-around items-center">
						<NavLink to="/" className={linkClass}>
							<Button className="text-white text-base">Home</Button>
						</NavLink>
						<NavLink to="/list" className={linkClass}>
							<Button variant="link" className="text-white text-base">
								List
							</Button>
						</NavLink>
					</div>
				</nav>
				<Toaster />
			</div>
		</>
	);
}
