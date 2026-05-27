import KommentarService from '../services/kommentarService.js';
import RolleService from '../services/rolleService.js';

const KommentarController = {
  // POST /api/hendelser/:hendelseId/kommentarer
  async create(req, res, next) {
    try {
      const kommentar = await KommentarService.create(
        Number(req.params.hendelseId),
        req.user?.Bruker_ID,
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
      const brukerId = req.user?.Bruker_ID;
      const isAdmin = await RolleService.userHasRole(brukerId, 'Admin');
      await KommentarService.delete(
        Number(req.params.id),
        brukerId,
        isAdmin
      );
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default KommentarController;