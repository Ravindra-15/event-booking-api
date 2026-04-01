const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.bookTicket = async (req, res) => {
    const { user_id, event_id } = req.body;

    // validation
    if (!user_id || !event_id) {
        return res.status(400).json({
            success: false,
            message: "user_id and event_id required",
        });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [event] = await connection.query(
            "SELECT * FROM events WHERE id = ?",
            [event_id]
        );

        if (!event.length) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        if (event[0].remaining_tickets <= 0) {
            return res.status(400).json({
                success: false,
                message: "No tickets available",
            });
        }

        const bookingCode = uuidv4();

        await connection.query(
            "INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?,?,?)",
            [user_id, event_id, bookingCode]
        );

        await connection.query(
            "UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?",
            [event_id]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Booking successful",
            data: { bookingCode },
        });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({
            success: false,
            message: error.message,
        });
    } finally {
        connection.release();
    }
};