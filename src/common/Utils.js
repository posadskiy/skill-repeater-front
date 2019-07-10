const getDaysAgoFromDate = (date) => {
	const dateDifference = new Date() - date;
	const dayAgo = Math.floor(dateDifference / (1000 * 60 * 60 * 24));

	switch (dayAgo) {
		case 0: return 'today';
		case 1: return `1 day ago`;
		default: return `${dayAgo} days ago`;
	}
};

export {
	getDaysAgoFromDate,
}