// models
const { FileType } = require('../models/fileType');

module.exports = {
    async index(req, res) {

        const fileTypes = await FileType.findAll().catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ fileTypes });
    },

    async show(req, res) {

        const fileTypes = await FileType.findAll({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json({ fileTypes });
    },

    async store(req, res) {

        const { name, mimeType } = req.body;

        const fileType = await FileType.create({ 
            name, mimeType        
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        return res.status(200).json(fileType);
    },

    async update(req, res) {

        const { name, mimeType } = req.body;

        const fileType = await FileType.update({
            name, mimeType
        }, {
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(fileType == 1) {
            return res.status(200).json({ message: 'Tipo de arquivo atualizado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível atualizar tipo de arquivo' });
        }
    },

    async destroy(req, res) {

        const fileType = await FileType.destroy({
            where: {
                id: req.params.id
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if(fileType == 1) {
            return res.status(200).json({ message: 'Tipo de arquivo deletado com sucesso' });            
        } else {
            return res.status(400).json({ message: 'Não foi possível deletar tipo de arquivo' });
        }
    },
}