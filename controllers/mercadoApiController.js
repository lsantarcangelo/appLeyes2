const fetch = require('node-fetch');

const mercadoApiController = {
    suscription: (req, res) => {
        res.render('../views/suscriptionForm.ejs')
    },
    createSuscriptionLink: async (req, res) => {
        const url = "https://api.mercadopago.com/preapproval";
        console.log(req.body); 
        const body = {
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
        const suscription = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
        console.log(suscription);
        res.redirect(suscription.init_point);                
    },
    suscriptionStatus: async (req, res) => {
        const url = "https://api.mercadopago.com/preapproval/2c9380848acb749a018ad73607c207dd";
        let suscription = await fetch(url, {
            headers: {
                Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
            }
        }).then(response => response.json());
        console.log(suscription);
        res.render('../views/apiResults.ejs', {suscription});
    }  
}

module.exports = mercadoApiController;