module.exports = (sequelize,DataTypes)=> {
    const Customer_Book = sequelize.define("customer_book",{
        customerId: {
            type: DataTypes.INTEGER
        },
        bookId: {
            type: DataTypes.INTEGER
        }
    })

    return Customer_Book
}