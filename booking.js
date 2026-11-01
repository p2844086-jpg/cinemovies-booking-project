
document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const selectedMovie = params.get("movie");

    const movieName = document.getElementById("movieName");

    if (selectedMovie && movieName) {
        movieName.textContent = selectedMovie;
    } else if (movieName) {
        movieName.textContent = "Movie Not Found";
    }

});

function continueBooking() {
    const theatre = document.getElementById("theatre").value;
    const date = document.getElementById("date").value;
    const showtime = document.getElementById("showtime").value;

    const params = new URLSearchParams(window.location.search);
    const movie = params.get("movie");

    if (!movie) {
        alert("Movie not found. Please select a movie again.");
        return;
    }

    if (!date) {
        alert("Please select a date.");
        return;
    }

    window.location.href =
        "./seats.html?movie=" + encodeURIComponent(movie) +
        "&theatre=" + encodeURIComponent(theatre) +
        "&date=" + encodeURIComponent(date) +
        "&showtime=" + encodeURIComponent(showtime);
}
