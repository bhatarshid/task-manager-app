const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router

//create task
router.post('/tasks', auth, async (req, res) => {
    const task = new Task( {
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

//get all tasks
//match gives results when url = /tasks?completed=true/false
//limit and skip are for pagination
//sorting: GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true' ? true : (req.query.completed === 'false') ? 'false' : {}
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate( {
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

//get task by id
router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne( { _id, owner: req.user._id })
        
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if(!task){
    //         res.status(404).send(e)
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//update task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if(!task){
            return res.status(404).send
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete task
router.delete('/tasks/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        console.log(task)
        if(!task){
            console.log("if ",task)
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router