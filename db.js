const { Pool } = require('pg');

const pool = new Pool({

    connectionString: "postgres://default:CNMcG0P2sFUo@ep-square-snow-50146002-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require",
});
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log(result.rows[0].now);
    });
})

module.exports = pool;

