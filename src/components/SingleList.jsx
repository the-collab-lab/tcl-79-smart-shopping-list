import { FaShareNodes } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
export function SingleList({
	name,
	path,
	setListPath,
	handleShareModalClick,
	setSelectedItem,
}) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate(`/list`);
	}

	const handleShareClick = () => {
		setSelectedItem(name);
		handleShareModalClick();
	};

	return (
		<li className="flex flex-row align-middle justify-between px-2 py-1 rounded-[5px] text-[1.2em] space-x-5 w-[16rem] bg-white text-black">
			<button
				className="capitalize justify-self-end text-sm hover:font-bold"
				onClick={handleClick}
			>
				{name}
			</button>
			<div className="flex flex-row relative space-x-2">
				<button
					onClick={handleShareClick}
					className="text-green-500 hover:text-green-600"
				>
					<FaShareNodes />
				</button>
				<button className="text-red-500  hover:text-red-600">
					<RiDeleteBin5Fill />
				</button>
			</div>
		</li>
	);
}
