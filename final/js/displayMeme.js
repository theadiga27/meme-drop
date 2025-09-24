export const displayMeme = (memes, container) => {
  memes.forEach((meme) => {
    container.innerHTML += `
      <div class="template-card" id="${meme.id}">
        <div class="template-img-card">
          <img src="${meme.url}" alt="${meme.name}" class="template-img"/>
        </div>
        <p class="template-card-title">${meme.name}</p>
        <div class="action-icons">
          <div class="cloud-icon margin-right-sm">
            <ion-icon  name="cloud-download-outline"></ion-icon>
          </div>
          <div class="copy-icon">
            <ion-icon  name="copy-outline"></ion-icon>
          </div>
        </div>
      </div>
    `;
  });
};

export const cloudIconEvent = async (cloudIcon) => {
  try {
    const imageUrl =
      cloudIcon.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute(
        "src"
      );
    const fileName =
      cloudIcon.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute(
        "alt"
      );

    const res = await fetch(imageUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
  }
};

export const copyIconEvent = async (copyIcon) => {
  try {
    const url =
      copyIcon.parentElement.parentElement.firstElementChild.firstElementChild.getAttribute(
        "src"
      );

    const response = await fetch(url);
    const blob = await response.blob();

    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0);

    const imgBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/*")
    );

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/*": imgBlob,
      }),
    ]);
  } catch (e) {
    console.error(e);
  }
};
