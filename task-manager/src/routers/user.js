const express = require('express')
const multer = require('multer')
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
        res.status(400).send({e: e.message})
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
        await req.user.deleteOne()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//upload profile photo
const upload = multer({
    limits: {
        fileSize: 1000000   //max size of file to upload is 1MB
    },
    fileFilter(req, file, cb) {
        
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be jpg, jpeg or png'))    
        }

        cb(undefined,true)
    }
})

//auth authenticates user and upload.single() validates and uploads the image
router.post('/users/me/avatar', auth ,upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()

    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//delete user profile
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router