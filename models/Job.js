const Sequelize = require('sequelize')
const db = require('../db/conect')

const Job = db.define('job', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  salario: {
    type: Sequelize.STRING
  },
  empresa: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  new_job: {
    type: Sequelize.INTEGER
  }
})

module.exports = Job
