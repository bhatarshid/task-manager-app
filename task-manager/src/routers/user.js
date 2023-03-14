const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router


//create user api (or signup)
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token = await user.generateAuthToken() //create token for valid signup
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
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() 

        res.send({ user, token })
    }
    catch (e) {
        res.status(400).send()
    }
})

//user logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//logout of all the sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e){
        res.status(500).send()
    }
})

//get profile of logged in user
//when someone makes request to /users, first middleware auth will run
//then route handler will run only if middleware auth call next() function
router.get('/users/me', auth, async (req, res) => {
    //in authentication we saved the user details in req
    res.send(req.user)
})

//get user by id
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }
//     catch {
//         res.status(500).send()
//     }

    
//     // User.findById(_id).then((user) => {
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
        
//     //     res.send(user)
//     // }).catch((e) => {
//     //     res.status(500).send()
//     // })
// })

//update user
router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid update')
    }

    try {
        
        //iterate the list updates to check which properties are updates and apply them
        updates.forEach( (update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user
router.delete('/users/me', auth, async (req,res) => {
    try {
        await User.deleteOne(req.user)
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router