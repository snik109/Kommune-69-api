import db from '../data/db.js';

const TiltakRepository = {
  async addTiltak(hendelseId, utfortAv, beskrivelse) {
    const sql = `
      INSERT INTO Tiltak (Hendelse_ID, UtførtAv, Beskrivelse, Tidspunkt)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [hendelseId, utfortAv, beskrivelse]);
    return result.insertId;
  },

  async findById(tiltakId) {
    const sql = `
      SELECT t.*, b.DisplayName AS UtførtAvNavn
      FROM Tiltak t
      LEFT JOIN Brukere b ON t.UtførtAv = b.Bruker_ID
      WHERE t.Tiltak_ID = ?
    `;
    const [rows] = await db.query(sql, [tiltakId]);
    return rows[0] || null;
  },

  async getByHendelse(hendelseId) {
    const sql = `
      SELECT t.*, b.DisplayName AS UtførtAvNavn
      FROM Tiltak t
      LEFT JOIN Brukere b ON t.UtførtAv = b.Bruker_ID
      WHERE t.Hendelse_ID = ?
      ORDER BY t.Tidspunkt DESC
    `;
    const [rows] = await db.query(sql, [hendelseId]);
    return rows;
  },

  async delete(tiltakId) {
    const [result] = await db.query('DELETE FROM Tiltak WHERE Tiltak_ID = ?', [tiltakId]);
    return result.affectedRows > 0;
  },
};

export default TiltakRepository;