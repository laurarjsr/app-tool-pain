const Sesion = require("../models/Sesion");

exports.crearSesion = async (req, res) => {
    try {
        let sesion;

        //Creamos nuestra sesion
        sesion = new Sesion(req.body);

        await sesion.save();
        res.send(sesion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}