import {
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	addDoc,
	deleteDoc,
	arrayRemove,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate } from '../utils';
import toast from 'react-hot-toast';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import { getDaysSinceLastPurchase } from '../utils/helpers';
/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);

		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!listPath) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
			setIsLoading(false);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return { data, isLoading };
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	const listDocRef = doc(db, userId, listName);

	await setDoc(listDocRef, {
		owner: userId,
	});

	const userDocumentRef = doc(db, 'users', userEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocRef),
	});

	return listDocRef.path;
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	try {
		// Check if current user is owner.
		if (!listPath.includes(currentUserId)) {
			toast.error('You are not the owner of this list');
			return;
		}
		// Get the document for the recipient user.
		const usersCollectionRef = collection(db, 'users');
		const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
		// If the recipient user doesn't exist, we can't share the list.

		if (!recipientDoc.exists()) {
			toast.error('Recipient email does not exist');
			return;
		}
		// Add the list to the recipient user's sharedLists array.
		const listDocumentRef = doc(db, listPath);
		const userDocumentRef = doc(db, 'users', recipientEmail);
		await updateDoc(userDocumentRef, {
			sharedLists: arrayUnion(listDocumentRef),
		});

		toast.success('List shared successfully!');
	} catch (error) {
		toast.error('Failed to share, try again.');
	}
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(
	listPath,
	{ itemName, itemQuantity, daysUntilNextPurchase },
) {
	const listCollectionRef = collection(db, listPath, 'items');
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		dayInterval: daysUntilNextPurchase,
		name: itemName,
		quantity: itemQuantity,
		totalPurchases: 0,
		checked: false,
	});
}

// checked is coming from the handleOnChange function in the ListItem.jsx,so it is not part of the item data.
export async function updateItem(listPath, checked, itemData) {
	const { id } = itemData;
	const listCollectionRef = collection(db, listPath, 'items');
	const itemRef = doc(listCollectionRef, id);
	const today = new Date();
	const currentTotalPurchases = itemData.totalPurchases;
	const currentDayInterval = itemData.dayInterval;

	const daysSinceLastPurchase = getDaysSinceLastPurchase(itemData);
	const estimate = calculateEstimate(
		currentDayInterval,
		daysSinceLastPurchase,
		currentTotalPurchases,
	);

	try {
		if (checked) {
			await updateDoc(itemRef, {
				dateLastPurchased: today,
				totalPurchases: currentTotalPurchases + 1,
				checked: checked,
				dayInterval: daysSinceLastPurchase,
				dateNextPurchased: getFutureDate(estimate),
			});
		} else {
			await updateDoc(itemRef, {
				checked: checked,
			});
		}
	} catch (error) {
		console.error('There was an error updating the item state: ', error);
	}
}

export async function editItem(
	listPath,
	id,
	{ itemName, itemQuantity, dateNextPurchased },
) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemRef = doc(listCollectionRef, id);

	try {
		await updateDoc(itemRef, {
			name: itemName,
			quantity: itemQuantity,
			dateNextPurchased: dateNextPurchased,
		});
	} catch (error) {
		console.error('There was an error editing the item state: ', error);
	}
}

export async function deleteItem(listPath, id) {
	const listCollectionRef = collection(db, listPath, 'items');
	const itemRef = doc(listCollectionRef, id);
	try {
		await deleteDoc(itemRef);
	} catch (error) {
		console.error('Error deleting your item', error);
	}
}

export async function deleteList(collectionId, document, email) {
	const listRef = doc(db, collectionId, document);
	const userRef = doc(db, 'users', email);

	try {
		//check if list exists for debugging purposes
		const docSnapshot = await getDoc(listRef);
		if (!docSnapshot.exists()) {
			console.log('Document does not exist:', listRef.path);
			return;
		} else {
			console.log('Document exists:', listRef.path);
		}
		//actually delete the list
		await deleteDoc(listRef);
		console.log('Document deleted:', listRef.path);

		//check if user list exists for debugging purposes
		const docSnapshot2 = await getDoc(userRef);
		if (!docSnapshot2.exists()) {
			console.log('Document does not exist:', userRef.path);
			return;
		} else {
			console.log('Document exists:', userRef.path);
		}
		//alert if user not found
		const userDoc = await getDoc(userRef);
		if (!userDoc.exists()) {
			console.log('User document not found:', email);
			return;
		}
		//show sharedLists contents before deleting ref
		const sharedLists = userDoc.data().sharedLists;
		console.log('Current sharedLists:', typeof sharedLists, sharedLists);
		//actually delete ref from array
		await updateDoc(userRef, {
			sharedLists: arrayRemove(listRef),
		});
		console.log('User document updated');
	} catch (error) {
		console.error('Error deleting your list', error);
	}
}

// export async function deleteCollection(listPath) {
// 	const collectionRef = collection(db, listPath);
// 	const query = collectionRef.orderBy('__name__').limit(500);
// 	console.log('delete collecton triggered');

// 	return new Promise((resolve, reject) => {
// 		console.log('inside promise');

// 		deleteQueryBatch(db, query, resolve).catch(reject);
// 	});
// }

// async function deleteQueryBatch(db, query, resolve) {
// 	const snapshot = await query.get();
// 	console.log('deletequery triggered');

// 	const batchSize = snapshot.size;
// 	if (batchSize === 0) {
// 		// When there are no documents left, we are done
// 		console.log('batch size 0');

// 		resolve();
// 		return;
// 	}

// 	// Delete documents in a batch
// 	const batch = db.batch();
// 	snapshot.docs.forEach((doc) => {
// 		console.log('deleted ', doc.ref);

// 		batch.delete(doc.ref);
// 	});
// 	await batch.commit();

// 	// Recurse on the next process tick, to avoid
// 	// exploding the stack.
// 	process.nextTick(() => {
// 		deleteQueryBatch(db, query, resolve);
// 	});
// }

export function comparePurchaseUrgency(arr) {
	const groupedItems = {
		Overdue: [],
		Soon: [],
		'Kind of soon': [],
		'Not soon': [],
		Inactive: [],
	};
	arr.forEach((item) => {
		if (groupedItems[item.indicator]) {
			groupedItems[item.indicator].push(item);
		}
	});
	Object.keys(groupedItems).forEach((key) => {
		groupedItems[key].sort((a, b) => (a.name > b.name ? 1 : -1));
	});
	return groupedItems['Overdue'].length > 0
		? groupedItems['Overdue'].concat(
				groupedItems['Soon'],
				groupedItems['Kind of soon'],
				groupedItems['Not soon'],
				groupedItems['Inactive'],
			)
		: groupedItems['Soon'].concat(
				groupedItems['Kind of soon'],
				groupedItems['Not soon'],
				groupedItems['Inactive'],
			);
}
