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
				<h1 className="font-[montserrat] font-bold text-[32px] underline decoration-solid decoration-4 decoration-[#2EBB4B]  ">
					Your Lists
				</h1>
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
				<ul className="flex flex-col justify-center space-y-2">
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
