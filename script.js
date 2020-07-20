let url = "http://localhost:3000/anime";

let animeContainer = document.querySelector(".animeContainer");

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
