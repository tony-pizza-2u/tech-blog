require('dotenv').config();
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);

db.Post.hasMany(db.Comment);

db.User.hasMany(db.Comment);
db.User.hasMany(db.Post);

module.exports = db;