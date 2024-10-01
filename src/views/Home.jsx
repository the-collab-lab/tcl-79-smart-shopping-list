import { SingleList } from '../components';
import './Home.css';
import CreateShoppingList from '../components/CreateShoppingList';
// import { Button } from '@/components/ui/button';

export function Home({ user, data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<div className="px-20">
				{/* <Button className="bg-green-600 text-white  rounded-2xl">
					Button to show ShadCN is working
				</Button> */}
			</div>
			<ul>
				{data?.map((item, index) => (
					<SingleList
						key={index}
						name={item.name}
						path={item.path}
						setListPath={setListPath}
					/>
				))}
			</ul>

			<CreateShoppingList user={user} setListPath={setListPath} />
		</div>
	);
}
