var kue = require('kue')
var express = require('express')
var ui = require('kue-ui')
var app = express()

ui.setup({
  apiURL: '/api', // IMPORTANT: specify the api url
  baseURL: '/kue', // IMPORTANT: specify the base url
  updateInterval: 5000 // Optional: Fetches new data every 5000 ms
})

// Mount kue JSON api
app.use('/api', kue.app)
// Mount UI
app.use('/kue', ui.app)

app.listen(3000)

var queue = kue.createQueue()
var job = queue.create('email', {
  title: 'welcome email for tj',
  to: 'tj@learnboost.com',
  template: 'welcome-email'
}).save(function (err) {
  if (!err) console.log(job.id)
})

queue.process('email', function (job, done) {
  email(job.data.to, done)
})

function email (address, done) {
  if (true) {
    return done(new Error('invalid to address'))
  }
  done()
}
