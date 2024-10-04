import AddItemForm from '../components/ManageListForms/AddItemForm';

export function ManageList({ listPath, data }) {
	return (
		<div>
			<AddItemForm listPath={listPath} data={data} />
		</div>
	);
}
