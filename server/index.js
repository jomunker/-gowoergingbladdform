const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('../dist/'));
http.listen(3000, () => {
    console.log('listening on *:3000');
});

//NeDB
const Database = require('nedb');
const db = new Database({ filename: 'database.db', timestampData: true });
db.loadDatabase();

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        db.insert({ 'message': msg }, (err, newDoc) => { });
        console.log('chat: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('module edited', (object) => {

        db.update({ id: object.id }, {id: object.id, idHTML: object.idHTML, type: object.type, position: object.position, content: object.content}, { upsert: true }, function (err, numReplaced) {
          });

        // db.remove({ id: object.id }, {}, function (err, numRemoved) {
        // });

        // db.insert({id: object.id,idHTML: object.idHTML, type: object.type, position: object.position, content: object.content}, function (err, docs) {});

        console.log(object);
        io.emit('module edited', object);
    });
});



// API

app.post('/api/all', function (req, res) {
    db.find({}).sort({createdAt: 1}).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        console.log(data);
        res.json(data);
    });
})