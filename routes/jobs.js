const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

router.get('/test', (req, res) => {
  res.send('deu certo')
})

router.get('/view/:id', (req, res) =>
  Job.findOne({
    where: { id: req.params.id }
  })
    .then(job => {
      res.render('view', {
        job
      })
    })
    .catch(err => console.log(err))
)

router.get('/add', (req, res) => {
  res.render('add')
})

//Adivionar

router.post('/add', (req, res) => {
  let { title, description, salario, empresa, email, new_job } = req.body

  //inserir
  Job.create({
    title,
    description,
    salario,
    empresa,
    email,
    new_job
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
