var express = require('express');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
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

MongoClient.connect('mongodb://testUser:password1@ds117111.mlab.com:17111/ux-crud', (err,client) =>{
    if (err) return console.log(err)
    db = client.db('ux-crud')

    app.listen(3000, () => {
        console.log('listening on 3000')  
    })
})

