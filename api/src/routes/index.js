const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const displayHome = require('../controllers/displayHome');
const getDogs = require('../controllers/getDogs');
const getDogsById = require('../controllers/getDogsById');
const createDog = require('../controllers/createDog');
const getTemperaments = require('../controllers/getTemperaments');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', displayHome);
router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogsById);
router.post('/dogs', createDog);
router.get('/temperaments', getTemperaments);

module.exports = router;
