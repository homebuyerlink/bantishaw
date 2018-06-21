const { mongoose } = require('./mongoose');
const URLSlugs = require('mongoose-url-slugs');

var inspectionCompanyServiceSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: Number,
        promo: Number,
        details: String,
        inspectionCompanyId: mongoose.Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

inspectionCompanyServiceSchema.plugin(URLSlugs('name'));
let InspectionCompanyService = mongoose.model('InspectionCompanyService', inspectionCompanyServiceSchema);

module.exports = { InspectionCompanyService }