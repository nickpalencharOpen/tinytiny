let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

mongoose.model('User', UserSchema);