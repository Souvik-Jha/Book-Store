module.exports = (sequelize,DataTypes)=> {
    const Book = sequelize.define("book",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Available: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    return Book
}