'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_id: {
                type: Sequelize.STRING
            },
            company_name: {
                type: Sequelize.STRING
            },
            ceo_name: {
                type: Sequelize.STRING
            },
            tags: Sequelize.ARRAY(Sequelize.STRING),
            company_score: Sequelize.DECIMAL,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Companies')
    }
}