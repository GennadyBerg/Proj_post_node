const mongoose =require ('mongoose');



const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    owner_id: String
});

const PostModel = mongoose.model('Post', PostSchema);


module.exports =  {PostModel, PostSchema} ;