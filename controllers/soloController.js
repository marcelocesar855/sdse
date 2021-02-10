
const { Solo, Empresa, Status, File, TipoSolo } = require('../sequelize');

module.exports = {
    async store(req, res) {
        const {volume, latitude, longitude, statusSoloId, tipoSoloId} = req.body
        await Solo.create({
            volume,
            latitude,
            longitude,
            statusSoloId,
            tipoSoloId,
            empresaUserId : req.empresaId
        })
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
        await Solo.findAll({
            where : {empresaUserId : req.params.id},
            include : [{
                model : Empresa,
                attributes: {
                    exclude: ['senha']
                }
            }]
        })
        .then(datas => res.json(datas))
    },
    async indexWithData (req, res) {
        await Solo.findAll({
            include : [
                {model : Empresa,
                    attributes: {
                        exclude: ['senha']
                    } },
                {model : Status},
                {model : File}
            ]
        })
        .then(datas => res.json(datas))
    },
    async indexDoacoesWithDataByParams (req, res) {
        const { volume, tipoId } = req.body;
        var params = {
            where :{
                statusSolosId : {[Op.or]: [1, 3]}
                },
            include : [
                {model : Empresa,
                    where : {
                        id : req.empresaId
                    },
                    attributes: {
                        exclude: ['senha']
                    }
                },
                {model : Status},
                {model : TipoSolo}
            ]
        }
        if (volume) {
            params = {...params, where: {volume : volume}}
        }
        if (tipoId) {
            params = {...params, where: {...params.where,
                tipoSoloId : tipoId
            }}
        }
        await Solo.findAll(params)
        .then(datas => res.json(datas))
    },
    async indexSolicitacoesWithDataByParams (req, res) {
        const { volume, tipoId } = req.body;
        var params = {
            where :{
                statusSolosId : {[Op.or]: [2, 4]}
                },
            include : [
                {model : Empresa,
                    where : {id : req.empresaId},
                    attributes: {
                        exclude: ['senha']
                    }
                },
                {model : Status},
                {model : TipoSolo}
            ]
        }
        if (volume) {
            params = {...params, where: {volume : volume}}
        }
        if (tipoId) {
            params = {...params, where: {...params.where,
                tipoSoloId : tipoId
            }}
        }
        await Solo.findAll(params)
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
            const { size, key, location: url = '', fileTypeId } = req.file;
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