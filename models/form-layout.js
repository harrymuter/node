const mongoose = require('mongoose');
mongoose.connect('mongodb://178.62.8.45:27017/nodeauth', { useNewUrlParser: true });

    const FormLayoutSchema = mongoose.Schema({
        form_layout_no: {
            type: Number,
            index: true
        },
        form_version_no: {
            type: Number,
            index: true
        },
        form_type: String,
        questions: [Number],
        name: String,
        template: String,
        raw_html: String,
        creator: String,
        created: Date,
    });

const FormLayout = module.exports = mongoose.model('FormLayout', FormLayoutSchema);

module.exports.createFormLayout = function(newFormLayout, callback){
    newFormLayout.created = Date.now();
    newFormLayout.save(callback);
};