const createSlug = (title) => {
  if (!title) {
    return ""; // Handle empty or null titles gracefully
  }
  return encodeURIComponent(
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove non-English characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
  );
};

export default createSlug;