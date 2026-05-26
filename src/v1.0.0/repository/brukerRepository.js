const db = require('./db');

const BrukerRepository = {
  async findByUsername(username) {
    const sql = 'SELECT * FROM Brukere WHERE Username = ?';
    const [rows] = await db.query(sql, [username]);
    return rows[0];
  },

  async create(user) {
    const { username, passwordHash, displayName, fullName, email } = user;
    const sql = `
      INSERT INTO Brukere (Username, PasswordHash, DisplayName, FullName, Email)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [username, passwordHash, displayName, fullName, email]);
    return result.insertId;
  },

  // Henter en bruker med alle deres roller
  async getWithRoles(userId) {
    const sql = `
      SELECT b.*, r.Navn as RolleNavn
      FROM Brukere b
      LEFT JOIN Roll_Bruker rb ON b.Bruker_ID = rb.Bruker_ID
      LEFT JOIN Roller r ON rb.Rolle_ID = r.Rolle_ID
      WHERE b.Bruker_ID = ?
    `;
    const [rows] = await db.query(sql, [userId]);
    return rows;
  }
};

module.exports = BrukerRepository;