const db = require('./db');

const TiltakRepository = {
  async addTiltak(hendelseId, utfortAv, beskrivelse) {
    const sql = `
      INSERT INTO Tiltak (Hendelse_ID, UtførtAv, Beskrivelse, Tidspunkt)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [hendelseId, utfortAv, beskrivelse]);
    return result.insertId;
  },

  async getByHendelse(hendelseId) {
    const [rows] = await db.query('SELECT * FROM Tiltak WHERE Hendelse_ID = ?', [hendelseId]);
    return rows;
  }
};

module.exports = TiltakRepository;