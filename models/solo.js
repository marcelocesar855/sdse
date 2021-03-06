module.exports = (sequelize, type) => {
    return sequelize.define('solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        volume: type.DOUBLE,
        cbr: type.DOUBLE,
        idInteresse: type.INTEGER,
        latitude: type.STRING(45),
        longitude: type.STRING(45),
        responsaLaudo: type.BOOLEAN
    })
} 