const movies = [
    {
        title: "Pushpa 2: The Rule",
        genre: "Action / Drama",
        rating: "8.2",
        year: 2024,
        poster: "https://m.media-amazon.com/images/M/MV5BZjJmMjJmYWMtNTQyYy00NzcxLWE5N2EtMTY5NjRhMGZmYjNlXkEyXkFqcGc%40._V1_.jpg"
    },
    {
        title: "RRR",
        genre: "Action / Drama",
        rating: "8.0",
        year: 2022,
        poster: "https://images.everyeye.it/img-notizie/oscar-2023-attenzione-rrr-spronato-hollywood-ottenere-miglior-film-v3-609480.jpg"
    },
    {
        title: "Kalki 2898 AD",
        genre: "Sci-Fi / Action",
        rating: "8.5",
        year: 2024,
        poster: "https://static.moviecrow.com/gallery/20240625/230568-Kalki%202898%20AD%20Prabhas%20Bhairava%20Bounty%20Hunter%20Super%20Hero%20Character.jpg"
    },
    {
        title: "Salaar",
        genre: "Action / Thriller",
        rating: "7.8",
        year: 2023,
        poster: "https://fr.web.img3.acsta.net/pictures/23/11/21/11/28/5109907.jpg"
    },
    {
        title: "Devara",
        genre: "Action / Drama",
        rating: "6.5",
        year: 2024,
        poster: "https://www.dvdsreleasedates.com/posters/800/D/Devara-Part-1-2024-movie-poster.jpg"
    },
    {
        title: "Hanu-Man",
        genre: "Fantasy / Action",
        rating: "7.8",
        year: 2024,
        poster: "https://www.cinejosh.com/newsimg/newsmainimg/hanu-man-to-release-in-foreign-languages_b_2301240117.jpg"
    },
    {
        title: "Baahubali 2",
        genre: "Action / Fantasy",
        rating: "8.2",
        year: 2017,
        poster: "https://m.media-amazon.com/images/M/MV5BNDA4MWM5MWEtMjFlNy00YjI5LTk2OGMtYTFlZmRkM2NhN2E0XkEyXkFqcGc%40._V1_.jpg"
    },
    {
        title: "Game Changer",
        genre: "Action / Political",
        rating: "5.5",
        year: 2025,
        poster: "https://stat5.bollywoodhungama.in/wp-content/uploads/2021/07/GameChanger-1.jpg"
    }
];

const upcomingMovies = [
    {
        title: "The Raja Saab",
        genre: "Fantasy / Horror",
        year: 2026,
        poster: "images/raja-saab.jpg"
    },
    {
        title: "Spirit",
        genre: "Action / Drama",
        year: 2027,
        poster: "images/spirit.jpg"
    }
];

function displayMovies(movieList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    if (movieList.length === 0) {
        container.innerHTML =
            '<p class="no-movies">No movies found!</p>';
        return;
    }

    movieList.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="poster">
                <img src="${movie.poster}"
                     alt="${movie.title} poster"
                     onerror="this.src='https://placehold.co/400x600/24242a/ffffff?text=Poster+Unavailable'">

                <span class="rating">
                    ⭐ ${movie.rating || "Coming Soon"}
                </span>
            </div>

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <p>📅 ${movie.year}</p>
                <button class="book-btn"
                    onclick="bookMovie('${movie.title}')">
                    Book Tickets
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

function bookMovie(movieName) {
    window.location.href =
        "./movie-details.html?movie=" +
        encodeURIComponent(movieName);
}


document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    // Display movies
    displayMovies(movies, "movieContainer");

    // Display upcoming movies
    displayMovies(upcomingMovies, "upcomingContainer");

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener("input", function () {

            const value = this.value.toLowerCase();

            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(value)
            );

            displayMovies(filtered, "movieContainer");
        });
    }

});
