module.exports = (sequelize,DataTypes)=> {
    const Seller = sequelize.define("seller",{
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

    return Seller
}