/**
 * Created by William on 18/10/2018.
 */
const express = require('express');
const fs = require('fs');
const Form = require('../models/form');
const router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {

        var admin = req.session.user.admin;
        Form.find({status: 'pending', evaluation_date: { $gt: Date.now(), $lt: (Date.now()+(3*24*60*60*1000)) }, },function(err, soon){
            Form.find({status: 'pending', evaluation_date: { $lte: Date.now() }, },function(err, overdue){
            res.render('high-priority',{page_name:'high-priority',title:'UEA REC Application - High Priority', admin: admin, overdue:overdue, soon:soon});
            })
        })

    } else {
        console.log("You do not have permission to view this content.");
        res.redirect('/restricted');
    }
});

module.exports = router;
