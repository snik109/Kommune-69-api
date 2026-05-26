const db = require('../data/db');

const HendelseRepository = {
  // Opprett ny hendelse
  async create(hendelse) {
    const { ansvarligBruker, opprettetAv, statusId, prioriteringId, tittel, beskrivelse } = hendelse;
    const sql = `
      INSERT INTO Hendelse (Ansvarlig_Bruker, OpprettetAv, Status_ID, Prioritering_ID, Tittel, Beskrivelse, Tidspunkt_Opprettet)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await db.query(sql, [
      ansvarligBruker,
      opprettetAv,
      statusId,
      prioriteringId,
      tittel,
      beskrivelse,
    ]);
    return result.insertId;
  },

  // Hent én hendelse med status, prioritering og ansvarlig bruker
  async findById(hendelseId) {
    const sql = `
      SELECT h.*,
             s.Navn AS StatusNavn,
             p.Navn AS PrioriteringNavn, p.Verdi AS PrioriteringVerdi,
             b.DisplayName AS AnsvarligNavn,
             o.DisplayName AS OpprettetAvNavn
      FROM Hendelse h
      LEFT JOIN Status s ON h.Status_ID = s.Status_ID
      LEFT JOIN Prioritering p ON h.Prioritering_ID = p.Prioritering_ID
      LEFT JOIN Brukere b ON h.Ansvarlig_Bruker = b.Bruker_ID
      LEFT JOIN Brukere o ON h.OpprettetAv = o.Bruker_ID
      WHERE h.Hendelse_ID = ?
    `;
    const [rows] = await db.query(sql, [hendelseId]);
    return rows[0] || null;
  },

  // Hent alle hendelser (med join-data for listevisning)
  async getAll() {
    const sql = `
      SELECT h.Hendelse_ID, h.Tittel, h.Tidspunkt_Opprettet, h.Tidspunkt_Sist_Redigert,
             s.Navn AS StatusNavn,
             p.Navn AS PrioriteringNavn, p.Verdi AS PrioriteringVerdi,
             b.DisplayName AS AnsvarligNavn
      FROM Hendelse h
      LEFT JOIN Status s ON h.Status_ID = s.Status_ID
      LEFT JOIN Prioritering p ON h.Prioritering_ID = p.Prioritering_ID
      LEFT JOIN Brukere b ON h.Ansvarlig_Bruker = b.Bruker_ID
      ORDER BY p.Verdi DESC, h.Tidspunkt_Opprettet DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // Oppdater status på en hendelse
  async updateStatus(hendelseId, statusId) {
    const sql =
      'UPDATE Hendelse SET Status_ID = ?, Tidspunkt_Sist_Redigert = NOW() WHERE Hendelse_ID = ?';
    const [result] = await db.query(sql, [statusId, hendelseId]);
    return result.affectedRows > 0;
  },

  // Oppdater prioritering på en hendelse
  async updatePriority(hendelseId, prioriteringId) {
    const sql =
      'UPDATE Hendelse SET Prioritering_ID = ?, Tidspunkt_Sist_Redigert = NOW() WHERE Hendelse_ID = ?';
    const [result] = await db.query(sql, [prioriteringId, hendelseId]);
    return result.affectedRows > 0;
  },

  // Oppdater ansvarlig bruker
  async updateResponsible(hendelseId, brukerId) {
    const sql =
      'UPDATE Hendelse SET Ansvarlig_Bruker = ?, Tidspunkt_Sist_Redigert = NOW() WHERE Hendelse_ID = ?';
    const [result] = await db.query(sql, [brukerId, hendelseId]);
    return result.affectedRows > 0;
  },

  // Hent alle hendelser for en spesifikk ansvarlig bruker
  async getByResponsibleUser(brukerId) {
    const sql = `
      SELECT h.*, s.Navn AS StatusNavn, p.Navn AS PrioriteringNavn
      FROM Hendelse h
      LEFT JOIN Status s ON h.Status_ID = s.Status_ID
      LEFT JOIN Prioritering p ON h.Prioritering_ID = p.Prioritering_ID
      WHERE h.Ansvarlig_Bruker = ?
      ORDER BY h.Tidspunkt_Opprettet DESC
    `;
    const [rows] = await db.query(sql, [brukerId]);
    return rows;
  },

  // Slett en hendelse (CASCADE sletter tiltak, kommentarer og kategori-koblinger)
  async delete(hendelseId) {
    const [result] = await db.query('DELETE FROM Hendelse WHERE Hendelse_ID = ?', [hendelseId]);
    return result.affectedRows > 0;
  },

  // Legg til en kategori på en hendelse (Mange-til-mange)
  async addCategory(hendelseId, kategoriId) {
    const sql = 'INSERT IGNORE INTO Kategori_Hendelse (Hendelse_ID, Kategori_ID) VALUES (?, ?)';
    const [result] = await db.query(sql, [hendelseId, kategoriId]);
    return result.affectedRows > 0;
  },

  // Fjern en kategori fra en hendelse
  async removeCategory(hendelseId, kategoriId) {
    const sql = 'DELETE FROM Kategori_Hendelse WHERE Hendelse_ID = ? AND Kategori_ID = ?';
    const [result] = await db.query(sql, [hendelseId, kategoriId]);
    return result.affectedRows > 0;
  },

  // Hent alle kategorier for en spesifikk hendelse
  async getCategories(hendelseId) {
    const sql = `
      SELECT k.* FROM Kategori k
      JOIN Kategori_Hendelse kh ON k.Kategori_ID = kh.Kategori_ID
      WHERE kh.Hendelse_ID = ?
      ORDER BY k.Navn ASC
    `;
    const [rows] = await db.query(sql, [hendelseId]);
    return rows;
  },
};

module.exports = HendelseRepository;