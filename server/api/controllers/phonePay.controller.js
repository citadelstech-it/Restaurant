const crypto = require("crypto");
const axios = require("axios");
require("dotenv").config();

const salt_key = process.env.SALT_KEY || "96434309-7796-489d-8924-ab56988a6076";
const merchant_id = process.env.MERCHANT_ID || "PGTESTPAYUAT86";


const newPayment = async (req, res) => {
    try {
        const { transactionId, MUID, name, amount, number, user_id, customer_email, paymentMethod } = req.body;

        if (!transactionId || !MUID || !name || !amount || !number || !user_id || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Save these details in memory or database temporarily if required for later use
        req.app.locals[transactionId] = { user_id, customer_email, paymentMethod, number, name };

        const data = {
            merchantId: merchant_id,
            merchantTransactionId: transactionId,
            merchantUserId: MUID,
            name,
            amount: amount * 100, // in paisa
            redirectUrl: `http://localhost:5000/api/phonepe/status/${transactionId}`,
            redirectMode: "POST",
            mobileNumber: number,
            paymentInstrument: { type: "PAY_PAGE" },
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString("base64");

        const keyIndex = 1;
        const stringToSign = payloadMain + "/pg/v1/pay" + salt_key;
        const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
        const checksum = `${sha256}###${keyIndex}`;

        const options = {
            method: "POST",
            url: "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
            },
            data: { request: payloadMain },
        };

        const response = await axios.request(options);
        return res.status(200).json({
            redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
        });
    } catch (error) {
        console.error("Payment initiation failed:", error.response?.data || error.message);
        res.status(500).send({ message: "Payment initiation failed", success: false });
    }
};


const checkStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const keyIndex = 1;
        const stringToSign = `/pg/v1/status/${merchant_id}/${transactionId}` + salt_key;
        const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
        const checksum = `${sha256}###${keyIndex}`;

        const options = {
            method: "GET",
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${transactionId}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": checksum,
                "X-MERCHANT-ID": merchant_id,
            },
        };

        const response = await axios.request(options);

        if (response.data.success) {
            console.log("Payment successful:", response.data);
            const paymentInfo = req.app.locals[transactionId];

            if (paymentInfo) {
                // Create order after successful payment
                const orderResponse = await axios.post("http://localhost:5000/api/orders/checkout", {
                    user_id: paymentInfo.user_id,
                    customer_email: paymentInfo.customer_email,
                    paymentMethod: paymentInfo.paymentMethod,
                    customer_phone: paymentInfo.number,
                    customer_name: paymentInfo.name,
                    transactionId,
                    paymentStatus: "SUCCESS",
                });

                const orderId = orderResponse.data.order.id; // Ensure your order API returns this
                delete req.app.locals[transactionId];

                // Redirect to frontend success page with orderId
                return res.redirect(`http://localhost:5173/receipt/${orderId}`);
            }
        }

        // If payment fails
        return res.redirect("http://localhost:5173/payment-failed");

    } catch (error) {
        console.error("Payment status check failed:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: "Error checking payment status" });
    }
};


module.exports = { newPayment, checkStatus };
