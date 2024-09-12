const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userEducationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    education1: {
        type: String,
        required: false
    },
    education2: {
        type: String,
        required: false,
        unique: true 
    },
    user_college: {
        type: String,
        required: false
    },
    exp1:{
        type: String,
        required:false
    },
    exp2:{
        type: String,
        required:false
    },
    exp_compn1:{
        type: String,
        required:false
    }, exp_compn2:{
        type: String,
        required:false
    }
});


const Education = mongoose.model('Education', userEducationSchema);

module.exports = Education;