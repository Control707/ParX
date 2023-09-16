const db = require('./db');

async function fetchReservations() {
    try {
        const result = await db.query('SELECT spot_id, reservation_date, from_time, to_time, reservation_end_time FROM reservation');
        return result.rows;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
}
module.exports = fetchReservations;
