const path = require('path');
const db = require('../database/models');


const leyesController = {
    //Creación de registro
    create: function(req, res) {
        let selectType = db.EntityType.findAll();
        Promise.all([selectType])
        .then(function([selectType]) {
            return res.render('../views/leyes/createForm.ejs', {
                selectType: selectType,
            });
        })
    },

    //Almacenado de registro
    store: async function(req, res) {
        console.log(req.body.number);
        await db.Ley.create({
                'type_id': req.body.type,
                'number': req.body.number,
                'year': req.body.year,
                'status': req.body.status,
                'file': req.file.filename
            }) 
        res.redirect('/leyes/search');
    },

    //Edición de registro
    edit: async function(req, res) {
        const editingLey = await db.Ley.findByPk(req.params.id, { include: [ { association: 'entityTypes'} ]});
        const types = await db.EntityType.findAll();
        res.render('../views/leyes/leyesEditForm.ejs', {editingLey, types});
    },

    //Actualización de registro
    update: async function(req, res) {
        let retrieveLey = db.Ley.findByPk(req.params.id); 
        await db.Ley.update({
            'type_id': req.body.type,
            'number': req.body.number,
            'year': req.body.year,
            'status': req.body.status,
            'file': req.file == undefined ? retrieveLey.file : req.file.filename
        }, {
            where: {
                'id': req.params.id
            }
        })
		res.redirect(`/leyes/detail/${req.params.id}/`);
    },

    //Listado de registros
    list: function(req, res) {
        db.Ley.findAll({
            include: [{ association: 'entityTypes' }]
        })
            .then(function(leyes) {
                res.render('../views/leyes/leyesList.ejs', {leyes})
                console.log(leyes)
            })
    },

    //Búsqueda de registros
    search: async function(req, res) {
        const types = await db.EntityType.findAll();
        res.render('../views/leyes/searchForm.ejs', { types: types });
    },

    //Resultado de la búsqueda
    searchResult: async function(req, res) {
        const { type, number, year, status } = req.query;
        try {
            let queryOptions = {
              where: {},
              include: [{ association: 'entityTypes' }]
            };        
            // Add conditions based on the form input
            if (type) {
              queryOptions.where.type_id = type;
            }
            if (number) {
              queryOptions.where.number = number;
            }
            if (year) {
              queryOptions.where.year = year;
            }
            if (status) {
              queryOptions.where.status = status;
            }
            // Find the Leyes that match the filter criteria
            console.log(queryOptions);
            const filteredData = await db.Ley.findAll(queryOptions)

            res.render('../views/leyes/searchResult.ejs', { data: filteredData });
        } catch (err) {
                console.error('Error during search:', err);
                res.status(500).send('Internal Server Error');
            }
    },

    //Detalle del registro
    detail: function(req, res) {
        db.Ley.findByPk(req.params.id, {include: [{ association: 'entityTypes' }]})
            .then((leyDetail)=> {
                res.render('../views/leyes/leyesDetail.ejs', { leyDetail })
            });
    },

    //Eliminar registro
    delete : (req, res) => {
        db.Ley.destroy({
            where: {
                id: req.params.id
            }
        })
    res.redirect('/leyes/search');
    }
}


module.exports = leyesController;