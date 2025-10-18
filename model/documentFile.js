const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const DocumentFile = sequelize.define('document_file',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    originalName: {
        type: DataTypes.CHAR,
    },
    mimeType: {
        type: DataTypes.CHAR,
    },
    size: {
        type: DataTypes.CHAR,
    },
    path: {
        type: DataTypes.CHAR
    }
}, {
    paranoid: true,
    freezeTableName: true,
})

module.exports = DocumentFile