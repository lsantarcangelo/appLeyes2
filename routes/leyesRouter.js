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
        const newFileName = files.originalname;
        cb(null, newFileName);
    }
});
const upload = multer({ storage });


//Cargar una Ley //
router.get('/create', leyesController.create);
router.post('/create', upload.single('file'), leyesController.store);

// Buscar Ley //
router.get('/search', leyesController.search);
router.get('/search/result', leyesController.searchResult);

// Detalle de Ley //
router.get('/detail/:id/', leyesController.detail) 

// Editar una Ley //
router.get('/edit/:id/', leyesController.edit);
router.post('/edit/:id/', upload.single('mainFile'), leyesController.update);

// Cargar Adjuntos //
router.get('/attachments/:id', leyesController.attachments);
router.post('/attachments/:id', upload.single('attachment'), leyesController.saveAttachments);

// Eliminar una Ley // 
router.post('/delete/:id', leyesController.delete);

module.exports = router