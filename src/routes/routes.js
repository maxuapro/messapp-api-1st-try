const express = require('express')
const router = express.Router()
const Messapp = require('../models/messapps')

// get all the data
router.get('/', async (req, res) => {
    try {
        const messapps = await Messapp.find() // <-- find data using Schema?
        res.json(messapps)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// create one
router.post('/', async (req, res) => {
    const messapp = new Messapp({
        text: req.body.text,
        author: req.body.author
    })
    try {
        const newMessapp = await messapp.save()
        res.status(201).json({ created: newMessapp })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// update one
router.patch('/:id', getMessapp, async (req, res) => {
    if (req.body.text != null) {
        res.messapp.text = req.body.text
    }
    if (req.body.author != null) {
        res.messapp.author = req.body.author
    }
    try {
        const updatedMessapp = await res.messapp.save() // that's the Magic!!!
        res.status(201).json(updatedMessapp)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// delete by id
router.delete('/:id', getMessapp, async (req, res) => {
    try {
        await res.messapp.remove()
        res.json({ message: "Deleted messapp" })
    } catch (error) {
        res.status(500).jason({ message: error.message })
    }
})

// middleware
async function getMessapp(req, res, next) {
    let messapp
    try {
        messapp = await Messapp.findById(req.params.id)
        if (messapp == null) {
            return res.status(404).json({ message: 'Cannot find todo' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.messapp = messapp
    next()
}

module.exports = router