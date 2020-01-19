var express = require('express');
var app = express();
var pg = require('pg');
var config = require('../database/connectionDB.js');

module.exports = {


   


      getEstado(req,res){
          console.log(req.params)
          var pool = new pg.Pool(config);
          const query = `

          SELECT ea.idalumno , persona.documento, ea.idcurso, curso.nombre, ea.condicion, ea.nota
          FROM estado_academico ea, alumno, curso, persona
          WHERE  ea.idalumno = ($1) AND ea.idcurso = ($2) AND ea.idcurso = curso.identificador 
          AND ea.idalumno = alumno.identificador AND alumno.idpersona = persona.identificador;
          
          `;  
          
          pool.connect();
              
            pool.query(query,[req.params.idalumno, req.params.idcurso])
              .then(response => {
                pool.end()
                res.json(response.rows)
              })
              .catch(error => {
                pool.end()
                console.log(error)
              }) 

      },


         // DEVUELVE LAS MATERIAS QUE CURSO EL ALUMNO, FILTRANDO POR CONDICION (CURSANDO,LIBRE,REGULAR,PROMOCIONADO)
      // TAMBIEN DEVUELVE LA CARRERA EN QUE EL ALUMNO ESTA INSCRIPTO 
      async getEstadoCarrera(req,res){
              console.log(req.body)
              // ESTA CONSULTA DEVUELVE LOS CURSOS QUE EL ALUMNO CURSO O ESTA CURSANDO
              const query1 = `
                  SELECT c.nombre, ea.condicion, ea.nota, cc.nombre as carrera, cc.identificador as idcarrera
                  FROM curso as c
                  INNER JOIN estado_academico as ea ON ea.idcurso = c.identificador
                  INNER JOIN alumno as a ON ea.idalumno = a.identificador
                  INNER JOIN carrera  cc ON c.idcarrera = cc.identificador
                  WHERE  ea.condicion IN ($2,$3,$4,$5) AND a.identificador = $1`;      
               
              // ESTA CONSULTA DEVUELVE LA O LAS CARRERA EN QUE EL ALUMNO ESTA INSCRIPTO
              var query2 = ` 
              SELECT DISTINCT carrera.identificador, carrera.nombre FROM carrera, inscripciones_carrera ic, alumno
              WHERE carrera.identificador = ic.idcarrera AND ic.idalumno = $1;`;

        var pool = new pg.Pool(config)
        pool.connect();
        const cursos = (await pool.query(query1, [req.body.identificador, req.body.opciones[0],req.body.opciones[1],req.body.opciones[2],req.body.opciones[3]])).rows       
        const carrera = (await pool.query(query2, [req.body.identificador])).rows

        pool.end();
        var acumulador1 = 0;
        var contador1 = 0;
        var acumulador2 = 0;
        var contador2 = 0;
        for(var i = 0; i < cursos.length;i++){
            if (cursos[i].condicion == 'PROMOCIONADO'){
              if (cursos[i].idcarrera == 1){
                acumulador1 = acumulador1 + cursos[i].nota;
                contador1 = contador1 + 1;  
              }else{
                acumulador2 = acumulador2 + cursos[i].nota;
                contador2 = contador2 + 1;  
              }             
            }            
        }
        var promedio1 = acumulador1 / contador1;
        var promedio2 = acumulador2 / contador2;

        var carreras = [];
        console.log(carrera);
        for(var i = 0; i < carrera.length;i++){
            carreras.push(carrera[i].nombre);
                     
        }
        console.log(carreras);
        informacion = {
              cursos:cursos,
              carrera: carreras,
              promedio1: promedio1,
              promedio2: promedio2
        }
        console.log(informacion);

        res.json(informacion);

       },


       // CARGA UN NUEVO ESTADO ACADEMICO, ES DECIR A UN CURSO INSCRIPTO LE AGREGO UNA NOTA 
       postEstado(req,res){
        console.log(req.body);
        var pool = new pg.Pool(config)
        pool.connect();
        pool.query("INSERT INTO estado_academico (idalumno,idcurso,condicion,nota) VALUES($1,$2,$3,$4)",[req.body.idalumno,req.body.idcurso,req.body.condicion,req.body.nota])         .then(response => {
              pool.end();
              res.sendStatus(200);
          })
          .catch(error => {
            pool.end();
            console.log(error);
            res.sendStatus(500);
          })

       },

       //PUEDO EDITAR NOTA Y CONDICION DEL ALUMNO EN UN ESTADO ACADEMICO
       updateEstado(req,res){
        console.log(req.params);
        console.log(req.body);
        var pool = new pg.Pool(config)
        pool.connect();
          pool.query("UPDATE estado_academico SET condicion=($3), nota=($4) WHERE idalumno = ($1) AND idcurso = ($2)", [req.params.idalumno, req.params.idcurso,req.body.condicion,req.body.nota])
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
