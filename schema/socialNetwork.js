const { mongoose } = require('./mongoose')

var socialNetworkSchema = new mongoose.Schema(
    {
        provider: String,
        url: String,
        type: {
            type: String,
            enum: ["agent", "advisor", "inspector", "lawyer"]
        },
        refSlug: String
    },
    {
        timestamps: true
    }
);

let SocialNetwork = mongoose.model('SocialNetwork', socialNetworkSchema);

module.exports = { SocialNetwork }