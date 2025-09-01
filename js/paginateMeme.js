export const paginateMeme = (memes, page, limit) => {
  let result = [];
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  for (let i = 0; i < memes.length; i++) {
    result = memes.slice(startIndex, endIndex);
  }
  return result;
};
