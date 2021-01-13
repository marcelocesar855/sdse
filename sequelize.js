const Sequelize = require('sequelize')
const SoloModel = require('./models/solo')
const EmpresaModel = require('./models/empresa')
const StatusModel = require('./models/status')

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

Solo.belongsTo(Empresa)
Empresa.hasMany(Solo)
Solo.belongsTo(Status)
Status.hasMany(Solo)

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Solo,
  Empresa,
  Status
}