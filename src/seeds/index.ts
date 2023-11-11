import { database } from '../database2';
import { initialSeed } from './1-initial.seeds';
const seeds = [initialSeed];

const run = async () => {
  await database.initialize();

  for (const seed of seeds) {
    try {
      await seed.up();
    } catch (error) {
      console.log(error);
    }
  }
};

run();
