import HendelseRepository from '../repositories/hendelseRepository.js';

const HendelseService = {
  async create(data) {
    const { ansvarligBruker, opprettetAv, statusId, prioriteringId, tittel, beskrivelse } = data;

    if (!tittel || !opprettetAv) {
      const err = new Error('Tittel og opprettetAv er påkrevd.');
      err.status = 400;
      throw err;
    }

    const parsedStatusId = statusId === '' || statusId === undefined || statusId === null
      ? null
      : Number(statusId);
    const parsedPrioriteringId = prioriteringId === '' || prioriteringId === undefined || prioriteringId === null
      ? null
      : Number(prioriteringId);

    if (parsedStatusId === null || !Number.isInteger(parsedStatusId) || parsedStatusId <= 0) {
      const err = new Error('statusId må være et gyldig tall.');
      err.status = 400;
      throw err;
    }

    if (parsedPrioriteringId === null || !Number.isInteger(parsedPrioriteringId) || parsedPrioriteringId <= 0) {
      const err = new Error('prioriteringId må være et gyldig tall.');
      err.status = 400;
      throw err;
    }

    const id = await HendelseRepository.create({
      ansvarligBruker,
      opprettetAv,
      statusId: parsedStatusId,
      prioriteringId: parsedPrioriteringId,
      tittel,
      beskrivelse,
    });
    return HendelseRepository.findById(id);
  },

  async getById(hendelseId) {
    const hendelse = await HendelseRepository.findById(hendelseId);
    if (!hendelse) {
      const err = new Error('Hendelse ikke funnet.');
      err.status = 404;
      throw err;
    }
    return hendelse;
  },

  async getAll() {
    return HendelseRepository.getAll();
  },

  async getByResponsibleUser(brukerId) {
    return HendelseRepository.getByResponsibleUser(brukerId);
  },

  async updateStatus(hendelseId, statusId) {
    const parsedStatusId = Number(statusId);
    if (!Number.isInteger(parsedStatusId) || parsedStatusId <= 0) {
      const err = new Error('statusId må være et gyldig tall.');
      err.status = 400;
      throw err;
    }
    await this.getById(hendelseId);
    const updated = await HendelseRepository.updateStatus(hendelseId, parsedStatusId);
    if (!updated) {
      const err = new Error('Kunne ikke oppdatere status.');
      err.status = 500;
      throw err;
    }
    return HendelseRepository.findById(hendelseId);
  },

  async updatePriority(hendelseId, prioriteringId) {
    const parsedPrioriteringId = Number(prioriteringId);
    if (!Number.isInteger(parsedPrioriteringId) || parsedPrioriteringId <= 0) {
      const err = new Error('prioriteringId må være et gyldig tall.');
      err.status = 400;
      throw err;
    }
    await this.getById(hendelseId);
    const updated = await HendelseRepository.updatePriority(hendelseId, parsedPrioriteringId);
    if (!updated) {
      const err = new Error('Kunne ikke oppdatere prioritering.');
      err.status = 500;
      throw err;
    }
    return HendelseRepository.findById(hendelseId);
  },

  async updateResponsible(hendelseId, brukerId) {
    await this.getById(hendelseId);
    const updated = await HendelseRepository.updateResponsible(hendelseId, brukerId);
    if (!updated) {
      const err = new Error('Kunne ikke oppdatere ansvarlig bruker.');
      err.status = 500;
      throw err;
    }
    return HendelseRepository.findById(hendelseId);
  },

  async delete(hendelseId) {
    await this.getById(hendelseId);
    const deleted = await HendelseRepository.delete(hendelseId);
    if (!deleted) {
      const err = new Error('Kunne ikke slette hendelse.');
      err.status = 500;
      throw err;
    }
    return true;
  },

  async getCategories(hendelseId) {
    await this.getById(hendelseId);
    return HendelseRepository.getCategories(hendelseId);
  },

  async addCategory(hendelseId, kategoriId) {
    await this.getById(hendelseId);
    return HendelseRepository.addCategory(hendelseId, kategoriId);
  },

  async removeCategory(hendelseId, kategoriId) {
    await this.getById(hendelseId);
    return HendelseRepository.removeCategory(hendelseId, kategoriId);
  },
};

export default HendelseService;