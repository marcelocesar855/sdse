const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// models
const { Empresa } = require('../sequelize');

// Class
class Login {
    
    constructor(cnpj, senha) {
        this.cnpj = cnpj;
        this.senha = senha;
        this.empresa = [];
    }

    async checkEmpresa() {
        const empresa = await Empresa.findOne({
            where: {
                cnpj: this.cnpj
            }
        });

        if(!empresa) { // Verify e-mail
            return false;
        } 
        if(!await this.compareHash(empresa.senha)) { // Verify password
            return false;
        }

        this.empresa = empresa;

        return true;
    }

    async compareHash(hash) {
        return await bcrypt.compare(this.senha, hash);
    }

    generateToken() {
        return jwt.sign({ id: this.empresa.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 86400
        });
    }

    async generateData() {        
        const empresa = await Empresa.findOne({
            where: {
                id: this.empresa.id
            }
        });
        const data = {empresa, 
            access_token: this.generateToken(),
            expires_in: parseInt(process.env.JWT_EXPIRES_IN) || 86400,
            token_type: "bearer"    
        }
        return data;
    }
}

module.exports = {    

    async auth(req, res) {

        const { cnpj, senha } = req.body;

        const login = new Login(cnpj, senha); 
               
        if(!await login.checkEmpresa()) {
            return res.status(400).json({ message: "CNPJ ou Senha inválidos" });
        }

        const data = await login.generateData();

        return res.status(200).json(data);
    }

}