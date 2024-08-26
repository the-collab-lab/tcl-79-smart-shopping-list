import ManageListForm from '../components/ManageList/ManageListForm';
import ShareListForm from '../components/ManageList/ShareListForm';

export function ManageList({ listPath, user }) {
	return (
		<div>
			<ManageListForm listPath={listPath} />
			<ShareListForm listPath={listPath} user={user} />
		</div>
	);
}
