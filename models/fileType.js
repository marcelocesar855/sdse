module.exports = (sequelize, DataTypes) => {
  return sequelize.define('file_type', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  })
};