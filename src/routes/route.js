const express = require("express");  
const router = express.Router();
const bookController = require("../controllers/bookController")
const customerController = require("../controllers/customerController")
const sellerController = require("../controllers/sellerController")
const customerBookController = require("../controllers/customer_bookController")


router.post("/book/:sellerId",bookController.addBook)
router.put("/book/:bookId",bookController.updateBook)
router.get("/book",bookController.getBook)
router.delete("/book/:bookId",bookController.deleteBook)


router.post("/customer",customerController.addCustomer)
router.get("/customer",customerController.getCustomer)
router.put("/customer/:customerId",customerController.updateCustomer)
router.delete("/customer/:customerId",customerController.deleteCoustomer)


router.post("/seller",sellerController.addSeller)
router.get("/seller",sellerController.getSeller)
router.put("/seller",sellerController.updateSeller)
router.delete("/seller",sellerController.deleteSeller)

router.post("/customer/:customerId/book/:bookId",customerBookController.purchaseBook)
router.get("/customer/:customerId/book",customerBookController.bookListByCustomer)
router.get("/seller/:sellerId/book",bookController.bookListBySeller)


module.exports = router