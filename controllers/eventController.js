const db = require("../config/db");

exports.getEvents = async (req, res) => {
    try {
        const [events] = await db.query("SELECT * FROM events");

        res.json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.createEvent = async (req, res) => {
    const { title, description, date, capacity } = req.body;

    // validation
    if (!title || !date || !capacity) {
        return res.status(400).json({
            success: false,
            message: "Title, date and capacity required",
        });
    }

    try {
        await db.query(
            "INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?,?,?,?,?)",
            [title, description, date, capacity, capacity]
        );

        res.status(201).json({
            success: true,
            message: "Event created successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.markAttendance = async (req, res) => {
    const { code } = req.body;

    // validation
    if (!code) {
        return res.status(400).json({
            success: false,
            message: "Booking code required",
        });
    }

    try {
        await db.query(
            "INSERT INTO attendance (booking_code) VALUES (?)",
            [code]
        );

        res.json({
            success: true,
            message: "Attendance marked successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};