var express = require('express');
var router = express.Router();
var app = express();
const controllerProfesor = require('../controller/controllerProfesor');

router.get('/profesor', controllerProfesor.getProfesor);
router.get('/profesor/:id',controllerProfesor.getIdProfesor);


const cors = require('cors');
app.use(cors());


module.exports = router;
