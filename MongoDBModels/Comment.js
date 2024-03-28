const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = { CommentModel, CommentSchema };