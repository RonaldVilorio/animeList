const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "anime",
  password: "titan",
  port: 5432,
});

const getAnime = (request, response) => {
  pool.query("SELECT * FROM animeList ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAnimeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM animeList WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
const createAnime = (request, response) => {
  const { title, author, release_year } = request.body;

  pool.query(
    "INSERT INTO animeList (title, last, release_year) VALUES ($1, $2, $3)",
    [title, author, release_year],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Anime added with ID: ${results.insertId}`);
    }
  );
};
const updateAnime = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, author, release_year } = request.body;

  pool.query(
    "UPDATE animeList SET title = $1, author = $2, release_year =$3 WHERE id = $4",
    [title, author, release_year, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Anime modified with ID: ${id}`);
    }
  );
};
const deleteAnime = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM animeList WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Anime deleted with ID: ${id}`);
  });
};

module.exports = {
  getAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
};
