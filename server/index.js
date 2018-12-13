const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const users = require('./data/users')

const app = express()

app.use(bodyParser.json())

app.use(session({
    secret: 'my-so-special-secret',
    resave: false,
    saveUninitialized: true
}))

function checkLoggedIn(req, res, next) {
    if(!req.session.loggedIn) return res.status(400).send('Not Authorized')
    next()
}

app.post('/api/login', (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].username === req.body.username && users[i].password === req.body.password) {
            req.session.loggedIn = true 
            req.session.profile = users[i]
            return res.status(200).send(req.session.loggedIn)
        }
    }
    return res.status(400).send('Not Authorized')
})

app.get('/api/profile', checkLoggedIn, (req, res) => {
    let otherUsers = users.filter( user => user.id !== req.session.profile.id)
    let returnObj = {
        profile: req.session.profile,
        users: otherUsers
    }
    return res.status(200).send(returnObj)
})

app.get('/api/user/:id', checkLoggedIn, (req, res) => {
    for(let i = 0; i < users.length; i++) {
        if(users[i].id === +req.params.id) return res.status(200).send(users[i])
    }
    return res.status(200).send({})
})

app.delete('/api/logout', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})

app.listen(3200, () => {
    console.log('Listening on port 3200')
})