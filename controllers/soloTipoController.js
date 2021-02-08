// models
const { TipoSolo } = require('../sequelize');

module.exports = {
    async index(req, res) {

        const tipoSolos = await TipoSolo.findAll().catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ tipoSolos });
    },

    async show(req, res) {

        const tipoSolos = await TipoSolo.findAll({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ tipoSolos });
    },

    async store(req, res) {

        const { tipo } = req.body;

        const tipoSolo = await TipoSolo.create({ 
            tipo        
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json(tipoSolo);
    },

    async update(req, res) {

        const { tipo } = req.body;

        const tipoSolo = await TipoSolo.update({
            tipo
        }, {
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(tipoSolo == 1) {
            return res.status(200).json({ message: 'Tipo de solo atualizado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível atualizar tipo de solo' });
        }
    },

    async destroy(req, res) {

        const tipoSolo = await TipoSolo.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(tipoSolo == 1) {
            return res.status(200).json({ message: 'Tipo de solo deletado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível deletar tipo de solo' });
        }
    },
}