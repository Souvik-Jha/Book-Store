module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '9836@Jha',
    DB: 'book_store_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}