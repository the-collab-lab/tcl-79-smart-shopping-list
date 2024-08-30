import AddItemForm from '../components/ManageListForms/AddItemForm';
import ShareListForm from '../components/ManageListForms/ShareListForm';

export function ManageList({ listPath, user }) {
	return (
		<div>
			<AddItemForm listPath={listPath} />
			<ShareListForm listPath={listPath} user={user} />
		</div>
	);
}
