import db from '../data/db.js';

const LookupRepository = {
  async getAllStatuses() {
    const [rows] = await db.query('SELECT * FROM Status ORDER BY Navn ASC');
    return rows;
  },

  async getAllPriorities() {
    const [rows] = await db.query('SELECT * FROM Prioritering ORDER BY Verdi DESC');
    return rows;
  },

  async getAllCategories() {
    const [rows] = await db.query('SELECT * FROM Kategori ORDER BY Navn ASC');
    return rows;
  },

  async createCategory({ navn, beskrivelse }) {
    const sql = 'INSERT INTO Kategori (Navn, Beskrivelse) VALUES (?, ?)';
    const [result] = await db.query(sql, [navn, beskrivelse]);
    return result.insertId;
  },

  async getAllRoles() {
    const [rows] = await db.query('SELECT * FROM Roller ORDER BY Navn ASC');
    return rows;
  },
};

export default LookupRepository;