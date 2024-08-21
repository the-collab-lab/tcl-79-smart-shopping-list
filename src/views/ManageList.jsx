export function ManageList() {
	return (
		/*
			create form to add items to list
				“Soon”, corresponding to 7 days
				“Kind of soon”, corresponding to 14 days
				“Not soon”, corresponding to 30 days

			input that accepts the name of the item 
			has a semantic label element associated with it

			submit this form with both the mouse and the Enter key

			onSubmit ->  message indicating that the item either was 
			or was not saved to the database

			The console.log in the addItem function in src/api/firebase.js is 
			replaced with a function that adds the new document to the Firestore database. 
			That function will be imported from the firebase/firestore module.

 			The user’s soon/not soon/kind of soon choice is used to calculate nextPurchasedDate
		*/
		<form action="submit">
			<div className="item-name">
				<label htmlFor="itemName">Enter the item name: </label>
				<input type="text" name="itemName" id="itemName" required />
			</div>
			<div className="buy-again">
				<label htmlFor="buyAgain">
					When do you think you will need to purchase this item again?
				</label>
				<select name="buyAgain" id="buyAgain">
					{/*replace values with numbers?*/}
					<option value="soon">Soon (7 days)</option>
					<option value="kindOfSoon">Kind of soon (14 days)</option>
					<option value="notSoon">Not soon (30 days)</option>
				</select>
			</div>
			<button type="submit">Add Item</button>
		</form>
	);
}
