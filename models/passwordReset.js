module.exports = (sequelize, type) => {
    const PasswordReset = sequelize.define('password_reset', {
        email: DataTypes.STRING(65),
        token: DataTypes.STRING(191),
    });
    
    PasswordReset.removeAttribute('id');

    return PasswordReset;
} 