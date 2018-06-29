const { mongoose } = require('./mongoose');
const URLSlugs = require('mongoose-url-slugs');

var lawyerCompanyServiceSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        price: Number,
        promo: Number,
        details: String,
        lawyerCompanyId: mongoose.Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

lawyerCompanyServiceSchema.plugin(URLSlugs('name'));
let LawyerCompanyService = mongoose.model('LawyerCompanyService', lawyerCompanyServiceSchema);

module.exports = { LawyerCompanyService }