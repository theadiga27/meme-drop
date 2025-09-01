const randomMeme = (memes) => {
  for (let i = memes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [memes[i], memes[j]] = [memes[j], memes[i]];
  }
  memes;
};

const trendingMeme = (memes) => {
  memes.sort((a, b) => a.captions - b.captions);
};

const oldMeme = (memes) => {
  memes.sort((a, b) => a.id - b.id);
};

const newMeme = (memes) => {
  memes.sort((a, b) => b.id - a.id);
};

export const sortMeme = (filteredMemes, sortValue) => {
  switch (sortValue) {
    case "trending":
      trendingMeme(filteredMemes);
      break;
    case "new-meme":
      newMeme(filteredMemes);
      break;
    case "old-meme":
      oldMeme(filteredMemes);
      break;
    case "random":
      randomMeme(filteredMemes);
      break;
    default:
      trendingMeme(filteredMemes);
  }
};
