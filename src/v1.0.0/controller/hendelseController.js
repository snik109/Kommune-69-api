const HendelseService = require('../services/hendelseService');

const HendelseController = {
  // POST /api/hendelser
  async create(req, res, next) {
    try {
      const data = { ...req.body, opprettetAv: req.session.brukerId };
      const hendelse = await HendelseService.create(data);
      res.status(201).json(hendelse);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hendelser
  async getAll(req, res, next) {
    try {
      const hendelser = await HendelseService.getAll();
      res.json(hendelser);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hendelser/:id
  async getById(req, res, next) {
    try {
      const hendelse = await HendelseService.getById(Number(req.params.id));
      res.json(hendelse);
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/hendelser/:id/status
  async updateStatus(req, res, next) {
    try {
      const hendelse = await HendelseService.updateStatus(
        Number(req.params.id),
        req.body.statusId
      );
      res.json(hendelse);
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/hendelser/:id/prioritering
  async updatePriority(req, res, next) {
    try {
      const hendelse = await HendelseService.updatePriority(
        Number(req.params.id),
        req.body.prioriteringId
      );
      res.json(hendelse);
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/hendelser/:id/ansvarlig
  async updateResponsible(req, res, next) {
    try {
      const hendelse = await HendelseService.updateResponsible(
        Number(req.params.id),
        req.body.brukerId
      );
      res.json(hendelse);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/hendelser/:id
  async delete(req, res, next) {
    try {
      await HendelseService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  // GET /api/hendelser/:id/kategorier
  async getCategories(req, res, next) {
    try {
      const kategorier = await HendelseService.getCategories(Number(req.params.id));
      res.json(kategorier);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/hendelser/:id/kategorier
  async addCategory(req, res, next) {
    try {
      await HendelseService.addCategory(Number(req.params.id), req.body.kategoriId);
      res.status(201).json({ message: 'Kategori lagt til.' });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/hendelser/:id/kategorier/:kategoriId
  async removeCategory(req, res, next) {
    try {
      await HendelseService.removeCategory(
        Number(req.params.id),
        Number(req.params.kategoriId)
      );
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = HendelseController;