const express = require('express');
const router = express.Router();
const leyesController = require('../controllers/leyesController');
const path = require('path');

// Configuracion Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files/leyes'));
    },
    filename: (req, files, cb) => {
        //const fileNameNoExtension = path.basename(file.originalname, path.extname(file.originalname));
        const newFileName = files.originalname;
        cb(null, newFileName);
    }
});
const upload = multer({ storage });

//Listar Normas //
router.get('/list', leyesController.list);

//Cargar una Norma //
router.get('/create', leyesController.create);
router.post('/create', upload.single('file'), leyesController.store);

// Buscar Normas //
router.get('/search', leyesController.search);
router.get('/search/result', leyesController.searchResult);

// Detalle de una Norma //
router.get('/detail/:id/', leyesController.detail) 

// Editar una Norma //
router.get('/edit/:id/', leyesController.edit);
router.post('/edit/:id/', leyesController.update);


module.exports = router