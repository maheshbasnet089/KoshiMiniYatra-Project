const dbConfig = require("./../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Users Model
db.Users = require("./../model/auth/user")(sequelize, Sequelize);
db.Profile = require("./user/profile")(sequelize, Sequelize);
db.Logout = require("./auth/logout")(sequelize, Sequelize);
db.Job = require("./user/job")(sequelize, Sequelize);
db.Category = require("./user/category")(sequelize, Sequelize);
db.City = require("./user/city")(sequelize, Sequelize);
db.Blog = require("./user/blog")(sequelize, Sequelize);
db.AppliedJob = require("./user/appliedJob")(sequelize, Sequelize);
db.Salary = require("./user/salary")(sequelize, Sequelize);
db.Contact = require("./user/contact")(sequelize, Sequelize);

/* RDBMS Connection */
db.Users.hasOne(db.Profile);
db.Profile.belongsTo(db.Users);

db.Category.hasMany(db.Job);
db.Job.belongsTo(db.Category);
db.Job.belongsTo(db.City);

db.City.hasMany(db.Job);
db.Users.hasMany(db.Job);
db.Job.belongsTo(db.Users);

db.AppliedJob.belongsTo(db.Users);
db.Users.hasMany(db.AppliedJob);

db.AppliedJob.belongsTo(db.Job);

db.Salary.hasMany(db.Job);
db.Job.belongsTo(db.Salary);

// db.Blog.hasMany(db.Category);
// db.Category.belongsTo(db.Blog);

module.exports = db;
