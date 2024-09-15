import AddItemForm from '../components/ManageListForms/AddItemForm';
import ShareListForm from '../components/ManageListForms/ShareListForm';

export function ManageList({ listPath, user, data }) {
	return (
		<div>
			<AddItemForm listPath={listPath} data={data} />
			<ShareListForm listPath={listPath} user={user} />
		</div>
	);
}
