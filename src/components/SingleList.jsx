import { FaShareNodes } from 'react-icons/fa6';
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
		<li className="flex flex-row align-middle justify-between pl-4 pr-4 py-[10px] rounded-[3px] text-[1em] space-x-3 w-full bg-white dark:bg-[#2f3031] text-black dark:text-gray-200 shadow-md shadow-slate-400 dark:shadow-gray-600 border border-gray-300 dark:border-gray-500 mt-2 sm:pl-6 sm:pr-6 sm:py-[14px] sm:rounded-[5px] sm:text-[1.2em] sm:space-x-5">
			<button
				className="capitalize text-sm hover:font-bold text-gray-800 dark:text-gray-300 sm:text-lg"
				onClick={handleClick}
			>
				{name}
			</button>
			<div className="flex flex-row relative space-x-1 sm:space-x-2">
				<button
					onClick={handleShareClick}
					aria-label="Share list"
					className="text-green-500 hover:text-green-500 dark:text-ruby-pink dark:hover:text-primary-pink hover:text-opacity-80 dark:hover:text-opacity-80 transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125"
				>
					<FaShareNodes className="w-5 h-5 sm:w-6 sm:h-6" />
				</button>
				<button
					aria-label="Delete list"
					className="text-ruby-pink hover:text-ruby-pink hover:text-opacity-80 dark:text-emerald-500 dark:hover:text-emerald-300 dark:hover:text-opacity-80 transform hover:scale-110 transition-transform duration-150 sm:hover:scale-125"
				>
					<Trash2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
				</button>
			</div>
		</li>
	);
}
