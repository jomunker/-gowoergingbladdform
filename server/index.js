const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

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

app.post('/api/modules', function (req, res) {
    db.find({}).sort({ createdAt: 1 }).exec((err, data) => {
        if (err) {
            res.end();
            return;
        }
        res.json(data);
    });
})


//File Upload
app.use(fileUpload({
    createParentPath: true
}));

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// make directory accessible
app.use(express.static('uploads'));

//Upload single image
app.post('/upload-image', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let image = req.files.image;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            image.mv('./uploads/' + image.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// Upload multiple images
// Problem: does not support single file upload

// app.post('/upload-images', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             let data = []; 
    
//             //loop all files
//             _.forEach(_.keysIn(req.files.photos), (key) => {
//                 let photo = req.files.photos[key];
                
//                 //move photo to uploads directory
//                 photo.mv('./uploads/' + photo.name);

//                 //push file details
//                 data.push({
//                     name: photo.name,
//                     mimetype: photo.mimetype,
//                     size: photo.size
//                 });
//             });
    
//             //return response
//             res.send({
//                 status: true,
//                 message: 'Files are uploaded',
//                 data: data
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });