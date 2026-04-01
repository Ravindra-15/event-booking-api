const db = require("../config/db");

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.id;

        const [bookings] = await db.query(
            "SELECT * FROM bookings WHERE user_id = ?",
            [userId]
        );

        res.json({
            success: true,
            message: "User bookings fetched",
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};