const express = require('express');
const router = express.Router();
const mpApiController = require('../controllers/mpApiController');


router.get("/payment_methods", mpApiController.paymentMethods);
router.post("/suscription", mpApiController.createSuscriptionLink);

module.exports = router;