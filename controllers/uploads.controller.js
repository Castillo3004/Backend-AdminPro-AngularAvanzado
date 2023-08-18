const fs = require('fs');
const path = require('path');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');

const { acualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload = ( req, res = response) => {

    const { tipo, id } = req.params;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario o hospital (tipo)'
        });
    }

    // Validar que exista un archivo 
    if( !req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen...
    
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;


    // Path para guardar la imagen 
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path, (err) => {
        if (err){
          console.log(err);
          return res.status(500).json({
              ok: false,
              msg: 'Error al mover la imagen'
          });
        }

        // Actualizar base de datos
        acualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
    
}


const retornaImagen = ( req, res = response ) => {

    const { tipo, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    // imagen por defecto
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }


}


module.exports = {
    fileUpload,
    retornaImagen,
}