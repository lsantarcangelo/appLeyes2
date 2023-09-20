const fetch = require('node-fetch');

const mpApiController = {
    paymentMethods: async (req, res) => {
        const url = "https://api.mercadopago.com/v1/payment_methods";
        let payMethods = await fetch(url, {
            headers: {
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json());
        res.render('../views/apiResults.ejs', {payMethods});
    },
    createSuscriptionLink: async (req, res) => {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason: "Suscripcion a LeyesApp",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS"
            },
            back_url: "https://wwww.google.com",
            payer_email: "test_user_38317041@testuser.com"
        };
        const suscription = await fetch( url, body, {
            headers: {
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json())
        res.render('../views/apiResults.ejs', {suscription});
    },     
}

module.exports = mpApiController;