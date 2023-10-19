const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequalize, Sequalize) => {

    const Post = sequalize.define("Post", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    return Post;

};