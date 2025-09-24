export const searchMeme = (allMemes, input) => {
  const trimmedInput = input.trim();
  const regex = new RegExp(`\\b${trimmedInput}`, "i");
  return allMemes.filter((meme) => regex.test(meme.name));
};
