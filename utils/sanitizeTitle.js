// utils/sanitizeTitle.js

const sanitizeTitle = (title) => {
  if (!title) {
    return "";
  }

  return title
    .replace(/&#8216;/g, "'") // Replace left single quote
	.replace(/&#8211;/g, " ") // Replace left single quote
    .replace(/&#8217;/g, "'") // Replace right single quote
    .replace(/&#8230;/g, "...") // Replace ellipsis
    .replace(/&nbsp;/g, " ") // Replace non-breaking space
    .replace(/&amp;/g, "&") // Replace ampersand
    .replace(/&[a-z0-9]+;/gi, "") // Remove other HTML entities
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
	.replace(/[&hellip;];/g, " ") // Replace multiple spaces with single space
	.replace(/&#8217;/g, "'") // Replace right single quote

	.replace(/<p>;/g, "'") // Replace right single quote
	
	
	
	
    .trim();
};

export default sanitizeTitle;