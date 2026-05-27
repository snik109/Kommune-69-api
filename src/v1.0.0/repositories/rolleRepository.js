import db from '../data/db.js';

const RolleRepository = {
  // Legg til en rolle på en bruker
  async assignRoleToUser(brukerId, rolleId) {
    const sql = 'INSERT IGNORE INTO Roll_Bruker (Bruker_ID, Rolle_ID) VALUES (?, ?)';
    const [result] = await db.query(sql, [brukerId, rolleId]);
    return result.affectedRows > 0;
  },

  // Fjern en rolle fra en bruker
  async removeRoleFromUser(brukerId, rolleId) {
    const sql = 'DELETE FROM Roll_Bruker WHERE Bruker_ID = ? AND Rolle_ID = ?';
    const [result] = await db.query(sql, [brukerId, rolleId]);
    return result.affectedRows > 0;
  },

  // Hent alle roller for en bruker
  async getRolesForUser(brukerId) {
    const sql = `
      SELECT r.Rolle_ID, r.Navn
      FROM Roller r
      JOIN Roll_Bruker rb ON r.Rolle_ID = rb.Rolle_ID
      WHERE rb.Bruker_ID = ?
    `;
    const [rows] = await db.query(sql, [brukerId]);
    return rows;
  },

  // Sjekk om bruker har en spesifikk rolle (f.eks. 'Admin')
  async userHasRole(brukerId, rolleNavn) {
    const sql = `
      SELECT COUNT(*) AS count
      FROM Roll_Bruker rb
      JOIN Roller r ON rb.Rolle_ID = r.Rolle_ID
      WHERE rb.Bruker_ID = ? AND r.Navn = ?
    `;
    const [rows] = await db.query(sql, [brukerId, rolleNavn]);
    return rows[0].count > 0;
  },
  async create({ navn, beskrivelse }) {
    const sql = 'INSERT INTO Roller (Navn, Beskrivelse) VALUES (?, ?)';
    const [result] = await db.query(sql, [navn, beskrivelse]);
    return result.insertId;
  },
  async getAll() {
    const sql = 'SELECT Rolle_ID, Navn, Beskrivelse FROM Roller';
    const [rows] = await db.query(sql);
    return rows;
  }
};

export default RolleRepository;