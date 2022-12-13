const db = require("../models")
const validator = require("../validators/validate")
const nameRegex = /^[a-zA-Z ]{2,45}$/;


const addCustomer = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to create customer" })
        let { name, address, phone } = data

        if (!name) return res.status(400).send({ status: false, message: "name is required" })
        if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })

        if (!address) return res.status(400).send({ status: false, message: "address is required" })
        if (!(validator.isValid(address))) return res.status(400).send({ status: false, message: "address must be in string & not empty" })

        if (!phone) return res.status(400).send({ status: false, message: "phone number must be present" })
        if (!(/^[6-9]{1}[0-9]{9}$/im.test(phone))) return res.status(400).send({ status: false, message: "Phone number is invalid." })
        if (!validator.isValid(phone)) { return res.status(400).send({ status: false, message: "provide phone no. in string." }); }
        const uniqueMobile = await db.customers.findOne({ where: { phone: phone } })
        if (uniqueMobile) return res.status(400).send({ status: false, message: "Phone number already exists." })

        let createData = await db.customers.create(data)
        return res.status(201).send({ status: true, message: createData })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message)
    }
}



const getCustomer = async function (req, res) {
    try {
        let query = req.query
        let { name, phone, id } = query

        if (name) {
            if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })
        }

        if (phone) {
            if (!(/^[6-9]{1}[0-9]{9}$/im.test(phone))) return res.status(400).send({ status: false, message: "Phone number is invalid." })
            if (!validator.isValid(phone)) { return res.status(400).send({ status: false, message: "provide phone no. in string." }); }
        }

        if (id) {
            let checkBook = await db.customers.findOne({ where: { id: id } })
            console.log(checkBook)
            if (!checkBook) return res.status(400).send({ status: false, message: "id dosenot exist" })
        }

        let getCustomer = await db.customers.findAll({ where: query })
        if (!getCustomer.length) return res.status(400).send({ status: false, message: "no such customer" })
        return res.status(200).send({ status: true, message: getCustomer })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const updateCustomer = async function (req, res) {
    try {
        let data = req.body
        let customerId = req.params.customerId

        let checkCustomer = await db.customers.findOne({ where: { id: customerId } })
        if (!checkCustomer) return res.status(400).send({ status: false, message: "customer dosenot exist" })


        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to update customer" })
        let { name, address, phone } = data

        if (name) {
            if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })
        }

        if (address) {
            if (!(validator.isValid(address))) return res.status(400).send({ status: false, message: "address must be in string & not empty" })
        }

        if (phone) {
            if (!(/^[6-9]{1}[0-9]{9}$/im.test(phone))) return res.status(400).send({ status: false, message: "Phone number is invalid." })
            if (!validator.isValid(phone)) { return res.status(400).send({ status: false, message: "provide phone no. in string." }); }
            const uniqueMobile = await db.customers.findOne({ where: { phone: phone } })
            if (uniqueMobile) return res.status(400).send({ status: false, message: "Phone number already exists." })
        }

        let updatedCustomer = await db.customers.update(data, { where: { id: customerId } })
        return res.status(200).send({ status: true, updateCount: updatedCustomer })


    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deleteCoustomer = async function (req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { addCustomer, getCustomer, updateCustomer, deleteCoustomer }