
const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id"));

const movie = movies.find(m => m.id === movieId);
const detailsContainer = document.getElementById("movieDetails");

if (movie) {
    detailsContainer.innerHTML = `
        <img src="${movie.image}"
             alt="${movie.name}"
             style="width:220px; max-width:100%; border-radius:10px;">

        <h1 style="margin:20px 0;">${movie.name}</h1>

        <p>Genre: ${movie.genre}</p>
        <p>Language: ${movie.language}</p>
        <p>Rating: ⭐ ${movie.rating}/10</p>

        <p style="margin:20px 0;">
            Select your preferred theatre and showtime
            to book your movie tickets.
        </p>

        <a class="primary-btn"
           href="booking.html?id=${movie.id}">
           Select Theatre & Showtime
        </a>
    `;
} else {
    detailsContainer.innerHTML = "<h2>Movie not found!</h2>";
}
