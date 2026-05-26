import TiltakService from '../services/tiltakService.js';

const TiltakController = {
  // POST /api/hendelser/:hendelseId/tiltak
  async add(req, res, next) {
    try {
      const tiltak = await TiltakService.add(
        Number(req.params.hendelseId),
        req.session.brukerId,
        req.body.beskrivelse
      );
      res.status(201).json(tiltak);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hendelser/:hendelseId/tiltak
  async getByHendelse(req, res, next) {
    try {
      const tiltak = await TiltakService.getByHendelse(Number(req.params.hendelseId));
      res.json(tiltak);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/tiltak/:id
  async delete(req, res, next) {
    try {
      await TiltakService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default TiltakController;