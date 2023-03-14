const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        //get the token and replace 'Bearer ' with '' which is in the beginning of token
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismytoken')

        //decoded will have _id property as we provided it while generating token
        //below line will find user that has the correct id and has the token still stored
        const user = await User.findOne( { _id: decoded._id, 'tokens.token': token })
        
        // if user doesnot exist
        if(!user){
            throw new Error()
        }

        //we can store user, token in req, so that any route handler can access it later
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ 'error': 'Please authenticate.' })
    }
}

module.exports = auth