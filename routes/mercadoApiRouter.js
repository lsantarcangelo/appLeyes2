const express = require('express');
const router = express.Router();
const mercadoApiController = require('../controllers/mercadoApiController');


router.get("/suscription", mercadoApiController.suscription);
router.post("/suscription", mercadoApiController.createSuscriptionLink);
router.get("/status", mercadoApiController.suscriptionStatus);

module.exports = router;