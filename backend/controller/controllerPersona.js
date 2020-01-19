var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {

        // DEVUELVE TODOS LOS ALUMNOS QUE EXISTEN LA BD
        getPersona(req,res){
             var pool = new pg.Pool(config)
             pool.connect();
              pool.query("SELECT persona.identificador,persona.documento, persona.nombre, persona.apellido, alumno.identificador as idalumno, alumno.legajo as legajo FROM persona, alumno WHERE alumno.idpersona = persona.identificador")
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
            postPersona(req, res){
	          console.log(req.body);
              const persona = {
                documento: req.body.documento,
                tipodocumento: req.body.tipodocumento,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
              }
              var pool = new pg.Pool(config)
              pool.connect();
              pool.query("INSERT INTO persona (tipodoc,documento,nombre,apellido,direccion) VALUES($1,$2,$3,$4,$5) RETURNING identificador",[req.body.tipodocumento,req.body.documento,persona.nombre,persona.apellido,persona.direccion])
                .then(response => {
                  pool.query("INSERT INTO alumno (idpersona,legajo) VALUES($1,$2)",[response.rows[0].identificador,req.body.legajo]).then(response=>{
                    pool.end();
                    res.sendStatus(200);
                  })
                })
                .catch(error => {
                  pool.end();
                  console.log(error);
                  res.sendStatus(500);
                })
              
        },

    
        // PERMITE OBTENER UNA PERSONA ESPECIFICO
        getIdPersona(req,res){
           var pool = new pg.Pool(config)
           const query = `
           SELECT P.identificador, P.documento, P.nombre, P.apellido, P.tipodoc, P.direccion, alumno.identificador, alumno.legajo
           FROM persona P, alumno 
           WHERE  P.identificador = alumno.idpersona AND P.identificador = $1`;  
           
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
           
        },

        // PERMITE OBTENER UN ALUMNO ESPECIFICOR
        getIdAlumno(req,res){
          var pool = new pg.Pool(config)
          const query = `
          SELECT P.identificador, P.documento, P.nombre, P.apellido, P.tipodoc, P.direccion, alumno.identificador, alumno.legajo
          FROM persona P, alumno 
          WHERE  P.identificador = alumno.idpersona AND alumno.identificador = $1`;  
          
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
          
       },

       

        // PERMITE ACTUALIZAR UN DETERMINADO ALUMNO
        updatePersona(req,res){
          console.log(req.body)
          const persona = {
            id: req.body.identificador,
            documento: req.body.documento,
            tipodoc: req.body.tipodocumento,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
          }

          const alumno = {
            idpersona: req.body.identificador,
            legajo: req.body.legajo
          }

          var pool = new pg.Pool(config)
          pool.connect();
          pool.query("UPDATE persona SET documento=($1), tipodoc=($2), nombre=($3), apellido=($4), direccion=($5) WHERE identificador=($6)", [persona.documento,persona.tipodoc,persona.nombre,persona.apellido,persona.direccion,persona.id])
            .then(response => {
              pool.query("UPDATE alumno SET legajo=($1) WHERE idpersona=($2)", [alumno.legajo,alumno.idpersona])
              .then(response => {
                pool.end();
                res.sendStatus(200);
              })
            })
            .catch(error => {
              pool.end();
              console.log(error);
              res.sendStatus(500);
            })
         
    }

}
