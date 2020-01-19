var express = require('express');
var router = express.Router();
var app = express();
const controllerCurso = require('../controller/controllerCurso');

router.get('/curso', controllerCurso.getCurso);
router.get('/cursoLibre/:id', controllerCurso.getAlumnoCurso);
router.post('/cursoCarreraLibre', controllerCurso.getCarreraCurso);
router.get('/curso/:id',controllerCurso.getCursoEspecifico);
router.get('/curso/buscar/:id',controllerCurso.getIdCurso);


const cors = require('cors');
app.use(cors());


module.exports = router;
