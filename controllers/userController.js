const db = require("../config/db");

exports.getUserBookings = async (req, res) => {
    const userId = req.params.id;

    // validation
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User id required",
        });
    }

    try {
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
