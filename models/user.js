const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequalize, Sequalize) => {

    const User = sequalize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passhash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;

};