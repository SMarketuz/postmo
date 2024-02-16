const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    desc: {
        type: String,
    },
    user: {type: mongoose.Schema.Types.ObjectId , ref: "User"}
    
},{timestamps: true});

const Posts = mongoose.model('Posts' , postSchema);
exports.Posts = Posts;