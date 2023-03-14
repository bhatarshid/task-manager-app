require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

User.findByIdAndUpdate('640c304ee75eaef0afbfc8ac', { 
    age: 1
}).then((user)=> {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

Task.findByIdAndRemove('640b2d3a043fde333d4e1d6f').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e)=> {
    console.log(e)
})