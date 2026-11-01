
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true
    },
    theatre: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    showtime: {
        type: String,
        required: true
    },
    seats: {
        type: [String],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);
