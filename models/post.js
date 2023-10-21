const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequalize, Sequalize) => {

    const Post = sequalize.define("Post", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Post;

};