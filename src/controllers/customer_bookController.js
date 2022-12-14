const db = require("../models")

const purchaseBook = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let customerId = req.params.customerId

        let quantity = req.body.quantity

        let checkBook = await db.books.findOne({ where: { id: bookId } })
        if (!checkBook) return res.status(400).send({ status: false, message: "sbook dosenot exist" })
        if (checkBook.isDeleted == true) return res.status(400).send({ status: false, message: "book already deleted" })

        let checkCustomer = await db.customers.findOne({ where: { id: customerId } })
        if (!checkCustomer) return res.status(400).send({ status: false, message: "customer dosenot exist" })
        if (checkCustomer.isDeleted == true) return res.status(400).send({ status: false, message: "customer info already deleted" })

        let purchaseBook = await db.customer_books.create({ bookId: bookId, customerId: customerId })
        //let doc= await db.customer_books.findAll({include:[{model:Books,where:{bookId: bookId, customerId: customerId }}]})
        let updateBook = await db.books.findOne({where:{id:bookId}})
        await updateBook.increment({ "sold": quantity})

        return res.status(201).send({status:true,message:purchaseBook})
        
} catch (err) {
        console.log(err)
        return res.status(400).send({ status: false, message: err.message })
    }
}

module.exports = {purchaseBook}