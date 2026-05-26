const TiltakRepository = require('../repositories/tiltakRepository');
const HendelseRepository = require('../repositories/hendelseRepository');

const TiltakService = {
  async add(hendelseId, utfortAv, beskrivelse) {
    if (!beskrivelse || !beskrivelse.trim()) {
      const err = new Error('Beskrivelse kan ikke være tom.');
      err.status = 400;
      throw err;
    }
    const hendelse = await HendelseRepository.findById(hendelseId);
    if (!hendelse) {
      const err = new Error('Hendelse ikke funnet.');
      err.status = 404;
      throw err;
    }
    const id = await TiltakRepository.addTiltak(hendelseId, utfortAv, beskrivelse.trim());
    return TiltakRepository.findById(id);
  },

  async getByHendelse(hendelseId) {
    const hendelse = await HendelseRepository.findById(hendelseId);
    if (!hendelse) {
      const err = new Error('Hendelse ikke funnet.');
      err.status = 404;
      throw err;
    }
    return TiltakRepository.getByHendelse(hendelseId);
  },

  async delete(tiltakId) {
    const tiltak = await TiltakRepository.findById(tiltakId);
    if (!tiltak) {
      const err = new Error('Tiltak ikke funnet.');
      err.status = 404;
      throw err;
    }
    return TiltakRepository.delete(tiltakId);
  },
};

module.exports = TiltakService;