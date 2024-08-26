import ManageListForm from '../components/ManageList/ManageListForm';

export function ManageList({ listPath }) {
	return (
		<div>
			<ManageListForm listPath={listPath} />
		</div>
	);
}
