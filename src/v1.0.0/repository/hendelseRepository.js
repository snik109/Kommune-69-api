const db = require('./db');

const HendelseRepository = {
  // Oppdater status på en hendelse
  async updateStatus(hendelseId, statusId) {
    const sql = 'UPDATE Hendelse SET Status_ID = ?, Tidspunkt_Sist_Redigert = NOW() WHERE Hendelse_ID = ?';
    const [result] = await db.query(sql, [statusId, hendelseId]);
    return result.affectedRows > 0;
  },

  // Hent alle hendelser for en spesifikk ansvarlig bruker
  async getByResponsibleUser(brukerId) {
    const sql = 'SELECT * FROM Hendelse WHERE Ansvarlig_Bruker = ?';
    const [rows] = await db.query(sql, [brukerId]);
    return rows;
  },

  // Legg til en kategori på en hendelse (Mange-til-mange)
  async addCategory(hendelseId, kategoriId) {
    const sql = 'INSERT IGNORE INTO Kategori_Hendelse (Hendelse_ID, Kategori_ID) VALUES (?, ?)';
    const [result] = await db.query(sql, [hendelseId, kategoriId]);
    return result.insertId;
  },

  // Hent alle kategorier for en spesifikk hendelse
  async getCategories(hendelseId) {
    const sql = `
      SELECT k.* FROM Kategori k
      JOIN Kategori_Hendelse kh ON k.Kategori_ID = kh.Kategori_ID
      WHERE kh.Hendelse_ID = ?
    `;
    const [rows] = await db.query(sql, [hendelseId]);
    return rows;
  }
};

module.exports = HendelseRepository;