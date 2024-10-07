import { useState } from 'react';
import { SingleList } from '../components';
import CreateShoppingList from '../components/CreateShoppingList';
import ShareModal from '../components/ShareModal';
export function Home({
	user,
	data,
	listPath,
	setListPath,
	isModalOpen,
	handleShareModalClick,
	darkMode,
}) {
	const [selectedItem, setSelectedItem] = useState('');
	return (
		<div className="flex flex-col space-y-10 justify-center ">
			<div className="flex flex-row justify-center">
				<div className="relative inline-block">
					<h1 className=" font-[montserrat] text-3xl font-bold text-dark-grey dark:text-gray-300">
						Your Lists
					</h1>
					{darkMode ? (
						<img
							src="/img/ruby-underline.png"
							alt="Description"
							className="absolute bottom-[-12px] -right-3 w-14 h-3"
						/>
					) : (
						<img
							src="/img/light-pink-underline.png"
							alt="Description"
							className="absolute bottom-[-12px] -right-3 w-14 h-3"
						/>
					)}
				</div>
			</div>
			{isModalOpen && (
				<ShareModal
					listPath={listPath}
					user={user}
					name={selectedItem}
					handleShareModalClick={handleShareModalClick}
				/>
			)}
			<CreateShoppingList user={user} setListPath={setListPath} />
			<div className="flex flex-row justify-center">
				<ul className="flex flex-col justify-center space-y-4 w-full max-w-md">
					{' '}
					{data?.map((item, index) => (
						<SingleList
							key={index}
							name={item.name}
							path={item.path}
							setListPath={setListPath}
							handleShareModalClick={handleShareModalClick}
							setSelectedItem={setSelectedItem}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}
