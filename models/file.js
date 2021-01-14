module.exports = (sequelize, DataTypes) => {
    return sequelize.define('file', {   
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      key: {
        allowNull: false,
        type: DataTypes.STRING(100)        
      },   
      size: {
        allowNull: false,
        type: DataTypes.BIGINT     
      },   
      url: {
        allowNull: false,
        type: DataTypes.STRING(200),
        set(val) {
          let url = val != '' ? val: `${process.env.APP_URL}/files/${this.key}`;
          this.setDataValue('url', url);       
        }        
      },  
    });
}