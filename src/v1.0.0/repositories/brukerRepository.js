import db from '../data/db.js';

const BrukerRepository = {
  async findByUsername(username) {
    const sql = 'SELECT * FROM Brukere WHERE Username = ?';
    const [rows] = await db.query(sql, [username]);
    return rows[0] || null;
  },

  async findById(brukerId) {
    const sql = 'SELECT Bruker_ID, Username, DisplayName, FullName, Email FROM Brukere WHERE Bruker_ID = ?';
    const [rows] = await db.query(sql, [brukerId]);
    return rows[0] || null;
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

  // Henter en bruker med alle deres roller (flatten to single object)
  async getWithRoles(userId) {
    const sql = `
      SELECT b.Bruker_ID, b.Username, b.DisplayName, b.FullName, b.Email,
             r.Rolle_ID, r.Navn AS RolleNavn
      FROM Brukere b
      LEFT JOIN Roll_Bruker rb ON b.Bruker_ID = rb.Bruker_ID
      LEFT JOIN Roller r ON rb.Rolle_ID = r.Rolle_ID
      WHERE b.Bruker_ID = ?
    `;
    const [rows] = await db.query(sql, [userId]);
    if (!rows.length) return null;

    return {
      Bruker_ID: rows[0].Bruker_ID,
      Username: rows[0].Username,
      DisplayName: rows[0].DisplayName,
      FullName: rows[0].FullName,
      Email: rows[0].Email,
      roller: rows
        .filter((r) => r.Rolle_ID !== null)
        .map((r) => ({ Rolle_ID: r.Rolle_ID, Navn: r.RolleNavn })),
    };
  },

  async getAll() {
    const sql =
      'SELECT Bruker_ID, Username, DisplayName, FullName, Email FROM Brukere ORDER BY DisplayName ASC';
    const [rows] = await db.query(sql);
    return rows;
  },

  async update(brukerId, fields) {
    const { displayName, fullName, email } = fields;
    const sql = `
      UPDATE Brukere SET DisplayName = ?, FullName = ?, Email = ?
      WHERE Bruker_ID = ?
    `;
    const [result] = await db.query(sql, [displayName, fullName, email, brukerId]);
    return result.affectedRows > 0;
  },

  async delete(brukerId) {
    const [result] = await db.query('DELETE FROM Brukere WHERE Bruker_ID = ?', [brukerId]);
    return result.affectedRows > 0;
  },
};

export default BrukerRepository;