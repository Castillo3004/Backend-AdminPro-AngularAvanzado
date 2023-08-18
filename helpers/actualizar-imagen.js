const fs  = require('fs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');



const borrarImagen = ( path ) => {

    if( fs.existsSync( path )){
        // Borar la imagen anterior
        fs.unlinkSync( path );
    }
}

const acualizarImagen = async( tipo, id, nombreArchivo ) => {

    switch( tipo ){
        case 'medicos':{
            const medico = await Medico.findById(id);

            if( !medico ){
                console.log('No se encontro un medico por id');
                return false;
            }
            
            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        }
        break;
        
        case 'hospitales':{
            const hospital = await Hospital.findById(id);

            if( !hospital ){
                console.log('No se encontro un hospital por id');
                return false;
            }
            
            const pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        }
        break;
        
        case 'usuarios':{
            const usuario = await Usuario.findById(id);

            if( !usuario ){
                console.log('No se encontro un usuario por id');
                return false;
            }
            
            const pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        }
            
        break;

    }

    
}



module.exports = {
    acualizarImagen
}