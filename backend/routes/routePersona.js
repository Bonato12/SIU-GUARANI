var express = require('express');
var router = express.Router();
var app = express();
const controllerPersona = require('../controller/controllerPersona');

router.get('/persona', controllerPersona.getPersona);

router.post('/persona',controllerPersona.postPersona);
router.get('/persona/:id',controllerPersona.getIdPersona);
router.get('/alumno/:id',controllerPersona.getIdAlumno);
router.put('/persona/:id', controllerPersona.updatePersona);


const cors = require('cors');
app.use(cors());


module.exports = router;
