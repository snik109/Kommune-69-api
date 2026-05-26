const RolleService = require('../services/rolleService');

const RolleController = {
  // POST /api/brukere/:brukerId/roller
  async assign(req, res, next) {
    try {
      await RolleService.assignRole(Number(req.params.brukerId), req.body.rolleId);
      res.status(201).json({ message: 'Rolle tildelt.' });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/brukere/:brukerId/roller/:rolleId
  async remove(req, res, next) {
    try {
      await RolleService.removeRole(
        Number(req.params.brukerId),
        Number(req.params.rolleId)
      );
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  // GET /api/brukere/:brukerId/roller
  async getRolesForUser(req, res, next) {
    try {
      const roller = await RolleService.getRolesForUser(Number(req.params.brukerId));
      res.json(roller);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = RolleController;