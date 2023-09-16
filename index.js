require('dotenv').config();
const updateReservedSpots = require('./updateReservedSpots');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json())
const db = require('./db');  // Import the db module

db.query('SELECT * FROM reservation');


app.use(bodyParser.json());


app.post('/reservations', async (req, res) => {
    const reservationData = req.body;
    console.log(reservationData);
    try {
        const result = await db.query(
            'INSERT INTO reservation (spot_id, reservation_date, from_time, to_time, cost, first_name, last_name, tag, email, phone, card_number, card_name, exp, cvc,zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
            [
                reservationData.spot_id,
                reservationData.date,
                reservationData.from_time,
                reservationData.to_time,
                reservationData.cost,
                reservationData.first_name,
                reservationData.last_name,
                reservationData.tag,
                reservationData.email,
                reservationData.phone,
                reservationData.card_number,
                reservationData.card_name,
                reservationData.exp,
                reservationData.cvc,
                reservationData.zip_code,]);

        res.status(201).json({ message: 'Reservation created successfully', reservation: result.rows[0] });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Reservation failed3' });
    }
});



app.listen(5500, () => { console.log('Listening on port 5500') });

// Fetch reservations and update parking spots
