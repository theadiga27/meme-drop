import {
  cloudIconEvent,
  copyIconEvent,
  displayMeme,
} from "./js/displayMeme.js";
import { paginateMeme } from "./js/paginateMeme.js";
import { searchMeme } from "./js/searchMeme.js";
import { sortMeme } from "./js/sortMeme.js";

const allLinks = document.querySelectorAll("a:link");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const container = document.querySelector(".search-result");
const next = document.querySelector(".template-next");
const prev = document.querySelector(".template-prev");
const page = document.querySelector(".template-page");
const select = document.querySelector(".select");
const input = document.querySelector(".search-input");
const copyrightYear = document.querySelector(".year");

const url = "https://api.imgflip.com/get_memes";


// Params
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");
const pageNumber = urlParams.get("page");
const sort = urlParams.get("sort");


let allMemes;
let filteredMemes;
let paginatedMemes;

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});


btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const getMemes = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.success != true) {
      window.alert("Error Fetching Meme");
    }

    allMemes = data.data.memes;
    filteredMemes = allMemes.slice();

    if (pageNumber) {
      page.textContent = pageNumber;
    }
    if (sort) {
      select.value = sort;
      filterMemes();
    }

    if (search) {
      input.value = search;
      filteredMemes = searchMeme(allMemes, input.value);
    }

    paginatedMemes = paginateMeme(
      filteredMemes,
      parseInt(page.textContent),
      15
    );
    displayMeme(paginatedMemes, container);

    const cloudIcons = document.querySelectorAll(".cloud-icon");
    const copyIcons = document.querySelectorAll(".copy-icon");

    cloudIcons.forEach((cloudIcon) => {
      cloudIcon.addEventListener("click", async function () {
        await cloudIconEvent(cloudIcon);
      });
    });
    copyIcons.forEach((copyIcon) => {
      copyIcon.addEventListener("click", async function () {
        await copyIconEvent(copyIcon);
      });
    });
  } catch (e) {
    console.error(e);
  }
};

input.addEventListener("keyup", function (e) {
  page.textContent = 1;

  if (e.target.value) {
    input.value = e.target.value;
    filteredMemes = searchMeme(allMemes, input.value);
  } else {
    filteredMemes = allMemes.slice();
    filterMemes();
  }
  updatingUrl();

  paginatedMemes = paginateMeme(filteredMemes, parseInt(page.textContent), 15);
  container.innerHTML = ``;

  displayMeme(paginatedMemes, container);
});

select.addEventListener("change", function (e) {
  page.textContent = 1;
  select.value = e.target.value;

  filterMemes();

  paginatedMemes = paginateMeme(filteredMemes, parseInt(page.textContent), 15);

  updatingUrl();

  container.innerHTML = ``;

  displayMeme(paginatedMemes, container);
});

next.addEventListener("click", function (e) {
  if (parseInt(page.textContent) < Math.ceil(filteredMemes.length / 15)) {
    page.textContent = parseInt(page.textContent) + 1;
    paginatedMemes = paginateMeme(
      filteredMemes,
      parseInt(page.textContent),
      15
    );
  }

  updatingUrl();

  container.innerHTML = ``;

  displayMeme(paginatedMemes, container);
});

prev.addEventListener("click", function (e) {
  if (parseInt(page.textContent) > 1) {
    page.textContent = parseInt(page.textContent) - 1;
    paginatedMemes = paginateMeme(
      filteredMemes,
      parseInt(page.textContent),
      15
    );
  }

  updatingUrl();

  container.innerHTML = ``;
  displayMeme(paginatedMemes, container);
});

const filterMemes = () => {
  if (select.value !== "top-30") {
    sortMeme(filteredMemes, select.value);
  } else {
    filteredMemes = allMemes.slice();
  }
};

const updatingUrl = () => {
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?search=${input.value}&page=${page.textContent}&sort=${select.value}` +
    "#template";

  window.history.pushState({}, "", newUrl);
};

getMemes();

copyrightYear.innerHTML = new Date().getFullYear();

