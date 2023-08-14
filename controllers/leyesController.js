const path = require('path');
const db = require('../database/models');


const leyesController = {
    create: function(req, res) {
        let selectType = db.EntityType.findAll();
        Promise.all([selectType])
        .then(function([selectType]) {
            return res.render('../views/leyes/createForm.ejs', {
                selectType: selectType,
            });
        })
    },
    store: async function(req, res) {
        console.log(req.body.number);
        await db.Ley.create({
                'type_id': req.body.type,
                'number': req.body.number,
                'year': req.body.year,
                'status': req.body.status,
                'file': req.file.filename
            }) 
        res.redirect('/')
    },
    edit: async function(req, res) {
        const editingLey = await db.Ley.findByPk(req.params.id, { include: [ { association: 'entityTypes'} ]});
        res.render('../views/leyes/leyesEditForm.ejs', {editingLey});
    },
    update: async function(req, res) {
        const leyToUpdate = await db.Ley.findByPk(req.params.id, { include: [ { association: 'entityTypes'} ]});        
        let leyMod = {
            'id': req.params.id,
            'type_id': req.body.type,
            'number': req.body.number,
            'year': req.body.year,
            'status': req.body.status,
            'file': req.file == undefined ? leyToUpdate.file : req.file.filename
        };
        let leyUpdated = leyes.map( element => {
            if (element.id == leyMod.id) {
                return element = leyMod
            } else {
                return element
            }           
        });
        console.log(leyUpdated);
        
		res.redirect(`/leyes/detail/${req.params.id}/`);
    },
    list: function(req, res) {
        db.Ley.findAll({
            include: [{ association: 'entityTypes' }]
        })
            .then(function(leyes) {
                res.render('../views/leyes/leyesList.ejs', {leyes})
                console.log(leyes)
            })
    },
    search: function(req, res) {
        res.render('../views/leyes/searchForm2.ejs', { data: [] });
    },
    searchResult: async function(req, res) {
        const { type, number, year, status } = req.query;
        try {
            const queryOptions = {
              where: {},
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
            const filteredData = await db.Ley.findAll({
                include: [{ association: 'entityTypes' }]
            }, queryOptions);
            res.render('../views/leyes/searchForm2.ejs', { data: filteredData });
        } catch (err) {
                console.error('Error during search:', err);
                res.status(500).send('Internal Server Error');
            }
    },
    detail: function(req, res) {
        db.Ley.findByPk(req.params.id, {include: [{ association: 'entityTypes' }]})
            .then((leyDetail)=> {
                res.render('../views/leyes/leyesDetail.ejs', { leyDetail })
            });
    }
}


module.exports = leyesController;