const express = require ('express')
const Guitar = require('./../models/guitar')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('guitars/new', { guitar: new Guitar() })
})

router.get('/:slug', async (req, res) => {
    const guitar = await Guitar.findOne({ slug: req.params.slug })
    if (guitar == null) res.redirect('/')
    res.render('guitars/show', {guitar: guitar})
})

router.post('/', async (req, res) => {
    let guitar = new Guitar({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
    guitar = await guitar.save()
    res.redirect(`/guitars/${ guitar.slug }`)
     } catch(e){
        console.log(e)
        res.render('guitars/new', { guitar: guitar })
     }
})

router.delete('/:id', async (req, res) => {
    await Guitar.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router

