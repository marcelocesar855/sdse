module.exports = (sequelize, type) => {
    return sequelize.define('status_solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        status: type.STRING(25),
    })
} 