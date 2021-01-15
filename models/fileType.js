module.exports = (sequelize, type) => {
  return sequelize.define('file_type', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: type.STRING(45),
        allowNull: false,
    },
    mimeType: {
      type: type.STRING(200),
      allowNull: false,
    },
  })
};