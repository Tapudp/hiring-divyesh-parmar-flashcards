import { connect, disconnect } from '@/app/db/connection';

async function GET(req, res) {
  try {
    const connection = await connect();

    const id = req.params.id;
    const sql = `SELECT * FROM words WHERE word_id = ?`;
    const values = [id];

    const word = await connection.query(sql, values);

    await disconnect(connection);

    res.status(200).json(word);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function PUT(req, res) {
  try {
    const connection = await connect();

    const id = req.params.id;
    const { word, definition } = req.body;
    const sql = `UPDATE words SET word = ?, definition = ? WHERE word_id = ?`;
    const values = [word, definition, id];

    const result = await connection.query(sql, values);

    await disconnect(connection);

    res.status(204).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function DELETE(req, res) {
  try {
    const connection = await connect();

    const id = req.params.id;
    const sql = `DELETE FROM words WHERE word_id = ?`;
    const values = [id];

    const result = await connection.query(sql, values);

    await disconnect(connection);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

export { GET, PUT, DELETE };
