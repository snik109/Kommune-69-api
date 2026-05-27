import jwt from 'jsonwebtoken';
import BrukerService from '../services/brukerService.js';

const BrukerController = {
  // POST /api/brukere/register
  async register(req, res, next) {
    try {
      const bruker = await BrukerService.register(req.body);
      res.status(201).json(bruker);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/brukere/login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const bruker = await BrukerService.authenticate(username, password);

      const roles = (bruker.roller ?? [])
        .map((r) => r.Navn?.toLowerCase())
        .filter(Boolean);

      const tokenPayload = {
        Bruker_ID: bruker.Bruker_ID,
        Username: bruker.Username,
        roles,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({
        token,
        user: {
          Bruker_ID: bruker.Bruker_ID,
          Username: bruker.Username,
          DisplayName: bruker.DisplayName,
          FullName: bruker.FullName,
          Email: bruker.Email,
          roles,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/brukere/logout
  async logout(req, res, next) {
    try {
      res.json({ message: 'Logget ut.' });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/brukere
  async getAll(req, res, next) {
    try {
      const brukere = await BrukerService.getAll();
      res.json(brukere);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/brukere/:id
  async getById(req, res, next) {
    try {
      const bruker = await BrukerService.getById(Number(req.params.id));
      res.json(bruker);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/brukere/:id/roller
  async getWithRoles(req, res, next) {
    try {
      const bruker = await BrukerService.getWithRoles(Number(req.params.id));
      res.json(bruker);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/brukere/:id
  async update(req, res, next) {
    try {
      const bruker = await BrukerService.update(Number(req.params.id), req.body);
      res.json(bruker);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/brukere/:id
  async delete(req, res, next) {
    try {
      await BrukerService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

export default BrukerController;