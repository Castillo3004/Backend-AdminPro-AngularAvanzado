const { response } = require("express");

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');




const getTodo = async (req, res = response) => {

    const { busqueda } = await req.params;
    const regex = new RegExp( busqueda, 'i' );  


    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])


    try {

        res.json({
            ok: true,
            usuarios,
            medicos, 
            hospitales
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const getDocumentosColeccion = async (req, res = response) => {

    const { tabla, busqueda } = await req.params;
    const regex = new RegExp( busqueda, 'i' );  

    let data = [];
    
    try {
        
        switch( tabla ){
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');
            break;
            
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
            break;
                
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
            break;
            
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
        }

        res.json({
            ok: true, 
            coleccion: tabla,
            resultados: data,
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


module.exports = {
    getTodo,
    getDocumentosColeccion,
}