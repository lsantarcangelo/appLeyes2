const fetch = require('node-fetch');

const mpApiController = {
    paymentMethods: async (req, res) => {
        const url = "https://api.mercadopago.com/v1/payment_methods";
        let suscription = {};
        let payMethods = await fetch(url, {
            headers: {
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json());
        res.render('../views/apiResults.ejs', {payMethods, suscription});
    },
    suscription: (req, res) => {
        res.render('../views/suscriptionForm.ejs')
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
        const payMethods = [];
        const suscription = await fetch( url, body, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json());
        setTimeout( 
            function() {console.log(suscription.init_point)}, 5000
        ); 
        res.render('../views/apiResults.ejs', {suscription, payMethods});
    },
    suscriptionStatus: async (req, res) => {
        const url = "https://api.mercadopago.com/preapproval/2c9380848ab07174018ab81f9d2a0499";
        let payMethods = [];
        let suscription = await fetch(url, {
            headers: {
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json());
        res.render('../views/apiResults.ejs', {payMethods, suscription});
    }  
}

module.exports = mpApiController;