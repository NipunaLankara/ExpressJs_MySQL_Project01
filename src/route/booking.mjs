import { Router } from "express";
import DB from "../db/DB.mjs";
import { verifyToken } from "../util/verifyToken.mjs";
import { body, validationResult } from "express-validator";

const bookingRouter = Router();

// Validation middleware
const validateBooking = [
    body("Total").isInt({ min: 0 }).withMessage("Total must be a positive number"),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Create a new booking
bookingRouter.post(
    "/add-new-booking", verifyToken, validateBooking, handleValidationErrors, async (req, res) => {
        const { Total } = req.body;
        const userId = req.user.userId; // from token
        // const userId = req.body.userId;

        try {
            const booking = await DB.booking.create({
                data: {
                    Total,
                    userId,
                },
            });

            return res.status(201).json({ msg: "Booking Created", data: booking });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Booking Creation Failed", err: err.message });
        }
    }
);

//  Get all bookings
bookingRouter.get(
    "/get-all-bookings", verifyToken, async (req, res) => {
    try {
        const bookings = await DB.booking.findMany({
            include: {
                User: {
                    select: {
                        Id: true,
                        UserName: true,
                    },
                },
            },
        });

        return res.status(200).json({ msg: "All Bookings", data: bookings });
    } catch (err) {
        return res.status(500).json({ msg: "Failed to fetch bookings", err: err.message });
    }
});

// Get a booking by ID
bookingRouter.get(
    "/get-booking/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await DB.booking.findUnique({
            where: { Id: parseInt(id) },
            include: {
                User: {
                    select: {
                        Id: true,
                        UserName: true,
                    },
                },
            },
        });

        if (!booking) return res.status(404).json({ msg: "Booking not found" });

        return res.status(200).json({ msg: "Booking found", data: booking });
    } catch (err) {
        return res.status(500).json({ msg: "Error fetching booking", err: err.message });
    }
});

//  Update a booking
bookingRouter.put(
    "/update-booking/:id", verifyToken, validateBooking, handleValidationErrors, async (req, res) => {
        const { id } = req.params;
        const { Total } = req.body;

        try {
            const updated = await DB.booking.update({
                where: { Id: parseInt(id) },
                data: { Total },
            });

            return res.status(200).json({ msg: "Booking Updated", data: updated });
        } catch (err) {
            return res.status(500).json({ msg: "Update Failed", err: err.message });
        }
    }
);

//  Delete a booking
bookingRouter.delete(
    "/delete-booking/:id", verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        await DB.booking.delete({ where: { Id: parseInt(id) } });
        return res.status(200).json({ msg: "Booking Id : "+ id+" Deleted" });
    } catch (err) {
        return res.status(500).json({ msg: "Delete Failed", err: err.message });
    }
});

export default bookingRouter;
