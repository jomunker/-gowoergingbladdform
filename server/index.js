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
const db = new Database({ filename: 'database.db', timestampData: true });
db.loadDatabase();

io.on('connection', (socket) => {
    // listen on socket events
    
    socket.on('new module', (module) => {
        // inserts module in db when created
        db.insert({
            _id: module._id,
            idHTML: module.idHTML,
            type: module.type,
            position: module.position,
            content: module.content
        }, (err, newModule) => {
            console.log('new object: ' + JSON.stringify(newModule));
            io.emit('new module', newModule);
        });
    });

    socket.on('module edited', (edit) => {
        // updates db if a module is edited
        db.update({ _id: edit._id }, {
            _id: edit._id,
            idHTML: edit.idHTML,
            type: edit.type,
            position: edit.position,
            content: edit.content
        }, { upsert: true }, function (err, numReplaced) {
        });
        console.log(edit);
        io.emit('editModule', edit);
    });

    socket.on('module deleted', (deleted) => {
        // removes module from db if deleted
        console.log('delete: ' + JSON.stringify(deleted))
        db.remove({ _id: deleted._id }, {}, (err, numRemoved) => { });
        io.emit('deleteModule', deleted);
    });

});


// -- API --
//bodyParser for receiving data via POST request
app.use(bodyParser.json());


//API
app.post('/api/modules', function (req, res) {
    db.find({}).sort({ createdAt: 1 }).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
})