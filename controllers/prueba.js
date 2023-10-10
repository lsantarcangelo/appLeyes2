const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

// Ruta para iniciar el proceso de suscripción
router.get('/suscripcion', async (req, res) => {
  try {
    const access_token = 'TU_ACCESS_TOKEN'; // Reemplaza con tu access_token
    const url = 'https://api.mercadopago.com/preapproval';

    const requestBody = {
        reason: "Suscripcion a LeyesApp",
        auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            transaction_amount: 10,
            currency_id: "ARS"
        },
        back_url: "https://wwww.google.com",
        payer_email: 'test_user_1841764809@testuser.com'
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    const init_point = responseData.init_point;

    // Redirigir al usuario a la página de pago de Mercado Pago
    res.redirect(init_point);
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.send('Error al procesar la suscripción.');
  }
});

module.exports = router;
