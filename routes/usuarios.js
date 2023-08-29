/*
    Ruta: api/usuarios&
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRol, validarAdminRoloMismoUsuario } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getUsuarios );

router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),   
        check('password', 'La contraseña es obligatoria').not().isEmpty(),   
        check('email', 'El email es obligatorio').isEmail(),   
        validarCampos,
    ], 
    crearUsuario 
);


router.put(
    '/:id', 
    [
        validarJWT,
        validarAdminRoloMismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),   
        check('email', 'El email es obligatorio').isEmail(),   
        check('rol', 'El rol es obligatorio').not().isEmpty(),   
        validarCampos,
    ],
    actualizarUsuario
)

router.delete( 
    '/:id', 
    [
        validarJWT,
        validarAdminRol,
    ], 
    borrarUsuario
)



module.exports = router;