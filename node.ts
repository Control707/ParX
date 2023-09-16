import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import express from 'express';

import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    try {
        const result =
            await sql`INSERT INTO reservations SET ?`;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error });
    }
}