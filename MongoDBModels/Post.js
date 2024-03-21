const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    body: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    tags: [{ type: String }],
    image: {
        type: String, // URL 
        default: ''
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now }
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = { PostModel };