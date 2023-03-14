const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const client = new MongoClient(connectionURL)

console.log('Connecting to server')

async function main() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected successfully to server");

        const db = client.db(databaseName)

        // db.collection('users').insertOne({
        //     name: 'Arshid',
        //     age: 23
        // })


        //the callback part is not working and I dont know why
        // db.collection('users').insertMany( [
        //     {
        //         name: 'Jen',
        //         age: 28
        //     },
        //     {
        //         name: 'Peter',
        //         age: 29
        //     }
        // ], (error, result) => {
        //     if(error) {
        //         return console.log('Unable to insert document')
        //     }

        //     console.log(result.ops)
        // })


        // db.collection('tasks').insertMany( [
        //     {
        //         description: 'Breakfast',
        //         completed: true
        //     },
        //     {
        //         description: 'Study',
        //         completed: false
        //     },
        //     {
        //         description: 'Practice',
        //         completed: true
        //     }
        // ], (error, result) => {
        //     if(error) {
        //         return console.log('Unable to insert document')
        //     }

        //     console.log(result.ops)
        // })

        //Read data
        
        // let result = await db.collection('users').findOne({ name: 'Jen' });

        // if (result) {
        //     console.log(result);
        // } else {
        //     console.log('Unable fetch');
        // }

        // const users = await db.collection('users').find({ age: 28 }).toArray()
        // console.log(users)
        // const incompleteTasks = await db.collection('tasks').find({ completed: false }).toArray()
        // console.log(incompleteTasks)
        
        // await db.collection("users").updateOne({ _id: new ObjectId("64075266a0361fd477efde9a") }, { $set: {name: 'Tom' }}).then(
        //     res => console.log(`Updated ${res.matchedCount} documents`),
        //     err => console.error(`Something went wrong: ${err}`),
        //   );

        // await db.collection('tasks').updateMany( { 
        //     completed: false 
        // }, {
        //     $set: {
        //         completed: true
        //     }
        // }).then(
        //     res => console.log(`Updated ${res.matchedCount} documents`),
        //     err => console.log(`Something went wrong: ${err}`)
        // )

        await db.collection('users').deleteMany( { 
            age: 23 
        }).then(
            res => console.log(`Deleted ${res.dele} documents`),
            err => console.log(`Something went wrong: ${err}`)
        )

    } finally {
        // Ensures that the client will close when you finish/error

        client.close()
        console.log("Connection to server closed")
    }
}

main().catch(console.dir);

