import KommentarRepository from '../repositories/kommentarRepository.js';
import HendelseRepository from '../repositories/hendelseRepository.js';

const KommentarService = {
  async create(hendelseId, brukerId, tekst) {
    if (!tekst || !tekst.trim()) {
      const err = new Error('Kommentartekst kan ikke være tom.');
      err.status = 400;
      throw err;
    }
    const hendelse = await HendelseRepository.findById(hendelseId);
    if (!hendelse) {
      const err = new Error('Hendelse ikke funnet.');
      err.status = 404;
      throw err;
    }
    const id = await KommentarRepository.create(hendelseId, brukerId, tekst.trim());
    return KommentarRepository.findById(id);
  },

  async getByHendelse(hendelseId) {
    const hendelse = await HendelseRepository.findById(hendelseId);
    if (!hendelse) {
      const err = new Error('Hendelse ikke funnet.');
      err.status = 404;
      throw err;
    }
    return KommentarRepository.getByHendelse(hendelseId);
  },

  async delete(kommentarId, requestingBrukerId, isAdmin = false) {
    const kommentar = await KommentarRepository.findById(kommentarId);
    if (!kommentar) {
      const err = new Error('Kommentar ikke funnet.');
      err.status = 404;
      throw err;
    }
    // Only the author or an admin may delete
    if (!isAdmin && kommentar.Bruker_ID !== requestingBrukerId) {
      const err = new Error('Ikke tilgang til å slette denne kommentaren.');
      err.status = 403;
      throw err;
    }
    return KommentarRepository.delete(kommentarId);
  },
};

export default KommentarService;