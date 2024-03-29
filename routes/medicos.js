/*
    Medicos
    ruta: /api/medicos
*/


const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos.controller');


const router = Router();


router.get(
    '/', 
    validarJWT,
    getMedicos 
);


router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ], 
    crearMedico
);


router.put(
    '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);


router.delete( 
    '/:id', 
    validarJWT,
    borrarMedico, 
);


router.get( 
    '/:id', 
    [
        validarJWT,
        check('id','El id del doctor debe ser un ID de Moongo').isMongoId(),
        validarCampos
    ],
    getMedicoById, 
);



module.exports = router;
