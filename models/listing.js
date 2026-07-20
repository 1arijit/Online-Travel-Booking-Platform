const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?..." : v,
        },
    },
    price: {
        type:Number,
        default: 0,
        set: (v) => v<0 ? 0 : v,
    },
    location: String,
    country: String,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
            type:String,
            enum :[ 'Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

listingSchema.post('findOneAndDelete' , async(listing)=>{
    if(listing && listing.reviews){
        await Review.deleteMany({_id :{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;