import { SignInButton, SignOutButton } from '../api/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ user }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-black text-white rounded-lg h-2/4 w-5/12">
				<div className="flex justify-center items-center h-2/4">
					<img src="grocerease.png" alt="Shopping app logo" />
				</div>
				<div className="flex justify-center items-center h-2/4">
					<div className="bg-pink-400 w-2/4 rounded text-center">
						<SignInButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
