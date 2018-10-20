var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');


    const FormSchema = mongoose.Schema({
        first_name:  String,
        last_name: String,
        username : String,
        project_title: {
            type: String,
            max: 80
        },
        type_of_applicant: String,
        time: Number,
        last_update: Number,
        status: String,
        code: {
            type: String,
            index: true
        },
        seq : {
            type: Number,
            index: true
        },
        school: String,
        form_layout_no: Number,
        form_version_no: Number,
        answers: Object,
        feedback: String,
        feedback_time: Number,
        evaluation_date: Number,
        attachments: [{
            name: String,
            file_type: String,
            path: String,
            last_upload: Date,
            size: Number
        }]
    });

var Form = module.exports = mongoose.model('Form', FormSchema);

module.exports.createForm = function(newForm, callback){
    newForm.save(callback)
};
