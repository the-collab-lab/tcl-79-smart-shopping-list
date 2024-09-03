import './ListItem.css';
import { updateItem } from '../api';

export function ListItem({ name, listPath, id }) {
	//console.log(listPath)
	const handleOnChange = async () => {
		await updateItem(listPath, id);
	};

	return (
		<li className="ListItem">
			<input type="checkbox" id={id} onChange={handleOnChange} />
			<label htmlFor={`${id}`}>{name}</label>
		</li>
	);
}
