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

    socket.on('module edited', (object) => {
        db.update({ id: object.id }, {id: object.id, idHTML: object.idHTML, type: object.type, position: object.position, content: object.content}, { upsert: true }, function (err, numReplaced) {
        });
        console.log(object);
        io.emit('module edited', object);
    });


    socket.on('delete', (object) => {
        console.log('delete: ' + JSON.stringify(object))
        db.remove({ _id: object._id }, {}, function (err, numRemoved) {
        });
        io.emit('delete', object);
    });

    socket.on('new object', (obj) => {
        db.insert({id: obj._id, idHTML: obj.idHTML, type: obj.type, position: obj.position, content: obj.content}, (err, newDoc) => {});
        console.log('new object: ' + obj);
        io.emit('new object', obj);
    });
});
// -- API --
//bodyParser for receiving data via POST request
app.use(bodyParser.json());


//API
app.post('/api/all', function (req, res) {
    db.find({}).sort({createdAt: 1}).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
})