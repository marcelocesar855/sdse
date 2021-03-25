// models
const { RA } = require('../sequelize');

module.exports = {
    async index(req, res) {

        const ra = await RA.findAll().catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ ra });
    },

    async show(req, res) {

        const ra = await RA.findAll({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ ra });
    },

    async store(req, res) {

        const { ra } = req.body;

        const ras = await RA.create({ 
            ra        
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json(ras);
    },

    async update(req, res) {

        const { ra } = req.body;

        const ras = await RA.update({
            ra
        }, {
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(ras == 1) {
            return res.status(200).json({ message: 'Tipo de solo atualizado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível atualizar tipo de solo' });
        }
    },

    async destroy(req, res) {

        const ra = await RA.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(ra == 1) {
            return res.status(200).json({ message: 'Tipo de solo deletado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível deletar tipo de solo' });
        }
    }
}