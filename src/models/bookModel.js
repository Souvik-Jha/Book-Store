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
        available: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return Book
}