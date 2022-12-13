const express = require("express");  
const router = express.Router();
const bookController = require("../controllers/bookController")
const customerController = require("../controllers/customerController")
const sellerController = require("../controllers/sellerController")


router.post("/book/:sellerId",bookController.addBook)
router.put("/book/:bookId",bookController.updateBook)
router.get("/book",bookController.getBook)
router.delete("/book/:bookId",bookController.deleteBook)




router.post("/customer",customerController.addCustomer)
router.get("/customer",customerController.getCustomer)
router.put("/customer/:customerId",customerController.updateCustomer)
router.delete("/customer",customerController.deleteCoustomer)



router.post("/seller",sellerController.addSeller)


module.exports = router