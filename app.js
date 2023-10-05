import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const app = express()
const PORT = 5555

// Configurations
app.use(express.urlencoded({ extended: false }))
app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : "tanner"
}))
nunjucks.configure('views', {
    autoescape : true,
    express : app,
})

// Routes
app.get('/', (req, res) => {

    if (req.session.username) {
        res.render('index.html', { username: req.session.username })
    } else {
        res.render('index.html')
    }

})

app.get('/profile', (req, res) => {
    res.render('index.html')
})

app.post('/login', (req, res) => {
   const { username, password } = req.body
    req.session.username = username
    req.session.passwored = password

   // console.log(req.session)

    res.redirect('/')

})

// Listen
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))