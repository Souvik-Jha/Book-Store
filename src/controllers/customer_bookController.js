const { books } = require("../models")
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
        await checkBook.increment({"sold":quantity,"available":-quantity})
        
        await checkBook.addCustomer(checkCustomer,{through:{selfGranted:false}})
        const result = await db.customers.findOne({where:{id:customerId},include:books })
        return res.status(201).send({status:true,message:result})
        
} catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const bookListByCustomer = async function(req,res){
    try{
        let customerId = req.params.customerId
        let checkCustomer = await db.customers.findOne({ where: { id: customerId } })
        if (!checkCustomer) return res.status(400).send({ status: false, message: "customer dosenot exist" })
        if (checkCustomer.isDeleted == true) return res.status(400).send({ status: false, message: "customer info already deleted" })

        const result = await db.customers.findOne({where:{id:customerId},include:books })
        return res.status(201).send({status:true,message:result})
    }catch(err){
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = {purchaseBook,bookListByCustomer}