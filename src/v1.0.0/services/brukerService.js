import bcrypt from 'bcryptjs';
import BrukerRepository from '../repositories/brukerRepository.js';

const SALT_ROUNDS = 12;

const BrukerService = {
  async register({ username, password, displayName, fullName, email }) {
    const existing = await BrukerRepository.findByUsername(username);
    if (existing) {
      const err = new Error('Brukernavnet er allerede i bruk.');
      err.status = 409;
      throw err;
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = await BrukerRepository.create({ username, passwordHash, displayName, fullName, email });
    return { Bruker_ID: id, username, displayName, fullName, email };
  },

  async authenticate(username, password) {
    const bruker = await BrukerRepository.findByUsername(username);
    if (!bruker) {
      const err = new Error('Ugyldig brukernavn eller passord.');
      err.status = 401;
      throw err;
    }
    const valid = await bcrypt.compare(password, bruker.PasswordHash);
    if (!valid) {
      const err = new Error('Ugyldig brukernavn eller passord.');
      err.status = 401;
      throw err;
    }
    // Return user without password hash
    const { PasswordHash, ...safeUser } = bruker;
    return safeUser;
  },

  async getById(brukerId) {
    const bruker = await BrukerRepository.findById(brukerId);
    if (!bruker) {
      const err = new Error('Bruker ikke funnet.');
      err.status = 404;
      throw err;
    }
    return bruker;
  },

  async getWithRoles(brukerId) {
    const bruker = await BrukerRepository.getWithRoles(brukerId);
    if (!bruker) {
      const err = new Error('Bruker ikke funnet.');
      err.status = 404;
      throw err;
    }
    return bruker;
  },

  async getAll() {
    return BrukerRepository.getAll();
  },

  async update(brukerId, fields) {
    await this.getById(brukerId); // throws 404 if missing
    const updated = await BrukerRepository.update(brukerId, fields);
    if (!updated) {
      const err = new Error('Kunne ikke oppdatere bruker.');
      err.status = 500;
      throw err;
    }
    return BrukerRepository.findById(brukerId);
  },

  async delete(brukerId) {
    await this.getById(brukerId);
    const deleted = await BrukerRepository.delete(brukerId);
    if (!deleted) {
      const err = new Error('Kunne ikke slette bruker.');
      err.status = 500;
      throw err;
    }
    return true;
  },
};

export default BrukerService;