const url = "http://localhost:3000/anime";

const animeContainer = document.querySelector(".animeContainer");

const createTitle = document.querySelector(".createTitle");
const createAuthor = document.querySelector(".createAuthor");
const createReleaseYear = document.querySelector(".createReleaseYear");
const createButton = document.querySelector(".create");
const updateButton = document.querySelector(".update");
const deleteButton = document.querySelector(".delete");

const titleUpdate = document.querySelector(".titleUpdate");
const authorUpdate = document.querySelector(".authorUpdate");
const releaseYearUpdate = document.querySelector(".releaseYearUpdate");
const idUpdate = document.querySelector(".idUpdate");
const deleteId = document.querySelector(".deleteId");

updateButton.addEventListener("click", updateAnime);
createButton.addEventListener("click", addAnime);
deleteButton.addEventListener("click", deleteAnime);

function deleteAnime() {
  // event.preventDefault();
  fetch(`${url}/${deleteId.value}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  updatePage();
}

function updateAnime() {
  let anime = {
    title: titleUpdate.value,
    author: authorUpdate.value,
    release_year: releaseYearUpdate.value,
  };
  fetch(`${url}/${idUpdate.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anime),
  }).catch((e) => console.log(e));
  updatePage();
}

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
        animeDiv.textContent = `${anime.title}, ${anime.author}, ${anime.release_year}, ${anime.id}`;
        animeContainer.prepend(animeDiv);
      }
    });
}
updatePage();
