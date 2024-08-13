import { SingleList } from '../components';
import './Home.css';

export function Home({ data, setListPath }) {
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{/* {data.map((item) => (
					<SingleList key={item.id} name={item.name} path={item.path} setListPath={setListPath} />
				))} */}
				{data.map((item, index) => (
					<SingleList
						key={index}
						name={item.name}
						path={item.path}
						setListPath={setListPath}
					/>
				))}
			</ul>
		</div>
	);
}
