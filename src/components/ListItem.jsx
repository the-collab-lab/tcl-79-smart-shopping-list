import './ListItem.css';
import { updateItem } from '../api';
import { useEffect } from 'react';

export function ListItem({ name, listPath, id, isChecked }) {
	const handleOnChange = async (event) => {
		//console.log(event);
		let { value, checked } = event.target;
		console.log('value before update', value);
		await updateItem(listPath, id, !checked);
		if (value) {
			console.log('value inside if block', value);
			setTimeout(async () => {
				await updateItem(listPath, id, !checked);
				//checked = isChecked;
				console.log('fjkdsvhjkfdsh', value);
			}, 5000);
		}
		console.log(value);
	};
	// useEffect(() => {
	// 	setTimeout(async () => {
	// 		await updateItem(listPath, id, !checked);
	// 	}, 1000);
	// }, [checked]);

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={id}
				value={isChecked}
				onChange={handleOnChange}
				checked={isChecked}
			/>
			<label htmlFor={`${id}`}>{name}</label>
		</li>
	);
}
