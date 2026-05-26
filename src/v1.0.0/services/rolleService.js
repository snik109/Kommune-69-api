import RolleRepository from '../repositories/rolleRepository.js';
import BrukerRepository from '../repositories/brukerRepository.js';

const RolleService = {
  async assignRole(brukerId, rolleId) {
    const bruker = await BrukerRepository.findById(brukerId);
    if (!bruker) {
      const err = new Error('Bruker ikke funnet.');
      err.status = 404;
      throw err;
    }
    return RolleRepository.assignRoleToUser(brukerId, rolleId);
  },

  async removeRole(brukerId, rolleId) {
    const bruker = await BrukerRepository.findById(brukerId);
    if (!bruker) {
      const err = new Error('Bruker ikke funnet.');
      err.status = 404;
      throw err;
    }
    const removed = await RolleRepository.removeRoleFromUser(brukerId, rolleId);
    if (!removed) {
      const err = new Error('Rolle ikke funnet for denne brukeren.');
      err.status = 404;
      throw err;
    }
    return true;
  },

  async getRolesForUser(brukerId) {
    return RolleRepository.getRolesForUser(brukerId);
  },

  async userHasRole(brukerId, rolleNavn) {
    return RolleRepository.userHasRole(brukerId, rolleNavn);
  },
};

export default RolleService;