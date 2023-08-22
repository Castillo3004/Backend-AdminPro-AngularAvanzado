const { response } = require("express");

const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');




const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('hospital', 'nombre')
                                .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        medicos
    });

}


const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body,   
    });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }


}


const actualizarMedico = async(req, res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( medicoId );

        if( !medico ){
            return res.status(400).json({
                ok: false,
                msg: 'Medico no econtrado por id',
            });
        }

        const hospitalDb = await Hospital.findById( req.body.hospital );

        if( !hospitalDb ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe el Hospital'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Medico Actualizado',
            medico: medicoActualizado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}


const borrarMedico = async(req, res = response) => {

    const medicoId = req.params.id;

    try {

        const medico = await Medico.findById( medicoId );

        if( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id',
            })
        }

        await Medico.findByIdAndDelete( medicoId );

        res.json({
            ok: true,
            msg: 'Medico Borrado'
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
}