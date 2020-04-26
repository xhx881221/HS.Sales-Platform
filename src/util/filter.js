let omitContent = function (content, length) {
	if (!content) return "";
	return content.substring(0, length);
};

export { omitContent }