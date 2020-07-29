let omitContent = function (content, length) {
	if (!content) return "";
	return content.substring(0, length);
};

let percentage = function (content) {
	if (!content) {
		return content
	} else {
		return `${content}%`
	}
};

export { omitContent, percentage }