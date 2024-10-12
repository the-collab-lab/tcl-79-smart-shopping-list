import { useAuth } from '../api/useAuth';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eclipse, Sun } from 'lucide-react';
import { Context } from '../Context';
import './Login.css';

function Login() {
	const { darkMode, setDarkMode } = useContext(Context);
	const { user, signIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<div
			className={`${darkMode && 'dark'} flex justify-center items-center h-screen`}
		>
			<div className="bg-transparent text-white  w-11/12 max-w-lg p-8 ">
				<div className="flex justify-center items-center mb-6">
					{darkMode ? (
						<img src="grocerease-light.png" alt="Shopping app logo" />
					) : (
						<img src="grocerease.png" alt="Shopping app logo" />
					)}
				</div>
				<div className="flex justify-center items-center h-2/5">
					<div className="flex justify-center items-center bg-pink-500 hover:bg-pink-500 hover:bg-opacity-80 w-2/4 h-1/4 rounded-xl p-2">
						<button type="button" onClick={signIn}>
							Sign In
						</button>
					</div>
				</div>
			</div>
			<Button
				onClick={toggleDarkMode}
				className="fixed w-16 bottom-16 right-16 p-2 rounded-full text-primary-pink hover:text-primary-pink hover:text-opacity-60 font-semibold"
			>
				<abbr title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
					<button
						className={`${darkMode && 'dark'} rounded-full text-primary-pink hover:text-opacity-60`}
					>
						{darkMode ? <Eclipse /> : <Sun />}
					</button>
				</abbr>
			</Button>
		</div>
	);
}

export default Login;
