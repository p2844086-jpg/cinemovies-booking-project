
document.addEventListener("DOMContentLoaded", function () {

    const ticketDetails = document.getElementById("ticketDetails");

    // Get booking details from Local Storage
    const storedBooking = localStorage.getItem("lastBooking");

    if (!ticketDetails) {
        console.error("Ticket details element not found!");
        return;
    }

    if (!storedBooking) {
        ticketDetails.innerHTML = `
            <h2>No Booking Found!</h2>
            <p>Please book a movie first.</p>
            <a href="index.html" class="primary-btn">
                Go to Home
            </a>
        `;
        return;
    }

    try {
        const booking = JSON.parse(storedBooking);

        if (
            !booking.movieName ||
            !booking.bookingId ||
            !Array.isArray(booking.seats)
        ) {
            throw new Error("Invalid booking information");
        }

        ticketDetails.innerHTML = `
            <div class="ticket-info">

                <h2>${booking.movieName}</h2>

                <p><b>Booking ID:</b> ${booking.bookingId}</p>

                <p><b>Theatre:</b> ${booking.theatre}</p>

                <p><b>Date:</b> ${booking.date}</p>

                <p><b>Show Time:</b> ${booking.showtime}</p>

                <p><b>Seats:</b>
                    ${booking.seats.map(s => "S" + s).join(", ")}
                </p>

                <p><b>Total Amount:</b>
                    ₹${booking.totalAmount}
                </p>

                <br>

                <h3 style="color:#36c98b;">
                    Booking Successful!
                </h3>

                <p>Enjoy Your Movie!</p>

            </div>
        `;

    } catch (error) {
        console.error("Booking Error:", error);

        ticketDetails.textContent =
            "Unable to display booking details. Please book again.";
    }

});
