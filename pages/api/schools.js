import { getConnection } from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
fs.mkdirSync(uploadDir, { recursive: true });

export default async function handler(req, res) {
  const connection = await getConnection();

  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      const image = files.image ? path.basename(files.image.path) : null;
      
      await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [fields.name, fields.address, fields.city, fields.state, fields.contact, fields.email_id, image]
      );

      res.status(200).json({ message: 'School added successfully' });
    });
  } else if (req.method === 'GET') {
    const [rows] = await connection.execute('SELECT id, name, address, city, image FROM schools');
    res.status(200).json(rows);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  connection.end();
}
