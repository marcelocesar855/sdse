module.exports = (sequelize, type) => {
    return sequelize.define('solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tipo: type.STRING(25),
        volume: type.DOUBLE,
    })
} 