import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const result = await pool.query('SELECT * FROM part WHERE id = $1', [id]);
      if (result.rows.length) res.status(200).json(result.rows[0]);
      else res.status(404).json({ error: "Part not found" });
    } catch (error) {
      res.status(500).json({ error: 'Database error', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
