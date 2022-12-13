module.exports = (sequelize,DataTypes)=> {
    const Customer = sequelize.define("customer",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false            
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return Customer
}