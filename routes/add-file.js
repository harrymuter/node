const express = require('express');
const fs = require('fs');
const shell = require('shelljs');
const Form = require('../models/form');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        var admin = req.session.user.admin;
        res.render('add-file',{page_name:'add-files',title:'UEA REC Application - Add Files', admin: admin, query:req.query});
    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});


router.post('/', function (req, res) {
    // CHECK USER IS LOGGED IN
    if(req.session.user) {

        if(req.files.file!==null){

        var code = req.body.code; var seq = req.body.seq;
        const dir = './public/files/' + code + '/' + seq + '/';
        if (!fs.existsSync(dir)) {
            shell.mkdir('-p', dir);
        }
        var file_size = 0;
        let sampleFile = req.files.file;
        sampleFile.mv(dir + '/' + sampleFile.name, function (err) {
            if (err) {
                console.log(err);
                return res.end("File cannot be uploaded to the server.");
            } else {
                var stats = fs.statSync(dir + '/' + sampleFile.name);
                var fileSizeInBytes = stats.size;
                var fileSizeInKbytes = fileSizeInBytes / 1000.0;
                fileSizeInKbytes = Math.round( fileSizeInKbytes * 1e2 ) / 1e2;
                file_size = fileSizeInKbytes;

                    const file = {
                        name: req.files.file.name,
                        file_type: req.files.file.mimetype,
                        path: 'files/' + code + '/' + seq + '/',
                        last_upload: Date.now(),
                        size: file_size
                    };

                    Form.findOne({code:code, seq:seq}, function (err, doc) {
                        if (err) {
                            console.log(err);
                            return res.end("Database internal server failure.");
                        } else {
                            if (!doc) {
                                console.log(err);
                                return res.end("Application cannot be found.");
                            } else {
                                doc.attachments.push(file);
                                doc.last_update = Date.now();
                                doc.save(function (err) {
                                    if (err) {
                                        console.log(err);
                                        return res.end("Error saving document reference.");
                                    } else {
                                        res.redirect('/');
                                    }
                                });
                            }
                        }
                    });
                }
        });

    } else {
        console.log("You do not have the correct permissions to perform this task.");
        res.redirect('/restricted');
    }
    } else {
        console.log('Error');
    }
});

module.exports = router;



