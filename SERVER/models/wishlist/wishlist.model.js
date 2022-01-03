const mongoose = require("mongoose");

const { Schema,model } = mongoose;

const WishlistSchema = new Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "prodct"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const wishlistModal = model("wishlist", WishlistSchema)
module.exports = wishlistModal