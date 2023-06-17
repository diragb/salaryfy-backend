'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Questions', 'course_id',
    {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Questions','course_id');
  }
};
