import { SingleList } from '../components';
import './Home.css';
import CreateShoppingList from '../components/CreateShoppingList';

export function Home({ user, data, setListPath }) {
	//console.log(user)
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
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
