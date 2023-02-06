'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    }
    Company.init({
        company_id: DataTypes.STRING,
        company_name: DataTypes.STRING,
        ceo_name: DataTypes.STRING,
        tags: DataTypes.ARRAY(DataTypes.STRING),
        company_score:DataTypes.DECIMAL,
        sector: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Company',
    })
    return Company
}