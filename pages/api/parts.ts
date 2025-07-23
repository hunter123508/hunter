import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query as string | undefined;
    let sql = 'SELECT * FROM part';
    let params: any[] = [];
    if (query) {
      sql += ' WHERE LOWER(name) LIKE $1';
      params = [`%${query.toLowerCase()}%`];
    }
    try {
      const result = await pool.query(sql, params);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Database error', details: error });
    }
  } else if (req.method === 'POST') {
    const { name, equipment_id, image_url, affiliate_link, available, description } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO part (name, equipment_id, image_url, affiliate_link, available, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, equipment_id, image_url, affiliate_link, available, description]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Database error', details: error });
    }
  } else {
