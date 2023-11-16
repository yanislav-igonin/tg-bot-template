/* eslint-disable canonical/sort-keys */
/**
 * @param {typeof import('sequelize')} Sequelize
 */
module.exports.getBaseColumns = (Sequelize) => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    type: Sequelize.TIME,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP '),
    type: Sequelize.TIME,
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});
