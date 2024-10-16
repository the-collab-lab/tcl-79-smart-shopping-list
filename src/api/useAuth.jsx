import { useEffect, useState } from 'react';
import { auth } from './config.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addUserToDatabase } from './firebase.js';
import { LogInIcon, LogOutIcon } from 'lucide-react';

/**
 * A button that signs the user in using Google OAuth. When clicked,
 * the button redirects the user to the Google OAuth sign-in page.
 * After the user signs in, they are redirected back to the app.
 */
export const SignInButton = () => (
	<button
		type="button"
		onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
	>
		<LogInIcon className="hover:text-light-grey" />
	</button>
);

/**
 * A button that signs the user out of the app using Firebase Auth.
 */
export const SignOutButton = () => (
	<button type="button" onClick={() => auth.signOut()}>
		<LogOutIcon className="hover:text-light-grey" />
	</button>
);

/**
 * A custom hook that listens for changes to the user's auth state.
 * Check out the Firebase docs for more info on auth listeners:
 * @see https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data
 */
export const useAuth = () => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				localStorage.setItem('user', JSON.stringify(user));
				addUserToDatabase(user);
			} else {
				setUser(null);
				localStorage.removeItem('user');
			}
		});
		return () => unsubscribe();
	}, []);

	const signIn = async () => {
		await signInWithPopup(auth, new GoogleAuthProvider());
	};

	const signOut = async () => {
		await auth.signOut();
		localStorage.removeItem('user');
	};

	return { user, signIn, signOut };
};
