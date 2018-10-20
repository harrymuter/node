var mongoose = require('mongoose');
var tunnel = require('tunnel-ssh');

var config = {
    username:'root',
    host:'206.189.126.181',
    agent : process.env.SSH_AUTH_SOCK,
    privateKey:require('fs').readFileSync('/Users/William/.ssh/id_rsa'),
    port:22,
    dstPort:27017,
    password:'Greenways4'
};

tunnel(config, (error, server) => {
    if(error) {
        console.log("SSH connection error: ", error);
    }
    mongoose.connect(`mongodb://127.0.0.1:27017/nodeauth}`);
    //important from above line is the part 127.0.0.1:50001
});


//mongoose.connect('mongodb://206.189.126.181:27017/nodeauth', { useNewUrlParser: true });
//mongodb://:Greenways4@178.62.98.86:27017/nodeauth


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
