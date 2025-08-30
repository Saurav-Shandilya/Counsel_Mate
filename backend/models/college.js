const mongoose = require("mongoose");

// Define the Mongoose schema for the College collection
const CollegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        city: String,
        state: String,
        district: String,
        address: String,
        pincode: String
    },
    establishmentDetails: {
        type: String,
        yearEstablished: Number,
        affiliation: String
    },
    coursesOffered: [
        {
            courseName: String,
            duration: String,
            eligibility: String
        }
    ],
    placementData: {
        placementPercentage: Number,
        averagePackage: String,
        highestPackage: String
    },
    infrastructure: {
        hostel: Boolean,
        library: Boolean,
        sportsComplex: Boolean
    },
    contactInformation: {
        phone: String,
        email: String,
        website: String
    },
    reviews: {
        overallRating: Number,
        totalReviews: Number
    },
    source: {
        type: String,
        required: true
    }
}, {
    // Mongoose options
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create and export the Mongoose model
const College = mongoose.model("College", CollegeSchema);

module.exports = College;
