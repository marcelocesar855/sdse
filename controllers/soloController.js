const { Solo, Empresa, TipoSolo, Status, File } = require('../sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Email = require('../helpers/Email');
const interesseSolo = require('./../models/emails/interesseSolo');

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
    async manifestoInteresse(req, res) {
        const {volume, statusSoloId, tipoSoloId, soloId} = req.body
        const solo = Solo.findAll({
            where : {id : soloId},
            include : [{
                model : Empresa
            }]
        })
        await Solo.create({
            volume,
            statusSoloId,
            tipoSoloId,
            empresaUserId : req.empresaId
        })
        .then(async data => {
            let html = interesseSolo.render({ doacao : soloId, interesse : data.id});
            await Email.sendEmail(solo.empresa_user.email, 'Manifestação de interesse em doação - SDSE', html)
            .catch( err => {
                console.log(err)
            })
            res.json(data)
        })
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
            where : {empresaUserId : req.empresaId},
            include : [{
                model : Empresa,
                attributes: {
                    exclude: ['senha']
                }
            },
            {model : Status},
            {model : TipoSolo},]
        })
        .then(datas => res.json(datas))
    },
    async indexById (req, res) {
        await Solo.findAll({
            where : {id : req.body.id},
            include : [{
                model : Empresa,
                attributes: {
                    exclude: ['senha']
                }
            },
            {model : Status},
            {model : TipoSolo},]
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
                statusSoloId : {[Op.or]: [3, 1]}
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
    async indexDoacoesDisponiveisWithDataByParams (req, res) {
        const { volume, tipoId } = req.body;
        var params = {
            where :{
                statusSoloId : 1
                },
            include : [
                {model : Empresa,
                    attributes: {
                        exclude: ['senha']
                    }
                },
                {model : Status},
                {model : TipoSolo},
                {model : File}
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
                statusSoloId : {[Op.or]: [4, 2]}
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
        const {soloId} = req.body
        if (req.file) {
            const { size, key, location: url = '', fileTypeId } = req.file;
            await File.create({
                key,
                size,
                url,
                fileTypeId,
                soloId      
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