var express = require('express');
var router = express.Router();
var app = express();
const controllerInscripcion = require('../controller/controllerInscripcion');

router.get('/inscripcion/curso', controllerInscripcion.getCursosInscriptos);
router.get('/inscripcion/carrera', controllerInscripcion.getCarreraInscriptos);
router.get('/inscripcion/cursos/profesores', controllerInscripcion.getCursosProfesoresInscriptos);
router.get('/inscripcion/carrera/profesores', controllerInscripcion.getCarreraProfesoresInscriptos);
router.post('/inscripcion', controllerInscripcion.postInscripcionCurso);
router.post('/inscripcion/carrera', controllerInscripcion.postInscripcionCarrera);



const cors = require('cors');
app.use(cors());


module.exports = router;
