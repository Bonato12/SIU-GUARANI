var express = require('express');
var router = express.Router();
var app = express();
const controllerEstado = require('../controller/controllerEstadoAcademico');

router.post('/estado', controllerEstado.getEstadoCarrera);
router.post('/nuevo/estado', controllerEstado.postEstado);
router.get('/estado/:idalumno/:idcurso', controllerEstado.getEstado);
router.put('/estado/:idalumno/:idcurso', controllerEstado.updateEstado);


const cors = require('cors');
app.use(cors());


module.exports = router;
