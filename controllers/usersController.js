const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


const usersController = {
    login: function(req, res) {
        res.render('../views/loginForm.ejs')
    },
    processLogin: async function(req, res) {
        const validateLogin = validationResult(req);
        if(validateLogin.errors.length > 0) {
            return res.render('../views/loginForm.ejs', {
                errors: validateLogin.mapped()
            })
        }
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            let checkPass = bcryptjs.compareSync(req.body.password, user.password);
            if (checkPass) {
                delete user.password;
                req.session.loggedUser = user;
                return res.redirect('/users/profile/');
            } else {
                return res.render('../views/loginForm.ejs', {errors: {
                    password: {msg: 'Credenciales Inválidas'}
                }})
            }
        }        
        if (user == undefined) {
            return res.render('../views/loginForm.ejs', {errors: {
                email: {msg: 'El mail no se encuentra en la base de datos'}
            }})
        }
    },
    logout: function(req, res) {
        delete req.session.loggedUser;
        return res.redirect('/')
    },
    register: function(req, res) {
        res.render('../views/registerForm.ejs');
    },
    processRegister: async function(req, res) {        
        const validateRegister = validationResult(req);
        if(validateRegister.errors.length > 0) {
            return res.render('../views/registerForm.ejs', { 
                errors: validateRegister.mapped(),
                dataOnHold: req.body   
            })
        };
        let checkUser = await db.User.findOne( {where: {email: req.body.email}} );
        if (checkUser){
            return res.render('../views/registerForm.ejs', {errors: {
                email: {msg: 'Ya hay otro usuario registrado con dicho mail'}
            }});
        };
        await db.User.create({
            'first_name': req.body.firstName,
            'last_name': req.body.lastName,
            'email': req.body.email,
            'password': bcryptjs.hashSync(req.body.password, 10),
            'avatar': req.file.filename,
            'admin': 0
        })
        res.redirect('/users/login')
    },
    profile: function(req, res) {
        res.render('../views/userProfile.ejs', {user: req.session.loggedUser})
    }
}

module.exports = usersController
