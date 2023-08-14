const fs = require('fs');
const path = require('path');
const escritosPath = path.join(__dirname, '../data/escritosData.json');
const escritos = JSON.parse(fs.readFileSync(escritosPath, 'utf-8'));

const escritosController = {
    create: function(req, res) {
        res.render('../views/escritos/createFormEscritos.ejs');
    },
    store: function(req, res) {
        let newEscrito = {
            "id": escritos == '' ? 1 : escritos[escritos.length - 1].id + 1,
            "subject": req.body.subject,
            "part": req.body.part,
            "instance": req.body.instance,
            "status": req.body.status,
            "norm": req.file.filename
        };
        escritos.push(newEscrito);
        fs.writeFileSync(escritosPath, JSON.stringify(escritos, null, ' '));
        res.redirect('/')
    },
    search: function(req, res) {
        res.render('../views/escritos/searchFormEscritos.ejs', { data: [] });
    },
    searchResult: function(req, res) {
        const { subject, part, instance, status, norm } = req.query;
        const filteredData = escritos.filter(element => {
            return (
                (!subject || element.subject.toLowerCase().includes(subject.toLowerCase())) &&
                (!part || element.part.toLowerCase().includes(part.toLowerCase())) &&
                (!instance || element.instance.toLowerCase().includes(instance.toLowerCase())) &&
                (!status || element.status.toLowerCase().includes(status.toLowerCase()))
            )
        });
        res.render('../views/escritos/searchFormEscritos.ejs', { data: filteredData })
    },
    detail: function(req, res) {
        const escrito = escritos.find(element => element.id == req.params.id);
        const file = path.join(__dirname, '../public/files/escritos/'+`${escrito.norm}`);
        res.sendFile(file)
    }
}

module.exports = escritosController;