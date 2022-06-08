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

exports.obtenerSesiones = async (req, res) => {
    try {
        const sesiones = await Sesion.find();
        res.json(sesiones);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerSesion = async (req, res) => {
    try {
        let sesion = await Sesion.findById(req.params.id);
        if (!sesion) {
            res.status(404).json({ msg: 'No existe la sesión' })
        }
        res.json(sesion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarSesion = async (req, res) => {
    try {
        let sesion = await Sesion.findById(req.params.id);
        if (!sesion) {
            res.status(404).json({ msg: 'No existe la sesión' })
        }
        await Sesion.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Sesión eliminada con éxito'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/*exports.actualizarSesion = async (req, res) => {
    try {
        const { exerciseToDo, aproxTotalDuration, actualTotalDuration, date, emotions, moans, heartbeats, comments} = req.body;
        let sesion = await Sesion.findById(req.params.id);
        if (!sesion) {
            res.status(404).json({ msg: 'No existe la sesión' })
        }

        sesion.exerciseToDo = exerciseToDo;
        sesion.aproxTotalDuration = aproxTotalDuration;
        sesion.actualTotalDuration = actualTotalDuration;
        sesion.date = date;
        sesion.emotions = emotions;
        sesion.moans = moans;
        sesion.heartbeats = heartbeats;
        sesion.comments = comments;

        sesion = await Sesion.findOneAndUpdate({ _id: req.params.id }, sesion, { new: true })
        res.json(sesion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}*/