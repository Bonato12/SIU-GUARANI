var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {

        // DEVUELVE TODOS LAS CARRERA QUE EXISTEN LA BD
        getCarrera(req,res){
             var pool = new pg.Pool(config)
             pool.connect();
              pool.query("SELECT * FROM carrera")
                .then(response => {
                  pool.end();
                  res.json(response.rows)
                })
                .catch(error => {
                  pool.end()
                  console.log(error.stack)
                })
              
        },


        getCarreraDisponible(req,res){

          // ESTA QUERY DEVUELVE LA CARRERA EN QUE EL ALUMNO ESPECIFICADO NO ESTA INSCRIPTO
          var query = ` 
          
          SELECT  carrera.identificador, carrera.nombre FROM carrera  WHERE carrera.identificador 
          NOT IN (SELECT carrera.identificador 
          FROM carrera,inscripciones_carrera ic
          WHERE carrera.identificador = ic.idcarrera  AND ic.idalumno = $1 );`;

          var pool = new pg.Pool(config)
          pool.connect();
           pool.query(query,[req.params.id])
             .then(response => {
               pool.end();
               res.json(response.rows)
             })
             .catch(error => {
               pool.end()
               console.log(error.stack)
             })
           
     }
                  /*
                  const query1 = `
                  SELECT c.nombre, ea.condicion, ea.nota, cc.nombre as carrera
                  FROM curso as c
                  INNER JOIN estado_academico as ea ON ea.idcurso = c.identificador
                  INNER JOIN alumno as a ON ea.idalumno = a.identificador
                  INNER JOIN carrera  cc ON c.idcarrera = cc.identificador
                  WHERE  ea.condicion IN ($2,$3,$4,$5) AND a.identificador = $1`;      
               
              // ESTA CONSULTA DEVUELVE LA O LAS CARRERA EN QUE EL ALUMNO ESTA INSCRIPTO
              var query2 = ` 
              SELECT DISTINCT carrera.identificador, carrera.nombre FROM carrera, inscripciones_carrera ic, alumno
              WHERE carrera.identificador = ic.idcarrera AND ic.idalumno = $1;`;
              */
              
            

}
