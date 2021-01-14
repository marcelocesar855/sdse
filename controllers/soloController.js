
const { Solo, Empresa, Status, File } = require('../sequelize');

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
    },
    async indexFilesBySolo(req, res) {
        const soloId = req.params.id
        const files = await File.findAll({
            where: {
                soloId
            }
        });

        return res.status(200).json(files);
    },

    async storeFile(req, res) {

        if (req.file) {
            const {size, key, location: url = '', fileTypeId} = req.file;

            await File.create({
                key,
                size,
                url,
                fileTypeId       
            }).then(async (file) => {
                    return res.status(200).json(file);
            }).catch(error => {
                return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
            });

        } else {
            return res.status(400).json({ message: 'Error inesperado, não foi possível salvar arquivo' });
        }  
    },

    async destroyFile(req, res) {
        try {

            await File.destroy({
                where: {
                    soloId: req.soloId
                }
            });

            return res.status(200).json({ message: 'Arquivo deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        }
    }
}