
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Booking = require("./models/Booking");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("CineBook Backend is Running!");
});

// Save booking details
app.post("/api/bookings", async (req, res) => {
    try {
        const {
            movie,
            theatre,
            date,
            showtime,
            seats,
            totalAmount
        } = req.body;

        if (!movie || !theatre || !date || !showtime ||
            !Array.isArray(seats) || seats.length === 0 ||
            !Number.isFinite(totalAmount) || totalAmount !== seats.length * 150) {
            return res.status(400).json({
                message: "Invalid booking details"
            });
        }

        const booking = new Booking({
            movie,
            theatre,
            date,
            showtime,
            seats,
            totalAmount
        });

        await booking.save();

        res.status(201).json({
            message: "Booking saved successfully!",
            booking
        });

    } catch (error) {
        res.status(500).json({
            message: "Booking failed",
            error: error.message
        });
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });
