const createSlug = (title) => {
  return encodeURIComponent(title.trim().toLowerCase().replace(/\s+/g, '-'));
};

export default createSlug;
