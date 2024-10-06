import ShareListForm from '../components/ManageListForms/ShareListForm';

export function ManageList({ listPath, user }) {
	return (
		<div>
			<ShareListForm listPath={listPath} user={user} />
		</div>
	);
}
