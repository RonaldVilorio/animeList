const url = "http://localhost:3000/anime";

const animeContainer = document.querySelector(".animeContainer");

const createTitle = document.querySelector(".createTitle");
const createAuthor = document.querySelector(".createAuthor");
const createReleaseYear = document.querySelector(".createReleaseYear");
const createButton = document.querySelector(".create");

createButton.addEventListener("click", addAnime);

function addAnime() {
  let anime = {
    title: createTitle.value,
    author: createAuthor.value,
    release_year: createReleaseYear.value,
  };
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anime),
  }).catch((e) => console.log(e));

  updatePage();
}

function updatePage() {
  fetch(url)
    .then((resp) => resp.json())
    .then((r) => {
      let animes = r;
      for (let anime of animes) {
        console.log(anime);
        let animeDiv = document.createElement("div");
        animeDiv.textContent = `${anime.title}, ${anime.author}, ${anime.release_year}`;
        animeContainer.prepend(animeDiv);
      }
    });
}
updatePage();
