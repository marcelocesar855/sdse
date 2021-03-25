module.exports = (sequelize, type) => {
    return sequelize.define('ra_solo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ra: type.STRING(25),
    })
} 