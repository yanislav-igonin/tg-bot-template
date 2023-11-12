import * as path from 'path';
import prompts from 'prompts';
import { MigrationCreateCommand } from 'typeorm/commands/MigrationCreateCommand';
import { MigrationGenerateCommand } from 'typeorm/commands/MigrationGenerateCommand';
import { MigrationRevertCommand } from 'typeorm/commands/MigrationRevertCommand';
import { MigrationRunCommand } from 'typeorm/commands/MigrationRunCommand';
import { MigrationShowCommand } from 'typeorm/commands/MigrationShowCommand';
import type * as yargs from 'yargs';

enum OPERATION {
  GENERATE = 'generate',
  CREATE = 'create',
  RUN = 'run',
  REVERT = 'revert',
  SHOW = 'show',
}

const operationsClasses: Record<string, yargs.CommandModule> = {
  [OPERATION.GENERATE]: new MigrationGenerateCommand(),
  [OPERATION.CREATE]: new MigrationCreateCommand(),
  [OPERATION.REVERT]: new MigrationRevertCommand(),
  [OPERATION.RUN]: new MigrationRunCommand(),
  [OPERATION.SHOW]: new MigrationShowCommand(),
};

type PromptResult = {
  operation: OPERATION;
  migrationName?: string;
};

const runPrompt = async (): Promise<PromptResult> => {
  const res = await prompts(
    [
      {
        type: 'select',
        name: 'operation',
        message: 'Select operation',
        choices: [
          { title: 'Generate migration', value: OPERATION.GENERATE },
          { title: 'Create empty migration', value: OPERATION.CREATE },
          { title: 'Execute all pending migrations', value: OPERATION.RUN },
          {
            title: 'Revert the most recently executed migration',
            value: OPERATION.REVERT,
          },
          {
            title: "Show all migrations and whether they've been run or not",
            value: OPERATION.SHOW,
          },
        ],
        initial: 0,
      },
      {
        type: (prev) =>
          [OPERATION.GENERATE, OPERATION.CREATE].includes(prev) ? 'text' : null,
        name: 'migrationName',
        message: 'Migration name',
        validate: (input: string) => input.length > 1,
      },
    ],
    {
      onCancel: () => {
        console.log('Goodbye!');
        process.exit(0);
      },
    },
  );

  return res;
};

const main = async () => {
  const { operation, migrationName } = await runPrompt();

  const migrationsPath = path.resolve(process.cwd(), 'src/database/migrations');
  const ormConfigPath = path.resolve(
    migrationsPath,
    '..',
    'index.ts',
  );

  const command = operationsClasses[operation];
  const pathForCommand =
    migrationName !== undefined
      ? path.resolve(migrationsPath, migrationName)
      : migrationsPath;

  await command!.handler({
    _: [],
    $0: 'dumb',
    dataSource: ormConfigPath,
    path: pathForCommand,
  });
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});