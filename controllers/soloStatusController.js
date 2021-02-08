// models
const { Status } = require('../sequelize');

module.exports = {
    async index(req, res) {

        const status = await Status.findAll().catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ status });
    },

    async show(req, res) {

        const status = await Status.findAll({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ status });
    },

    async store(req, res) {

        const { tipo } = req.body;

        const Status = await Status.create({ 
            tipo        
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json(Status);
    },

    async update(req, res) {

        const { tipo } = req.body;

        const Status = await Status.update({
            tipo
        }, {
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(Status == 1) {
            return res.status(200).json({ message: 'Tipo de solo atualizado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível atualizar tipo de solo' });
        }
    },

    async destroy(req, res) {

        const Status = await Status.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(Status == 1) {
            return res.status(200).json({ message: 'Tipo de solo deletado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível deletar tipo de solo' });
        }
    },
}