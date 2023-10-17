// create programming model
// it is mapped to programmingvideos collection

// import mongoose

let mongoose = require("mongoose")

// use mongoose to create mongo Schema

let mongoSchema = mongoose.Schema

// use mongoSchema to map with programmingvideos collection

let programmingCol = new mongoSchema(
    {
    "id": Number,
    "videoid": String,
    "title": String
    },
    {
        collection:"programmingvideos"
    }
)

// export the model

module.exports = mongoose.model('programming', programmingCol)