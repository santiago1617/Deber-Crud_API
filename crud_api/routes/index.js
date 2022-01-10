var express = require('express');
var router = express.Router();

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize); 

/* GET clientes. */
router.get('/clientes', (req, res, next) => {
  models.clientes.findAll({ 
     attributes: { exclude: ["updatedAt"] }
   })
   .then(clientes => {
      res.send(clientes)
   })
   .catch(error => res.status(400).send(error))
});

/* GET clientes by ID. */
router.get('/clientes/:idCliente', (req, res, next) => {
   var idCliente=req.params.idCliente.replace(":","");
   models.clientes.findAll({ 
      attributes: { exclude: ["updatedAt"] }
    })
    .then(clientes => {
       for(let cliente of clientes){
         if(cliente.id==idCliente){
            console.log("YEAHHH");
            res.send(cliente);
          }
       }
       
    })
    .catch(error => res.status(400).send(error))
});

/* POST clientes */
router.post('/clientes', (req, res, next) => {
   let nombre = req.body.nombre;
   let apellido = req.body.apellido;
   let fechanacimiento = req.body.fechanacimiento;
   let estado=req.body.estado;

   console.log('HOLAAA POST');
   models.clientes.create({
     nombre: nombre,
     apellido: apellido,
     fechaNacimiento: fechanacimiento,
     estado:estado
   })
   .then(cliente => res.redirect('http://localhost:3003/api'))
   .catch(error => res.status(400).send(error));

});

/* PUT clientes */
router.put('/clientes', (req, res, next) => {

});

/* DELETE clientes */
router.delete('/clientes', (req, res, next) => {

});

module.exports = router;
