const express = require('express');
const router = express.Router();
const mercadoApiController = require('../controllers/mercadoApiController');


router.get('/suscription', mercadoApiController.suscription);
router.post('/suscription', mercadoApiController.createSuscription);
router.get('/status', mercadoApiController.suscriptionStatus);
router.get('/pauseSuscription', mercadoApiController.pauseSuscription)
router.post('/pauseSuscription', mercadoApiController.pauseSuscription);
router.get('/reactSuscription', mercadoApiController.reactivateSuscription)
router.post('/reactSuscription', mercadoApiController.reactivateSuscription);

module.exports = router;