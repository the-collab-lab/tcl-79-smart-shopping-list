import { FaShareNodes } from 'react-icons/fa6';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Trash2 } from 'lucide-react';
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
		<li className="flex flex-row align-middle justify-between pl-6 pr-6 px-2 py-[14px] rounded-[5px] text-[1.2em] space-x-5 w-full bg-white dark:bg-dark-grey  text-black dark:text-gray-200 shadow-md shadow-slate-400 dark:shadow-gray-600 border border-gray-300 dark:border-gray-500 mt-2">
			<button
				className="capitalize justify-self-end text-lg hover:font-bold"
				onClick={handleClick}
			>
				{name}
			</button>
			<div className="flex flex-row relative space-x-2">
				<button
					onClick={handleShareClick}
					aria-label="Share list"
					className="text-green-500 hover:text-green-600 "
				>
					<FaShareNodes className="w-6 h-6 " />
				</button>
				<button
					aria-label="Delete list"
					className="text-ruby-pink  hover:text-ruby-pink hover:text-opacity-80 dark:text-light-green  dark:hover:text-light-green dark:hover:text-opacity-80"
				>
					<Trash2 className="text-main-green w-6 h-6 md:w-7 md:h-7" />
				</button>
			</div>
		</li>
	);
}
