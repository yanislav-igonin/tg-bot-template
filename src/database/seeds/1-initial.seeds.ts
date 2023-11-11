import { UserModel } from '../models/user.model';
import { Seed } from './Seed';

export const initialSeed: Seed = {
  async up() {
    const user = new UserModel();
    user.username = 'bot';
    user.firstName = 'bot';
    user.lastName = 'bot';
    user.language = 'en';
    user.isAllowed = true;
    await user.save();
  },

  async down() {
    await UserModel.delete({ username: 'bot' });
  },
};
