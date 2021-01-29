module.exports = (sequelize, type) => {
    return sequelize.define('solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tipo: type.INTEGER,
        status: type.INTEGER,
        volume: type.DOUBLE,
        latitude: type.STRING(45),
        longitude: type.STRING(45)
    })
} 