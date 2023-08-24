const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
//const morgan = require("morgan");

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {console.log("Database connected");});


const sample = array => array[Math.floor(Math.random() * array.length)];


//image: 'https://source.unsplash.com/collection/483251',


const seedDB = async ()=>{
    /*Delete all Campgrounds*/
    await Campground.deleteMany({});
     for (let i = 0; i < 2; i++)
     {
       const random1000 = Math.floor(Math.random()*1000);
       const price = Math.floor(Math.random()*20) +10;

       /*Create a new Campground*/
       const camp = new Campground({
           author: "5f5c330c2cd79d538f2c66d9",
           title:`${sample(descriptors)} ${sample(places)}`,
           location:`${cities[random1000].city}, ${cities[random1000].state}`,
           description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet cum, doloremque facere harum illo magni maiores modi mollitia odit, officia qui quisquam recusandae saepe tenetur velit vero? Ab, aliquid!\n' +
               'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet cum, doloremque facere harum illo magni maiores modi mollitia odit, officia qui quisquam recusandae saepe tenetur velit vero? Ab, aliquid!\n',
           price,
           images: [
               {
                   url: 'https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=959&q=80',
                       // 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                   filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
               }, {
                   url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                   filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
               }
           ]
           // geometry: {
           //     type: "Point",
           //     coordinates: [cities[random1000].latitude, cities[random1000].longitude]
           // },

       });
       //Save Campgrounds
       await camp.save();
    }
};
seedDB().then(()=>{mongoose.connection.close();});

