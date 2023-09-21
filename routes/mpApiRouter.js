const express = require('express');
const router = express.Router();
const mpApiController = require('../controllers/mpApiController');


router.get("/payment_methods", mpApiController.paymentMethods);
router.get("/suscription", mpApiController.suscription)
router.post("/suscription", mpApiController.createSuscriptionLink);
router.get("/status", mpApiController.suscriptionStatus);

module.exports = router;