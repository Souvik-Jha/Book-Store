const db = require("../models")
const validator = require("../validators/validate")
const nameRegex = /^[a-zA-Z ]{2,45}$/;


const addSeller = async function (req, res) {
    try {
        let data = req.body
        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to create seller" })
        let { name, address, phone } = data

        if (!name) return res.status(400).send({ status: false, message: "name is required" })
        if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })

        if (!address) return res.status(400).send({ status: false, message: "address is required" })
        if (!(validator.isValid(address))) return res.status(400).send({ status: false, message: "address must be in string & not empty" })

        if (!phone) return res.status(400).send({ status: false, message: "phone number must be present" })
        if (!(/^[6-9]{1}[0-9]{9}$/im.test(phone))) return res.status(400).send({ status: false, message: "Phone number is invalid." })
        if (!validator.isValid(phone)) { return res.status(400).send({ status: false, message: "provide phone no. in string." }); }
        const uniqueMobile = await db.sellers.findOne({ where: { phone: phone } })
        if (uniqueMobile) return res.status(400).send({ status: false, message: "Phone number already exists." })

        let createData = await db.sellers.create(data)
        return res.status(201).send({ status: true, message: createData })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message)
    }
}


const getSeller = async function (req, res) {
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
            let checkBook = await db.sellers.findOne({ where: { id: id } })
            console.log(checkBook)
            if (!checkBook) return res.status(400).send({ status: false, message: "id dosenot exist" })
        }

        let getSeller = await db.sellers.findAll({ where: query })
        if (!getSeller.length) return res.status(400).send({ status: false, message: "no such seller" })
        return res.status(200).send({ status: true, message: getSeller })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const updateSeller = async function (req, res) {
    try {
        let data = req.body
        let sellerId = req.params.sellerId

        let checkSeller = await db.sellers.findOne({ where: { id: sellerId } })
        if (!checkSeller) return res.status(400).send({ status: false, message: "seller dosenot exist" })


        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to update seller" })
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
            const uniqueMobile = await db.sellers.findOne({ where: { phone: phone } })
            if (uniqueMobile) return res.status(400).send({ status: false, message: "Phone number already exists." })
        }

        let updatedSeller = await db.sellers.update(data, { where: { id: sellerId } })
        return res.status(200).send({ status: true, updateCount: updatedSeller })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deleteSeller = async function (req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { addSeller, getSeller, updateSeller, deleteSeller }