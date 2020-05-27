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
        db.insert({'message': msg}, (err, newDoc) => {
            io.emit('chat message', newDoc);
        });
        console.log('add: ' + msg);

    });

    socket.on('delete', (object) => {
        console.log('delete: ' + JSON.stringify(object))
        db.remove({ _id: object._id }, {}, function (err, numRemoved) {
        });
        io.emit('delete', object);
    });

});


// -- API --
//bodyParser for receiving data via POST request
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
