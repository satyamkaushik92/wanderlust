const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index = async (req, res) => {
    const alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
  }

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing =async (req, res) => {
    const { id } = req.params;
    const find = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!find){
        req.flash("error","listing does not exist");
        res.redirect("/listings");
        return;
    }
    //console.log(find);
    res.render("listings/show.ejs", { find });
  }

  module.exports.createListing =async (req, res) => {
    
     const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
       .send()
      let url = req.file.path;
      let filename = req.file.filename;
      let newlisting = new listing(req.body.listing);
      newlisting.owner=req.user._id;
      newlisting.image = { url, filename };
      newlisting.geometry = response.body.features[0].geometry;
      let savedListing = await newlisting.save();
      console.log(savedListing);
      req.flash("success","new listing created");
      res.redirect("/listings");
    }

 module.exports.renderEditForm =async (req, res) => {
     const { id } = req.params;
     const find = await listing.findById(id);
     if(!find){
     req.flash("error","listing does not exist");
         res.redirect("/listings");
         return;
     }
     //let originalImageUrl = find.image.url;
     //originalImageUrl = originalImageUrl.replace("/uploads/","/uploads/h_100,w_300");
     res.render("listings/edit.ejs", { find, originalImageUrl: null });
   }   

module.exports.updateListing =async (req, res) => {
    const { id } = req.params;
    const find = await listing.findById(id);

    find.title = req.body.listing.title;
    find.description = req.body.listing.description;
    find.price = req.body.listing.price;
    find.country = req.body.listing.country;
    find.location = req.body.listing.location;

    if (req.body.listing.image?.url) {
      find.image.url = req.body.listing.image.url;
    }

    await find.save();
    if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    find.image = { url, filename };
    await find.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  }   

module.exports.deleteListing =async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");

    res.redirect("/listings");
  }  