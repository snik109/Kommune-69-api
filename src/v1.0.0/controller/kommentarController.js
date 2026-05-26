const KommentarService = require('../services/kommentarService');
const RolleRepository = require('../repositories/rolleRepository');

const KommentarController = {
  // POST /api/hendelser/:hendelseId/kommentarer
  async create(req, res, next) {
    try {
      const kommentar = await KommentarService.create(
        Number(req.params.hendelseId),
        req.session.brukerId,
        req.body.tekst
      );
      res.status(201).json(kommentar);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hendelser/:hendelseId/kommentarer
  async getByHendelse(req, res, next) {
    try {
      const kommentarer = await KommentarService.getByHendelse(Number(req.params.hendelseId));
      res.json(kommentarer);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/kommentarer/:id
  async delete(req, res, next) {
    try {
      const isAdmin = await RolleRepository.userHasRole(req.session.brukerId, 'Admin');
      await KommentarService.delete(
        Number(req.params.id),
        req.session.brukerId,
        isAdmin
      );
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = KommentarController;