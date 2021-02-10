const Sequelize = require('sequelize')
const SoloModel = require('./models/solo')
const EmpresaModel = require('./models/empresa')
const StatusModel = require('./models/status')
const FileModel = require('./models/file')
const FileTypeModel = require('./models/fileType')
const PasswordResetModel = require('./models/passwordReset')
const TipoModel = require('./models/tipoSolo')
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Solo = SoloModel(sequelize, Sequelize)
const Empresa = EmpresaModel(sequelize, Sequelize)
const Status = StatusModel(sequelize, Sequelize)
const File = FileModel(sequelize, Sequelize)
const FileType = FileTypeModel(sequelize, Sequelize)
const UserPasswordReset = PasswordResetModel(sequelize, Sequelize)
const TipoSolo = TipoModel(sequelize, Sequelize)

Solo.belongsTo(Empresa)
Empresa.hasMany(Solo)
Solo.belongsTo(Status)
Status.hasMany(Solo)
Solo.belongsTo(TipoSolo)
TipoSolo.hasMany(Solo)
File.belongsTo(FileType)
File.belongsTo(Solo)
Solo.hasOne(File)

File.beforeDestroy((file, options) => {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.key)
  );
});

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Solo,
  Empresa,
  Status,
  File,
  FileType,
  UserPasswordReset,
  TipoSolo
}