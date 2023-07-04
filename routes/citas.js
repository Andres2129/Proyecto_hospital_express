var express = require('express');
var router = express.Router();

const { conexion } = require('../database/conexion')

/* GET home page. */
router.get("/", function (req, res, next) {
    conexion.query("SELECT C.id, C.fecha, Med.nombres, Pa.nombre, Med.consultorio FROM cita_medica C, medicos Med, pacientes Pa WHERE cedula_medico=Med.cedula AND cedula_paciente=Pa.cedula;", (error, citas) => {
        if (error) {
            res.status(500).send("Ocurrio un error en la consulta"+ error);
        } else {
            res.status(200).render("citas", { citas });
        }
    });
});

router.get('/agregar', (req, res) => {
    res.status(200).sendFile('registro-citas.html', { root: 'public' })
})

router.post('/guardar-cita', (req, res) => {
    const cedulaPaciente = req.body.cedula;
    const fecha = req.body.fecha;
    const especialidad = req.body.especialidad
    conexion.query(`SELECT * FROM medicos WHERE especidalidad='${especialidad}'`, (error, medicos) => {
        if (error) {
            res.status(500).send('Error en la consulta ' + error)
        } else {
            const cedulaMedico = medicos[0].cedula
            console.log(cedulaMedico)
            conexion.query(`INSERT INTO cita_medica (cedula_paciente, cedula_medico, fecha) VALUES (${cedulaPaciente}, ${cedulaMedico}, '${fecha}')`, (error, resultado) => {
                if (error) {
                    res.status(500).send('Error en la consulta ' + error)
                } else {
                    res.redirect('/citas')
                }
            })
        }
    })
})
router.get('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    conexion.query(`DELETE FROM cita_medica WHERE id=${id}`, (error, resultado) => {
        if (error) {
            res.status(500).send('Ocurrio un error en la consulta ' + error)
        } else {
            res.status(200).redirect('/citas')
        }
    })
})

module.exports = router;
