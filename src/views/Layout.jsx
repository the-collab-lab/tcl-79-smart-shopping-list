/* eslint-disable jsx-a11y/anchor-is-valid */
import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';
import { useAuth } from '../api';
import { SignInButton, SignOutButton } from '../api/useAuth';
import { Toaster } from 'react-hot-toast';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="flex flex-col h-[100dvh] items-center">
				<header className="flex-col w-48 mb-20">
					<h1 className="text-[36px] font-[monda] font-extrabold">
						GrocerEase
					</h1>
					{!!user ? (
						<div>
							{/* <SignOutButton /> */}
							<p className="text-xs text-end font-extralight">
								Welcome, {user.displayName}!
							</p>
						</div>
					) : (
						<SignInButton />
					)}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/" className="Nav-link">
							Home
						</NavLink>
						<NavLink to="/list" className="Nav-link">
							List
						</NavLink>
						<NavLink to="/manage-list" className="Nav-link">
							Manage List
						</NavLink>
					</div>
				</nav>
				<Toaster />
			</div>
		</>
	);
}
