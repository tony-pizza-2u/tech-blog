const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequalize, Sequalize) => {

    const Comment = sequalize.define("Comment", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Comment;

};