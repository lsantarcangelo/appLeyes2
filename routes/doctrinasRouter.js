const express = require('express');
const router = express.Router();
const doctrinasController = require('../controllers/doctrinasController');
const path = require('path');

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files/doctrinas'));
    },
    filename: (req, file, cb) => {
        const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = fileNameNoExtension + Date.now() + ' - ' + path.extname(file.originalname);
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

//Listar Normas //
router.get('/list', doctrinasController.list);

//Cargar una Norma //
router.get('/create', doctrinasController.create);
router.post('/create', upload.single('norm'), doctrinasController.store);

// Detalle de una Norma // 
router.get('/detail/:id/', doctrinasController.detail);

// Buscar Normas //
router.get('/search', doctrinasController.search);
router.get('/search/result', doctrinasController.searchResult);


module.exports = router