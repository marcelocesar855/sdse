module.exports = (sequelize, type) => {
    return sequelize.define('tipo_solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        tipo: type.STRING(25),
    })
} 