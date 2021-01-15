module.exports = (sequelize, type) => {
    return sequelize.define('file', {   
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      key: {
        allowNull: false,
        type: type.STRING(100)        
      },   
      size: {
        allowNull: false,
        type: type.BIGINT     
      },   
      url: {
        allowNull: false,
        type: type.STRING(200),
        set(val) {
          let url = val != '' ? val: `${process.env.APP_URL}/files/${this.key}`;
          this.setDataValue('url', url);       
        }        
      },  
    });
}