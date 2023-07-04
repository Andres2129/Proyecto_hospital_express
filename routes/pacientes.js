var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM pacientes' , (error, pacientes)=>{
    if(error){
      res.status(500).send('Ocurrio un error en la consulta' + error)
    } else{
      res.status(200).render('pacientes.hbs',{pacientes, opcion: 'disabled', activo: true})
    }
  })
});

router.get('/agregar',(req, res)=>{
  res.status(200).sendFile('registro-pacientes.html',{root: 'public'})
})

router.post('/guardar-paciente', (req, res) =>{
  const cedula = req.body.cedula
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.edad
  const telefono = req.body.telefono
  conexion.query(`INSERT INTO pacientes(cedula, nombre, apellido, edad, telefono) VALUES (${cedula}, '${nombre}', '${apellido}', ${edad}, '${telefono}')`, (error, resultado) => {
    if(error){
      res.status(500).send('Ocurrio un error en la consulta' + error)
    } else {
      res.status(200).redirect('/pacientes')
    }
  })

})

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula
  conexion.query(`DELETE FROM pacientes WHERE cedula=${cedula}`, (error,resultado) =>{
    if(error){
      res.status(500).send('Ocurrio un error en la consulta'+ error)
    } else {
      res.status(200).redirect('/pacientes')
    }
    
  })
})

//Actualizar pacientes

router.get('/activar', function(req, res, next) {
  conexion.query('SELECT * FROM pacientes', (error, pacientes) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('pacientes.hbs', {pacientes, opcion: ''})
    }
  })
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.edad
  const telefono = req.body.telefono
  conexion.query(`UPDATE pacientes SET nombre='${nombre}', apellido='${apellido}', edad=${edad}, telefono=${telefono} WHERE cedula=${cedula}`, (error, resultado) => {
    if (error) {
      res.status(500).send('Ocurrio un error en la ejecución ' + error)
    } else {
      res.status(200).redirect('/pacientes')
    }
  })
})

module.exports = router;


