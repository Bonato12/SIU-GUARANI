var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {

          getCurso(req,res){
              var pool = new pg.Pool(config)
              pool.connect();
                pool.query("SELECT * FROM curso")
                  .then(response => {
                    pool.end();
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error.stack)
                  })
                
          },

          getCursoEspecifico(req,res){
              var pool = new pg.Pool(config)
                    pool.connect();
                    pool.query('SELECT * FROM curso WHERE identificador = $1',[req.params.id])
                      .then(response => {
                        pool.end()
                        res.json(response.rows)
                      })
                      .catch(error => {
                        pool.end()
                        console.log(error)
                      })
          

          },

         async getIdCurso(req,res){
           var pool = new pg.Pool(config);
           var query1 = `  SELECT persona.documento, persona.nombre, persona.apellido
                           FROM curso, alumno, inscripciones_curso icurso, persona
                           WHERE alumno.identificador = icurso.idalumno AND icurso.idcurso = curso.identificador
                           AND alumno.idpersona = persona.identificador 
                           AND curso.identificador  = $1; `;
           
            var query2 = ` SELECT persona.documento, persona.nombre, persona.apellido
                           FROM curso,profesor, curso_profesor CP, persona
                           WHERE profesor.identificador = CP.idprofesor AND CP.idcurso = curso.identificador
                           AND profesor.idpersona = persona.identificador 
                           AND curso.identificador  = $1;`  ;
             

              const alumnos = (await pool.query(query1, [req.params.id])).rows       
              const profesores = (await pool.query(query2, [req.params.id])).rows       
              pool.end();
              var info = {
                alumnos: alumnos,
                profesores: profesores
              }
              console.log(info);
              res.json(info);

           
        },

        // ESTA FUNCION DEVUELVE A QUE CURSO NO ESTA INSCRIPTO EL ALUMNO
        async getAlumnoCurso(req,res){
          console.log(req.body);
           var pool = new pg.Pool(config);
           /*
           var query1 = `  SELECT  curso.identificador, curso.nombre FROM curso  WHERE curso.nombre 
                           NOT IN (SELECT curso.nombre 
                           FROM curso,inscripciones_curso ic
                           WHERE curso.identificador = ic.idcurso AND ic.idalumno = $1)`;
               */                       
             var query2 = ` SELECT DISTINCT carrera.identificador, carrera.nombre FROM carrera, inscripciones_carrera ic, alumno
                            WHERE carrera.identificador = ic.idcarrera AND ic.idalumno = $1;`;
              
              //const cursos = (await pool.query(query1, [req.params.id])).rows  
              const carrera = (await pool.query(query2, [req.params.id])).rows       
              pool.end();
             
              var info = {
                carrera: carrera
              }
              res.json(info);
        },


        async getCarreraCurso(req,res){
           console.log(req.body.alumno);
           var pool = new pg.Pool(config);
           // ESTA QUERY DEVUELVE TODOS LOS CURSOS DISPONIBLE DEPENDIENDO EL ALUMNO Y LA CARRERA EN QUE ESTA INSCRIPTO
           var query1 = `  SELECT  curso.identificador, curso.nombre FROM curso  WHERE curso.idcarrera = $2 AND curso.identificador 
                            NOT IN (SELECT curso.identificador 
                            FROM curso,inscripciones_curso ic
                            WHERE curso.identificador = ic.idcurso  AND ic.idalumno = $1); `;
             //ESTA QUERY DEVUELVE LAS CARRERA EN QUE ESTA INSCRIPT EL ALUMNO                         
             var query2 = ` SELECT DISTINCT carrera.identificador, carrera.nombre FROM carrera, inscripciones_carrera ic, alumno
                            WHERE carrera.identificador = ic.idcarrera AND ic.idalumno = $1;`;

              const cursos = (await pool.query(query1, [req.body.alumno,req.body.carrera])).rows  
              const carrera = (await pool.query(query2, [req.body.carrera])).rows       
              pool.end();
             
              var info = {
                cursos: cursos,
                carrera: carrera
              }
              res.json(info);
       },


    }

         
