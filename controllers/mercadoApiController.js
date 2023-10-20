const db = require('../database/models');
const fetch = require('node-fetch');

const mercadoApiController = {
    suscription: (req, res) => {
        res.render('../views/suscriptionForm.ejs')
    },
    createSuscription: async function (req, res) {
        const url = "https://api.mercadopago.com/preapproval";
        const body = {
            reason: "LeyesApp",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS"
            },
            back_url: "https://www.mercadopago.com.ar/",
            payer_email: req.body.mercadoEmail
        };  
        const loggedUser = req.session.loggedUser;
        console.log(body.payer_email);
        const localSuscription = await db.Suscription.findOne({where: {user_id: loggedUser.id}});
        if (!localSuscription) {    
            const suscription = await fetch( url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
                },
                body: JSON.stringify(body)
            }).then(response => response.json());
            console.log(suscription);
            await db.Suscription.create({
                'suscription_id': suscription.id,
                'user_id': req.session.loggedUser.id,
                'payer_id': suscription.payer_id,
                'payer_email': suscription.payer_email,
                'application_id': suscription.application_id,
                'status': suscription.status,
                'reason': suscription.reason,
                'date_created': suscription.date_created,
                'currency_id': suscription.auto_recurring.currency_id,
                'frequency_type': suscription.auto_recurring.frequency_type,
                'transaction_amount': suscription.auto_recurring.transaction_amount 
            })
            res.redirect(suscription.init_point);
        } else {
            res.send('Ya posee una suscripcion activa')
        }                
    },
    suscriptionStatus: async (req, res) => {
        console.log(req.session.loggedUser);
        const loggedUser = req.session.loggedUser;
        const localSuscription = await db.Suscription.findOne({where: {user_id: loggedUser.id}});
        if (localSuscription) {
            const preId = localSuscription.dataValues.suscription_id; 
            console.log(preId);
            const url = `https://api.mercadopago.com/preapproval/${preId}`;
            console.log(url);
            let suscription = await fetch(url, {
                headers: {
                    Authorization: 'Bearer TEST-20262500384708-092009-017cc708f56800470a7b9c16685c9b86-1479499574'
                }
            }).then(response => response.json());
            console.log(suscription);
            res.render('../views/apiResults.ejs', {suscription});
        } else {
            res.send('No posee ninguna suscripcion')
        }
    }  
}

module.exports = mercadoApiController;