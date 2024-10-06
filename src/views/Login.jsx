import { useAuth } from '../api/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const { user, signIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user]);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-black text-white rounded-xl w-11/12 max-w-lg p-8 shadow-xl">
				<div className="flex justify-center items-center mb-6">
					<img src="grocerease-light.png" alt="Shopping app logo" />
				</div>
				<div className="flex justify-center items-center h-2/5">
					<div className="flex justify-center items-center bg-pink-500 hover:bg-pink-500 hover:bg-opacity-80 w-2/4 h-1/4 rounded-xl p-2">
						<button type="button" onClick={signIn}>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
