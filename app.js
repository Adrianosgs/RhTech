const express = require('express')
const exphbars = require('express-handlebars')
const app = express()
const path = require('path')
const db = require('./db/conect')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const PORT = 3000

app.listen(PORT, function () {
  console.log(`A que esta sendo utilizada é a ${PORT}`)
})

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))

//bars
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//arquivos staticos
app.use(express.static(path.join(__dirname, 'public')))

//BD
db.authenticate()
  .then(() => {
    console.log('conectado ao banco')
  })
  .catch(err => {
    console.log('ocorreu um erro com o banco', err)
  })

//rotas
app.get('/', (req, res) => {
  let search = req.query.job
  let query = '%' + search + '%' // ajudar a fazer a busca mesmo somente com uma porcenagem do titulo da vaga digitada

  if (!search) {
    Job.findAll({ order: [['createdAt', 'DESC']] })
      .then(jobs => {
        res.render('index', {
          jobs
        })
      })
      .catch(err => console.log(err))
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [['createdAt', 'DESC']]
    }).then(jobs => {
      res.render('index', {
        jobs,
        search
      })
    })
  }
})

//rodas da pagina
app.use('/jobs', require('./routes/jobs'))
