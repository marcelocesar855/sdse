module.exports = (sequelize, type) => {
    const UserPasswordReset = sequelize.define('password_reset', {
        email: type.STRING(65),
        token: type.STRING(191),
    });
    
    UserPasswordReset.removeAttribute('id');

    return UserPasswordReset;
} 