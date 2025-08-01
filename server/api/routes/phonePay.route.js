const express = require("express");
const { newPayment, checkStatus } = require("../controllers/phonePay.controller");

const router = express.Router();

router.post("/phonepe/pay", newPayment);
router.post("/phonepe/status/:transactionId", checkStatus);

module.exports = router;
