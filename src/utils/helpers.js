import { getDaysBetweenDates } from './dates';

export function getIndicator(item) {
	const dateLastPurchasedJavaScriptObject = item.dateLastPurchased
		? item.dateLastPurchased.toDate()
		: item.dateCreated.toDate();

	const daysSinceLastPurchase = getDaysBetweenDates(
		new Date(),
		dateLastPurchasedJavaScriptObject,
	);

	const daysUntilNextPurchase = getDaysBetweenDates(
		item.dateNextPurchased.toDate(),
		new Date(),
	);

	if (daysSinceLastPurchase > 60) {
		return 'Inactive';
	} else if (daysSinceLastPurchase > 30 && daysSinceLastPurchase < 60) {
		return 'Overdue';
	} else if (daysUntilNextPurchase <= 7) {
		return 'Soon';
	} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
		return 'Kind of soon';
	} else if (daysUntilNextPurchase >= 30) {
		return 'Not soon';
	}
}
