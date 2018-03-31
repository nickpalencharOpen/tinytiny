let mongoose = require('mongoose');

let LinkSchema = new mongoose.Schema({
    link_id: {type: String, unique: true, required: true},
    expandedUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creationDate: { type: Date, default: Date.now }
});

mongoose.model('Link', LinkSchema);
