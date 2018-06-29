const { mongoose } = require('./mongoose');
const URLSlugs = require('mongoose-url-slugs');

var lawyerCompanySchema = new mongoose.Schema(
    {
        name: String,
        lawyerName: String,
        designation: String,
        experience: String,
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

lawyerCompanySchema.plugin(URLSlugs('name'));
let LawyerCompany = mongoose.model('LawyerCompany', lawyerCompanySchema);

module.exports = { LawyerCompany }