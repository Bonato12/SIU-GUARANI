var express = require('express');
var router = express.Router();
var app = express();
const controllerCarrera = require('../controller/controllerCarrera');

router.get('/carrera', controllerCarrera.getCarrera);
router.get('/carrera/disponible/:id', controllerCarrera.getCarreraDisponible);



const cors = require('cors');
app.use(cors());


module.exports = router;
