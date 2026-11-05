const mongoose=require("mongoose");
const { type } = require("node:os");
const review=require("./review.js");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
   title:
   {
    type:String,
    required:true
},
   description:String,

    image: {
        url:String,
        filename:String,
    },
   price:Number,
   location:String,
   country:String,
   reviews:[{
    type:Schema.Types.ObjectId,
    ref: "Review",

   }],
   owner:{
    type:Schema.Types.ObjectId,
    ref: "User",
   },
   geometry: {
      type: {
        type: String,
        enum: ['Point'], // 'geometry.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
});

listingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: { $in: doc.reviews }
        });
    }
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;