
document.addEventListener("DOMContentLoaded", function () {

    const seatContainer = document.getElementById("seatContainer");
    if (!seatContainer) {
    console.error("Seat container not found!");
    return;
}

    const rows = ["A", "B", "C", "D", "E"];
    const seatsPerRow = 8;

    let selectedSeats = [];

    // Already booked seats
    const bookedSeats = ["A3", "B5", "C2", "D7"];

    // Create seats
    rows.forEach(function (row) {

        for (let i = 1; i <= seatsPerRow; i++) {

            const seatNumber = row + i;
            const seat = document.createElement("button");

            seat.textContent = i;
            seat.classList.add("seat");

            if (bookedSeats.includes(seatNumber)) {
                seat.classList.add("booked");
                seat.disabled = true;
            } else {
                seat.classList.add("available");

                seat.addEventListener("click", function () {
                    if (selectedSeats.includes(seatNumber)) {
                        selectedSeats = selectedSeats.filter(
                            s => s !== seatNumber
                        );
                        seat.classList.remove("selected");
                        seat.classList.add("available");
                    } else {
                        selectedSeats.push(seatNumber);
                        seat.classList.remove("available");
                        seat.classList.add("selected");
                    }

                    updateSummary();
                });
            }

            seatContainer.appendChild(seat);
        }
    });

    function updateSummary() {
        document.getElementById("seatCount").textContent =
            "Selected Seats: " + selectedSeats.length;

        document.getElementById("totalPrice").textContent =
            "Total: ₹" + (selectedSeats.length * 150);
    }

    // Display movie information
    const params = new URLSearchParams(window.location.search);
    const movie = params.get("movie");

    document.getElementById("showInfo").textContent =
        movie ? "Movie: " + movie : "Movie details unavailable";

    
window.confirmBooking = async function () {
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat!");
        return;
    }

    const params = new URLSearchParams(window.location.search);

    const bookingData = {
        movie: params.get("movie"),
        theatre: params.get("theatre"),
        date: params.get("date"),
        showtime: params.get("showtime"),
        seats: selectedSeats,
        totalAmount: selectedSeats.length * 150
    };

    if (!bookingData.movie || !bookingData.theatre ||
        !bookingData.date || !bookingData.showtime) {
        alert("Booking details are missing. Please try again.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Booking failed");
        }

        alert("Booking Confirmed!\nBooking ID: " + result.booking._id +
              "\nSeats: " + selectedSeats.join(", ") +
              "\nTotal: ₹" + bookingData.totalAmount);

    } catch (error) {
        alert("Booking failed: " + error.message);
    }
};


});
