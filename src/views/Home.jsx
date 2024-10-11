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
}) {
	const [selectedItem, setSelectedItem] = useState('');

	return (
		<div className="flex flex-col space-y-10 justify-center ">
			<div className="flex flex-row justify-center">
				<div className="relative inline-block">
					<h1 className=" font-[montserrat] text-3xl font-bold text-gray-300">
						<span className="relative inline-block">
							Your
							<span className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-pink-500"></span>
						</span>{' '}
						Lists
					</h1>
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
				<ul className="flex flex-col justify-center space-y-4 w-full max-w-xl">
					{data?.map((item, index) => (
						<SingleList
							key={index}
							name={item.name}
							path={item.path}
							listPath={listPath}
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
