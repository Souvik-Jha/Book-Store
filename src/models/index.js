const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.books = require("./bookModel")(sequelize,DataTypes)
db.customers = require("./customerModel")(sequelize,DataTypes)
db.sellers = require("./sellerModel")(sequelize,DataTypes)
db.customer_books = require("./customer_Book")(sequelize,DataTypes)
 
db.sequelize.sync({force: false})
.then (()=>{
    console.log("sync is done")
})


db.sellers.hasMany(db.books,{foreignKey:"sellerId",as: "book"})

db.books.belongsTo(db.sellers,{foreignKey:"sellerId",as: "seller"})


db.customers.belongsToMany(db.books,{through:"customer_book"})
db.books.belongsToMany(db.customers,{through:"customer_book"})

module.exports = db