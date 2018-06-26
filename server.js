var express = require('express');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')



app.get('/', (request, response) => {
    db.collection('posts').find().toArray((err, result)=>{
        if (err) return console.log(err)

        response.render('index.ejs', {posts: result})
    })

    //response.sendFile(__dirname + '/index.html')
})

app.post('/posts', (request, response)=>{
    db.collection('posts').save(request.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        response.redirect('/')
    })
})

app.put('/posts', (request, response) => {
    console.log('replaced')
    db.collection('posts')
        .findOneAndUpdate(
            {
                name: 'Replace'
            }, 
            {
                $set: {
                    name: request.body.name,
                    quote: request.body.quote
                }
            },
            {
                sort: {_id: -1},
                upsert: true
            }, (err, result) => {
                if (err) return response.send(err)
                response.send(result)
        })
})

app.delete('/posts', (request, response) => {
    console.log("Deleted")
    db.collection('posts').findOneAndDelete(
        {
            name: request.body.name
        },
        (err, result) => {
          if (err) return response.send(500, err)
          response.send({message: 'Message deleted'})
        }
    )
})

MongoClient.connect('mongodb://testUser:password1@ds117111.mlab.com:17111/ux-crud', (err,client) =>{
    if (err) return console.log(err)
    db = client.db('ux-crud')

    app.listen(3000, () => {
        console.log('listening on 3000')  
    })
})

