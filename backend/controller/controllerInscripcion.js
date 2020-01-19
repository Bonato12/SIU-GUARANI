var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {

        // DEVUELVE TODAS LAS INCRIPCIONES DE LOS CURSOS
        getCursosInscriptos(req,res){

          const query = ` SELECT persona.documento, curso.nombre, ic.idalumno, ic.idcurso, to_char( ic.fechainscripcion, 'DD-MM-YYYY') as fechainscripcion FROM inscripciones_curso ic, alumno, curso, persona
          WHERE  ic.idcurso = curso.identificador 
          AND ic.idalumno = alumno.identificador AND alumno.idpersona = persona.identificador;`

          var pool = new pg.Pool(config)
          pool.connect();
           pool.query(query)
             .then(response => {
               pool.end();
               res.json(response.rows)
             })
             .catch(error => {
               pool.end()
               console.log(error.stack)
             })
           
     },

     // MUESTRA LOS PROFESORES QUE ESTAN INSCRIPTOS EN LAS MATERIAS 
     getCursosProfesoresInscriptos(req,res){

      const query = ` SELECT persona.documento, curso.nombre, cp.idprofesor, cp.idcurso, cp.fechainscripcion FROM curso_profesor cp , profesor, curso, persona
      WHERE  cp.idcurso = curso.identificador 
      AND cp.idprofesor = profesor.identificador AND profesor.idpersona = persona.identificador;`

      var pool = new pg.Pool(config)
      pool.connect();
       pool.query(query)
         .then(response => {
           pool.end();
           res.json(response.rows)
         })
         .catch(error => {
           pool.end()
           console.log(error.stack)
         })
       
 },

     // DEVUELVE TODOS LOS ALUMNOS INSCRIPTOS EN LAS CARRERAS
     getCarreraInscriptos(req,res){

      const query = ` 
      
      SELECT persona.documento, carrera.nombre, ic.idalumno, ic.idcarrera, to_char( ic.fechainscripcion, 'DD-MM-YYYY') as fechainscripcion FROM inscripciones_carrera ic, alumno, carrera, persona
      WHERE  ic.idcarrera = carrera.identificador 
      AND ic.idalumno = alumno.identificador AND alumno.idpersona = persona.identificador;`

      var pool = new pg.Pool(config)
      pool.connect();
       pool.query(query)
         .then(response => {
           pool.end();
           res.json(response.rows)
         })
         .catch(error => {
           pool.end()
           console.log(error.stack)
         })
       
        },

        //DEVUELVE TODOS LOS PROFESORES QUE ESTAN INSCRIPTOS EN LA CARRERA
        getCarreraProfesoresInscriptos(req,res){

          const query = ` 
          
          SELECT persona.documento, carrera.nombre, icp.idprofesor, icp.idcarrera, to_char( icp.fechainscripcion, 'DD-MM-YYYY') as fechainscripcion FROM inscripciones_carrera_profesor icp, profesor, carrera, persona
          WHERE  icp.idcarrera = carrera.identificador 
          AND icp.idprofesor = profesor.identificador AND profesor.idpersona = persona.identificador;`
    
          var pool = new pg.Pool(config)
          pool.connect();
           pool.query(query)
             .then(response => {
               pool.end();
               res.json(response.rows)
             })
             .catch(error => {
               pool.end()
               console.log(error.stack)
             })
           
            },


        // GUARDA LA INCRIPCION DE UN ALUMNO Y UN CURSO  
        postInscripcionCurso(req,res){
                  console.log("hola");
                  var pool = new pg.Pool(config);
                  pool.connect();
                  var now = new Date();
                  pool.query("INSERT INTO inscripciones_curso(idalumno, idcurso, fechainscripcion) VALUES($1,$2,$3)",[req.body.alumno,req.body.curso, now])
                    .then(response => {
                      pool.end();
                      res.sendStatus(200);
                    })
                    .catch(error => {
                      pool.end();
                      console.log(error);
                      res.sendStatus(500);
                    })
                  
            },

            // GUARDA LA INSCRIPCION DE UN ALUMNO Y UNA CARRERA
            postInscripcionCarrera(req,res){
              console.log(req.body);
              var pool = new pg.Pool(config);
              pool.connect();
              var now = new Date();
              pool.query('INSERT INTO inscripciones_carrera(idalumno, idcarrera,fechainscripcion) VALUES($1,$2,$3)',[req.body.alumno,req.body.carrera, now])
                .then(response => {
                  pool.end();
                  res.sendStatus(200);
                })
                .catch(error => {
                  pool.end();
                  console.log(error);
                  res.sendStatus(500);
                })
              
        }    

  }

         
