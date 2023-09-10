const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const users = []

app.post('/login', (req, res) => {
    const {email, password} = req.body

    const user = users.find(user => user.email === email && user.password === password)
    if(user){
        res.status(200).json({username : user.username})
    } else {
        res.status(401).json({message : 'Invalid email or password'})
    }

})

app.post('/register', (req, res) => {
    const {email, username, password} = req.body

    const userExist = users.some(user => user.email === email)

    if(userExist){
        res.status(409).json({message : 'Email had already exist'})
    } else {
        users.push({email, username, password})
        res.status(201).json({message : 'Register Success'})
    }
})



app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
})