const db = require('./db');

const RolleRepository = {
  // Legg til en rolle på en bruker
  async assignRoleToUser(brukerId, rolleId) {
    const sql = 'INSERT IGNORE INTO Roll_Bruker (Bruker_ID, Rolle_ID) VALUES (?, ?)';
    const [result] = await db.query(sql, [brukerId, rolleId]);
    return result.affectedRows > 0;
  },

  // Sjekk om bruker har en spesifikk rolle (f.eks. 'Admin')
  async userHasRole(brukerId, rolleNavn) {
    const sql = `
      SELECT COUNT(*) as count
      FROM Roll_Bruker rb
      JOIN Roller r ON rb.Rolle_ID = r.Rolle_ID
      WHERE rb.Bruker_ID = ? AND r.Navn = ?
    `;
    const [rows] = await db.query(sql, [brukerId, rolleNavn]);
    return rows[0].count > 0;
  }
};

module.exports = RolleRepository;