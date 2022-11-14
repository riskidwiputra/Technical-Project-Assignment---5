// npm
const express         = require('express')
const dotenv          = require('dotenv')
const expressLayouts  = require('express-ejs-layouts');
const flash           = require('connect-flash');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');
const methodOverride = require('method-override')
// local
const allRoutes       = require('./routes');
const {sequelize}     = require('./models')

dotenv.config();
const app             = express()
const port            = process.env.PORT;

// routing

// set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser('secret'));
app.use(session({
    cookie: {
        maxAge: 1000
    },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

app.use(methodOverride('_method'))

app.use(allRoutes);

// connection database
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('database Connected')
  } catch (error) {
    console.log(error)
  }
    console.log(`Example app listening at http://localhost:${port}`)
})