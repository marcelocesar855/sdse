
const { Solo, Empresa, Status } = require('../sequelize');

module.exports = {
    async store(req, res) {
        await Solo.create(req.body)
        .then(data => res.json(data))
    },
    async index (req, res) {
        await Solo.findAll()
        .then(datas => res.json(datas))
    },
    async update(req, res) {
        await Solo.findByPk(req.params.id)
        .then(solo => {
            solo.update(req.body)
            res.json(solo)
        })
    },
    async destroy(req, res) {
        await Solo.findByPk(req.params.id)
        .then(solo => {
            solo.destroy()
            res.json(solo)
        })
    },
    async indexByEmpresa (req, res) {
        const {empresaId} = req.body
        await Solo.findAll({
            where : {empresaId : empresaId},
            include : [{
                model : Empresa
            }]
        })
        .then(datas => res.json(datas))
    },
    async indexWithData (req, res) {
        await Solo.findAll({
            include : [
                {model : Empresa},
                {model : Status}
            ]
        })
        .then(datas => res.json(datas))
    }
}