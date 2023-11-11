import { DataSource } from 'typeorm';

export type Seed = {
  up(): Promise<void>;
  down(): Promise<void>;
};
