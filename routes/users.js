var express = require('express');
var router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const { check } = require('express-validator');

const validations = [
    check('firstName').notEmpty().withMessage('Debe ingresar su nombre'),
    check('lastName').notEmpty().withMessage('Debe ingresar su apellido'),
    check('email')
        .notEmpty().withMessage('Debe ingresar su correo electrónico').bail()
        .isEmail().withMessage('Debe ingresar un formato válido de correo'),
    check('password').notEmpty().withMessage('Debe ingresar una contraseña'),
    check('avatar').custom( (value, {req}) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debe subir una imagen');
        }
        return true;
    })
];

const validateLogin = [
    check('email')
        .notEmpty().withMessage('Debe ingresar su correo electrónico').bail()
        .isEmail().withMessage('Debe ingresar un formato válido de correo'),
        check('password').notEmpty().withMessage('Debe ingresar una contraseña')
];

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage });


/* Users Routes */

//Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validateLogin, usersController.processLogin);

//Register
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), validations, usersController.processRegister);

//Profile
router.get('/profile/', authMiddleware, usersController.profile);

//Logout
router.get('/logout', usersController.logout);

// Ruta para iniciar el proceso de suscripción
/* router.get('/suscripcion', (req, res) => {
    const preference = {
      items: [
        {
          title: 'Suscripción mensual',
          unit_price: 100, // Precio de la suscripción en centavos
          quantity: 1,
        },
      ],
    };
    mercadopago.preferences.create(preference)
      .then(response => {
        const init_point = response.body.init_point;
        // Redirigir al usuario a la página de pago de Mercado Pago
        res.redirect(init_point);
      })
      .catch(error => {
        console.error('Error al crear preferencia:', error);
        res.send('Error al procesar la suscripción.');
      });
});

// Ruta para recibir notificaciones de pago
router.post('/notificaciones', (req, res) => {
    // Procesar la notificación y confirmar el estado del pago
    // Aquí puedes actualizar la suscripción en tu base de datos, enviar confirmaciones por correo, etc.
    // Enviar una respuesta exitosa a Mercado Pago
    res.status(200).send('Notificación recibida');
}); */
  


module.exports = router;
