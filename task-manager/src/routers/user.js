const express = require('express')
const User = require('../models/user')
const router = new express.Router


//create user api (or signup)
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        const token = await user.generateAuthToken() //create token for valid signup
        await user.save()
        res.status(201).send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }

    // without async-await
    // user.save().then(()=> {
    //     res.status(201).send(user)
    // }).catch((e)=> {
    //     res.status(400).send(e)
    // })
})

//user login
router.get('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()
    }
})

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (e) {
        res.status(500).send(e)
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

//get user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch {
        res.status(500).send()
    }

    
    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }
        
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

//update user
router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid update')
    }

    try {
        const user = await User.findById(req.params.id)
        //iterate the list updates to check which properties are updates and apply them
        updates.forEach( (update) => user[update] = req.body[update])
        await user.save()

        // below line of code can be used if we donot use bcrypt for passwords
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!user){
            return res.send(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user
router.delete('/users/:id', async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router