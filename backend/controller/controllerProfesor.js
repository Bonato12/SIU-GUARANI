var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {

        // DEVUELVE TODOS LOS PROFESORES QUE EXISTEN LA BD
        getProfesor(req,res){
             var pool = new pg.Pool(config)
             pool.connect();
              pool.query("SELECT persona.identificador,persona.documento, persona.nombre, persona.apellido, profesor.identificador as idprofesor, profesor.matricula as matricula FROM persona, profesor WHERE profesor.idpersona = persona.identificador")
                .then(response => {
                  pool.end();
                  res.json(response.rows)
                })
                .catch(error => {
                  pool.end()
                  console.log(error.stack)
                })
              
        },

            // GUARDA UNA NUEVA PERSONA Y ALUMNO

    
        // PERMITE OBTENER UNA PERSONA ESPECIFICO
        getIdProfesor(req,res){
           console.log(req.body.params);
           var pool = new pg.Pool(config)
           const query = `

           SELECT P.identificador, P.documento, P.nombre, P.apellido, P.tipodoc, P.direccion,P.fechanac, profesor.identificador, profesor.matricula
           FROM persona P, profesor
           WHERE  P.identificador = profesor.idpersona AND P.identificador = $1`;  
           
           pool.connect();
           pool.query(query,[req.params.id])
            .then(response => {
              pool.end()
              res.json(response.rows)
            })
            .catch(error => {
              pool.end()
              console.log(error)
            })
           
        }


     

}
