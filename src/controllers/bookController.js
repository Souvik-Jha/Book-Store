const db = require("../models")
const validator = require("../validators/validate")
const nameRegex = /^[a-zA-Z ]{2,45}$/;



const addBook = async function (req, res) {
    try {
        let data = req.body
        let sellerId = req.params.sellerId

        //validations

        let checkSeller = await db.sellers.findOne({ where: { id: sellerId } })
        if (!checkSeller) return res.status(400).send({ status: false, message: "sellerId is not valid" })


        const { name, authorName, price, Available, Sold } = data

        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to create book" })

        if (!name) return res.status(400).send({ status: false, message: "name is required" })
        if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })

        if (!authorName) return res.status(400).send({ status: false, message: "authorName is required" })
        if (!validator.isValid(authorName) || !(nameRegex.test(authorName))) return res.status(400).send({ status: false, message: "authorNname must be in string & not empty" })

        if (!price) return res.status(400).send({ status: false, message: "price is required" })
        if (typeof price === "undefined" || typeof price !== "number") return res.status(400).send({ status: false, message: "price should be a number" })

        if (!Available) return res.status(400).send({ status: false, message: "Available is required" })
        if (typeof Available === "undefined" || typeof Available !== "number") return res.status(400).send({ status: false, message: "Available should be a number" })

        if (Sold) {
            if (typeof Sold === "undefined" || typeof Sold !== "number") return res.status(400).send({ status: false, message: "Sold should be a number" })
        }

        data.sellerId = sellerId

        //create Book

        let createData = await db.books.create(data)
        return res.status(201).send({ status: true, message: createData })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message)
    }
}



const updateBook = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId

        //validations

        let checkBook = await db.books.findOne({ where: { id: bookId } })
        if (!checkBook) return res.status(400).send({ status: false, message: "sbook dosenot exist" })


        const { name, authorName, price, Available, Sold } = data

        if (!validator.isValidRequestBody(data)) return res.status(400).send({ status: false, message: "provide data to update book" })

        if (name) {
            if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })
        }

        if (authorName) {
            if (!validator.isValid(authorName) || !(nameRegex.test(authorName))) return res.status(400).send({ status: false, message: "authorNname must be in string & not empty" })
        }

        if (price) {
            if (typeof price === "undefined" || typeof price !== "number") return res.status(400).send({ status: false, message: "price should be a number" })
        }

        if (Available) {
            if (typeof Available === "undefined" || typeof Available !== "number") return res.status(400).send({ status: false, message: "Available should be a number" })
        }

        if (Sold) {
            if (typeof Sold === "undefined" || typeof Sold !== "number") return res.status(400).send({ status: false, message: "Sold should be a number" })
        }

        //update book

        let updatedBook = await db.books.update(data, { where: { id: bookId } })
        return res.status(200).send({ status: true, updateCount: updatedBook })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}



const getBook = async function (req, res) {
    try {
        let query = req.query
        let { name, authorName, price, id } = query

        if (name) {
            if (!(validator.isValid(name)) || !(nameRegex.test(name))) return res.status(400).send({ status: false, message: "name must be in string & not empty" })
        }

        if (authorName) {
            if (!validator.isValid(authorName) || !(nameRegex.test(authorName))) return res.status(400).send({ status: false, message: "authorNname must be in string & not empty" })
        }

        // if (price) {
        //     if (typeof price != "number") return res.status(400).send({ status: false, message: "price should be a number" })
        // }

        if (id) {
            let checkBook = await db.books.findOne({ where: { id: id } })
            if (!checkBook) return res.status(400).send({ status: false, message: "id dosenot exist" })
        }


        let getBook = await db.books.findAll({ where: query })
        if (!getBook.length) return res.status(400).send({ status: false, message: "no such book" })
        return res.status(200).send({ status: true, message: getBook })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


const deleteBook = async function (req, res) {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { addBook, getBook, updateBook, deleteBook }