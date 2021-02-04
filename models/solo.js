module.exports = (sequelize, type) => {
    return sequelize.define('solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        volume: type.DOUBLE,
        latitude: type.STRING(45),
        longitude: type.STRING(45)
    })
} 