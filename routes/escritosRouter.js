const express = require('express');
const router = express.Router();
const path = require('path');
const escritosController = require('../controllers/escritosController');


// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files/escritos'));
    },
    filename: (req, file, cb) => {
        const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

//Cargar un Escrito //
router.get('/create', escritosController.create);
router.post('/create', upload.single('norm'), escritosController.store);

// Detalle de un Escrito // 
router.get('/detail/:id/', escritosController.detail);

// Buscar Escritos //
router.get('/search', escritosController.search);
router.get('/search/result', escritosController.searchResult);


module.exports = router