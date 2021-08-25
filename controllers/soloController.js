const { Solo, Empresa, TipoSolo, Status, File, RA } = require('../sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Email = require('../helpers/email');
const interesseSolo = require('./../models/emails/interesseSolo');
const aceiteInteresse = require('./../models/emails/aceiteInteresse');
const recusaInteresse = require('./../models/emails/recusaInteresse');
const informeCadastro = require('./../models/emails/informeCadastro');

module.exports = {
    async store(req, res) {
        const {volume, latitude, longitude, statusSoloId, tipoSoloId, raSoloId, cbr, responsaLaudo} = req.body
        await Solo.create({
            volume,
            latitude,
            longitude,
            statusSoloId,
            tipoSoloId,
            raSoloId,
            cbr,
            responsaLaudo,
            empresaUserId : req.empresaId
        })
        .then(async data => {
            if(statusSoloId == 1 || statusSoloId == 2){
                const cadastro = await Empresa.findByPk(req.empresaId)
                const empresas = await Empresa.findAll()
                empresas.map(async empresa => {
                    let html = informeCadastro.render({ nome : cadastro.nome, tipo : statusSoloId == 1 ? 'Doação' : 'Solicitação'});
                    await Email.sendEmail(empresa.email, `Novo registro de ${statusSoloId == 1 ? 'Doação' : 'Solicitação'} - SDSE`, html)
                    .catch( err => {
                        console.log(err)
                    })
                })
            }
            res.json(data)
        })
    },
    async manifestoInteresse(req, res) {
        const {volume, statusSoloId, tipoSoloId, soloId} = req.body
        const solo = await Solo.findOne({
            where : {id : soloId},
            include : [{
                model : Empresa
            }]
        })
        await Solo.create({
            volume,
            statusSoloId,
            tipoSoloId,
            idInteresse : soloId,
            empresaUserId : req.empresaId
        })
        .then(async data => {
            let html = interesseSolo.render({ interesse : data.id});
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
            {model : TipoSolo},
            {model : RA}]
        })
        .then(datas => res.json(datas))
    },
    async indexById (req, res) {
        await Solo.findOne({
            where : {id : req.params.id},
            include : [{
                model : Empresa,
                attributes: {
                    exclude: ['senha']
                }
            },
            {model : Status},
            {model : TipoSolo}]
        })
        .then(datas => {
            res.json(datas)
        })
    },
    async indexWithData (req, res) {
        await Solo.findAll({
            include : [
                {model : Empresa,
                    attributes: {
                        exclude: ['senha']
                    } },
                {model : Status},
                {model : File},
                {model : RA}
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
                {model : TipoSolo},
                {model : RA}
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
                {model : File},
                {model : RA}
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
                {model : TipoSolo},
                {model : RA}
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
    },
    async aceitar(req, res) {
        const {id,volume, idInteresse} = req.body
        let doacao;
        let volumeDoacao;
        await Solo.findOne({
            where : {id : idInteresse},
            include : [
                {model : Empresa},
                {model : TipoSolo}
            ]
        }).then(solo => {
            doacao = solo;
            volumeDoacao = solo.volume;
            var total = solo.volume - volume
            if(total > 0){
                solo.update({
                    volume : total
                })
            }else{
                solo.update({
                    statusSoloId : 3
                })
            }
        })
        await Solo.findOne({
            where : {id},
            include : [{
                model : Empresa
            }]
        })
        .then(async data => {
            doacao.volume = volumeDoacao
            data.update({
                statusSoloId : 6
            })
            let html = aceiteInteresse.render({ volume : data.volume, doacao});
            await Email.sendEmail(data.empresa_user.email, 'Aceite de interesse em doação - SDSE', html)
            .catch( err => {
                console.log(err)
            })
            res.json(data)
        })
    },
    async recusar(req, res) {
        const {id, idInteresse} = req.body
        let doacao;
        await Solo.findOne({
            where : {id : idInteresse},
            include : [
                {model : Empresa},
                {model : TipoSolo}
            ]
        }).then(solo => {
            doacao = solo;
        })
        await Solo.findOne({
            where : {id},
            include : [{
                model : Empresa
            }]
        })
        .then(async data => {
            data.update({
                statusSoloId : 7
            })
            let html = recusaInteresse.render({ volume : data.volume, doacao});
            await Email.sendEmail(data.empresa_user.email, 'Recusa de interesse em doação - SDSE', html)
            .catch( err => {
                console.log(err)
            })
            res.json(data)
        })
    }
}