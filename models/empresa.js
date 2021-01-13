module.exports = (sequelize, type) => {
    return sequelize.define('empresa_user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: type.STRING(100),
      cnpj: type.STRING(18),
      email: type.STRING(40),
      senha: type.STRING(100),
      representante: type.STRING(100),
      cargo_representante: type.STRING(40),
      registro_representante: type.STRING(40),
      cpf_representante: type.STRING(14),
      telefone: type.STRING(20),
      cfdf: type.STRING(9),
    })
} 