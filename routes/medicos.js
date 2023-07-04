var express = require('express');
var router = express.Router();
var {conexion} = require('../database/conexion')

//Listando todos los medicos
router.get('/', function(req, res, next) {

  conexion.query('SELECT * FROM medicos', (error, medicos)=>{
  if(error){
  res.status(500).send('Ocurrio un error en la consulta')
  }else{
    res.status(200).render('medicos',{medicos, opcion: 'disabled', activo: true})
  }
  })
  });

  //Insertar medicos
router.get('/agregar', (req, res) => {
  res.status(200).sendFile('registro-medicos.html', {root: 'public'})
  })
  
  router.post('/guardar-medico', (req, res)=>{
  const cedula = req.body.cedula
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const correo = req.body.correo
  const consultorio = req.body.consultorio
  const especialidad = req.body.especialidad
  conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, correo, consultorio, especidalidad) VALUES (${cedula}, '${nombre}', '${apellido}', '${correo}', '${consultorio}', '${especialidad}')`, (error, resultado) => {
  if (error) {
  res.status(500).send('Ocurrio un error en la consulta'+ error)
  } else {
  res.status(200).redirect('/medicos')
  }
  })
  })

  //Eliminando medicos

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula
  conexion.query(`DELETE FROM medicos WHERE cedula=${cedula}`, (error, resultado) => {
    if(error){
      res.status(500).send('Ocurrio un error en la consulta ' + error)
    } else {
      res.status(200).redirect('/medicos')
    }
  })
})

//Actualizar mascotas

router.get('/activar', function(req, res, next) {
  conexion.query('SELECT * FROM medicos', (error, medicos) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('medicos.hbs', {medicos, opcion: ''})
    }
  })
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const especialidad = req.body.especialidad
  const consultorio = req.body.consultorio
  const correo = req.body.correo
  conexion.query(`UPDATE medicos SET nombres='${nombre}', apellidos='${apellido}', especidalidad='${especialidad}', consultorio=${consultorio}, correo='${correo}' WHERE cedula= ${cedula}`, (error, resultado) => {
    if (error) {
      res.status(500).send('Ocurrio un error en la ejecución ' + error)
    } else {
      res.status(200).redirect('/medicos')
    }
  })
})


module.exports = router;
