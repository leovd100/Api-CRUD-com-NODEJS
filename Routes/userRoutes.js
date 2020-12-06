const fs = require('fs')
const {join} = require('path')
const { getuid } = require('process')
const filePath = join(__dirname,'users.json')

const getUser = () => {
    // se o filePath existe nos arquivos 
    const data = fs.existsSync(filePath) 
    ? fs.readFileSync(filePath) : []
    
    try{
        return JSON.parse(data)
    }catch(e){
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users,null, '\t'))

const userRoutes = (app) => { // rota de usuario
    app.route('/users/:id?') // rota /users
    .get((req,res) => {
        const users = getUser()
        res.send({users})

    })
    .post((req,res) => {
        const users = getUser()

        users.push(req.body)
        saveUser(users)

        res.status(201).send('ok')
    })

    .put((req,res) =>{
        const users = getUser()

        saveUser(users.map(user =>{
            if(user.id === req.params.id){
                return{
                    ...user,...req.body
                }
            
            }

            return user
        }))

        res.status(200).send('ok')
    })
    .delete((req,res) =>{
        const users = getUser()

        saveUser(users.filter(user => user.id !== req.params.id))
        res.status(200).send('ok')
    })
}

module.exports = userRoutes