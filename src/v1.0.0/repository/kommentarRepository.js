const db = require('./db');

const KommentarRepository = {
  async create(hendelseId, brukerId, tekst) {
    const sql = `
      INSERT INTO Kommentarer (Hendelse_ID, Bruker_ID, Tekst, Tidspunkt)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [hendelseId, brukerId, tekst]);
    return result.insertId;
  },

  // Hent historikk for en hendelse med brukernavn
  async getByHendelse(hendelseId) {
    const sql = `
      SELECT k.*, b.DisplayName 
      FROM Kommentarer k
      JOIN Brukere b ON k.Bruker_ID = b.Bruker_ID
      WHERE k.Hendelse_ID = ?
      ORDER BY k.Tidspunkt DESC
    `;
    const [rows] = await db.query(sql, [hendelseId]);
    return rows;
  },

  async delete(kommentarId) {
    const [result] = await db.query('DELETE FROM Kommentarer WHERE Kommentar_ID = ?', [kommentarId]);
    return result.affectedRows > 0;
  }
};

module.exports = KommentarRepository;