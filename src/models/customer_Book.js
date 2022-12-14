module.exports = (sequelize,DataTypes)=> {
    const Customer_Book = sequelize.define("customer_book",{
        selfGranted: DataTypes.BOOLEAN,
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Customer_Book
}