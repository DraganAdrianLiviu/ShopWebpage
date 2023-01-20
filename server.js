const express = require('express')
const mongoose = require('mongoose')
const Guitar = require ('./models/guitar')
const guitarRouter = require('./routes/guitars')
const methodOverride = require('method-override')
const app = express()


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const guitars = await Guitar.find().sort({createdAt: 'desc' })
    res.render('guitars/index', {guitars: guitars})
})

app.use('/guitars', guitarRouter)

app.listen(3000)

mongoose.connect('mongodb+srv://GuitarShop:mQWlEmrSFywTaXE0@cluster0.synm5sh.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('DB connected'))
.catch((error) => console.error('DB connection error!', error)); 