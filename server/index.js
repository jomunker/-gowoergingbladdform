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
const chatdb = new Database({filename: 'chat.db', timestampData: true} );
db.loadDatabase();
chatdb.loadDatabase();

io.on('connection', (socket) => {

    socket.on('module edited', (object) => {
        db.update({_id: object._id}, {
            _id: object._id,
            idHTML: object.idHTML,
            type: object.type,
            position: object.position,
            content: object.content
        }, {upsert: true}, function (err, numReplaced) {
        });
        console.log(object);
        io.emit('module edited', object);
    });


    socket.on('delete', (object) => {
        console.log('delete: ' + JSON.stringify(object))
        db.remove({ _id: object._id }, {}, (err, numRemoved) => {});
        io.emit('delete', object);
    });

    socket.on('new object', (obj) => {
        db.insert({
            _id: obj._id,
            idHTML: obj.idHTML,
            type: obj.type,
            position: obj.position,
            content: obj.content
        }, (err, newDoc) => {
            console.log('new object: ' + JSON.stringify(newDoc));
            //display it in the chat
            io.emit('chat message', newDoc);
        });
    });

    socket.on('new chat message', (obj) => {
        chatdb.insert({
            _id: obj._id,
            message: obj.message
        }, (err, newDoc) => {
            console.log('new object: ' + JSON.stringify(newDoc));
            //display it in the chat
            io.emit('new chat message', newDoc);
        });
    });

    socket.on('delete chat message', (obj) => {
        chatdb.remove({ _id: obj._id }, {}, (err, numRemoved) => {});
        io.emit('delete chat message', obj);
    });
});
// -- API --
//bodyParser for receiving data via POST request
app.use(bodyParser.json());


//API
app.post('/api/chat', function (req, res) {
    chatdb.find({}).sort({createdAt: 1}).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
})

