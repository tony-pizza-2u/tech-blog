require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.js")(sequelize, Sequelize);
db.Post = require("./post.js")(sequelize, Sequelize);
db.Comment = require("./comment.js")(sequelize, Sequelize);

db.Post.hasMany(db.Comment);
db.Post.belongsTo(db.User);

db.User.hasMany(db.Comment);
db.User.hasMany(db.Post);

db.Comment.belongsTo(db.User);

if (process.env.SYNC_DB == 'true') {

    syncConfig = {};

    switch (process.env.SYNC_TYPE) {
        case 'force':
            syncConfig = {force: true};
            break;
        case 'alter':
            syncConfig = {alter: true}
            break;
        default:
            syncConfig = null;
    }

    db.sequelize.sync(syncConfig).then(() => {
        console.log("Database synced successfully!");
    }).catch((error) => {
        console.log("Failed to sync database: " + error.message);
    });

}


module.exports = db;