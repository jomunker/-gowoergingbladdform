const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');

app.use(express.static('../dist/'));
http.listen(3000, () => {
    console.log('listening on *:3000');
});

//NeDB
const Database = require('nedb');
const db = new Database({filename: 'database.db', timestampData: true} );
db.loadDatabase();

io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        db.insert({'message': msg}, (err, newDoc) => {});
        console.log('chat: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('delete', (object) => {
        db.remove();
        io.emit('delete', object);
    });

});


// -- API --
//BodyParser for receiving Data
app.use(bodyParser.json());

app.post('/api/all', function (req, res) {
    db.find({}).sort({createdAt: 1}).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
})

app.post('/api/delete', function (req, res) {
    console.log(req.body)
    res.json({test:456});
})