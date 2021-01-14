
const { Empresa } = require('../sequelize');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Email = require('../helpers/Email');
const RecoveryLink = require('./../models/emails/recoveryLink');
const UserPasswordReset = require('../models/passwordReset');
const empresa = require('../models/empresa');

module.exports = {
    async store(req, res) {
        const validCnpj = await Empresa.findOne({
            where: {
                cnpj: req.body.cnpj
            }
        });

        if (validCnpj) {
            return res.status(400).json({ message: 'E-mail informado já foi cadastrado.' });
        }
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
        await Empresa.create(req.body)
        .then(data => res.json(data))
    },
    async index (req, res) {
        await Empresa.findAll()
        .then(datas => res.json(datas))
    },
    async update(req, res) {
        await Empresa.findByPk(req.params.id)
        .then(empresa => {
            empresa.update(req.body)
            res.json(empresa)
        })
    },
    async destroy(req, res) {
        await Empresa.findByPk(req.params.id)
        .then(empresa => {
            empresa.destroy()
            res.json(empresa)
        })
    },
    async indexById (req, res) {
        await Empresa.findByPk(req.params.id)
        .then(data => res.json(data))
    },
    async sendRecoveryLink(empresa, token) {
        let html = RecoveryLink.render({ empresa, token });
        return await Email.sendEmail(empresa.email, 'Redefinição de Senha - SDSE', html);
    },
    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET_KEY || '0XwKaeorvZ', {
            expiresIn: 86400
        });
    },
    async decodedToken(token) {
        try {
            const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY || '0XwKaeorvZ');
            return decoded.id;
        } catch (err) {
            return false;
        }
    },
    async passwordRecovery(req, res) {

        const { email } = req.body; 

        const empresa = await Empresa.findOne({            
            where: {
                email
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if (!empresa) {
            return res.status(400).json({ message: 'E-mail informado não foi encontrado.' });
        }

        let passwordRecovery = new Password();
        let token = passwordRecovery.generateToken(empresa.id);        

        const userPasswordReset = await UserPasswordReset.create({
            email: empresa.email,
            token
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if (userPasswordReset) {
            await passwordRecovery.sendRecoveryLink(empresa, token);
            return res.status(200).json({ message: 'Link de redefinição enviado com sucesso.' });
        }        

        return res.status(400).json({ message: 'Não foi possível enviar link de redefinição, tente novamente mais tarde.' });        
    },
    async passwordReset(req, res) {

        const { token, senha } = req.body;

        let passwordRecovery = new Password()
        let empresaId = await passwordRecovery.decodedToken(token);

        if (!empresaId) {
            return res.status(400).json({ message: 'Token de validação é inválido.' });
        }

        const passwordReset = await UserPasswordReset.findOne({
            where: {
                token
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if (!passwordReset) {
            return res.status(400).json({ message: 'Pedido de redefinição de senha não foi encontrado.' });
        }

        const password_crypt = await bcrypt.hash(senha, 10);

        const empresaUpdate = await Empresa.update({
                "senha": password_crypt
            }, {
            where: {
                id: empresaId
            }
        }).catch(error => {
            return res.status(500).json({ message: 'Error inesperado, tente novamente mais tarde...' });
        });

        if (empresaUpdate == 1) {      
            let email = passwordReset.email;       
            
            await UserPasswordReset.destroy({
                where: {
                    email
                }
            });

            return res.status(200).json({ message: 'Pronto! Senha redefinida com sucesso!' });
        } 
        
        return res.status(400).json({ message: 'Não foi possível redefinir senha.' });
    }
}