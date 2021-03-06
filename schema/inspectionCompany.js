const { mongoose } = require('./mongoose');
const URLSlugs = require('mongoose-url-slugs');

var inspectionCompanySchema = new mongoose.Schema(
    {
        name: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        email: String,
        website: String,
        founded: Date,
        image: String,
        lat: String,
        lng: String,
        radius: String,
        userId: mongoose.Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

inspectionCompanySchema.plugin(URLSlugs('name'));
let InspectionCompany = mongoose.model('InspectionCompany', inspectionCompanySchema);

module.exports = { InspectionCompany }