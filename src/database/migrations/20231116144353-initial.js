/* eslint-disable canonical/sort-keys */
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const { getBaseColumns } = require('./utils');

const usersTableName = 'users';
const chatsTableName = 'chats';
const messagesTableName = 'messages';

const ChatType = {
  Group: 'group',
  Private: 'private',
  Supergroup: 'supergroup',
  Channel: 'channel',
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async down(queryInterface) {
    await queryInterface.dropTable(messagesTableName);
    await queryInterface.dropTable(chatsTableName);
    await queryInterface.dropTable(usersTableName);
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(usersTableName, {
      ...getBaseColumns(Sequelize),
      usename: Sequelize.STRING,
      tgId: { type: Sequelize.STRING, unique: true, allowNull: false },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      languageCode: Sequelize.STRING(2),
      isAllowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    });

    await queryInterface.createTable(chatsTableName, {
      ...getBaseColumns(Sequelize),
      tgId: { type: Sequelize.STRING, unique: true, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      type: {
        type: Sequelize.ENUM([
          ChatType.Private,
          ChatType.Channel,
          ChatType.Group,
          ChatType.Supergroup,
        ]),
        allowNull: false,
      },
    });

    await queryInterface.createTable(messagesTableName, {
      ...getBaseColumns(Sequelize),
      tgId: { type: Sequelize.STRING, unique: true, allowNull: false },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'chats', key: 'id' },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      text: Sequelize.TEXT,
    });
  },
};
