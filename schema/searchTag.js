const { mongoose } = require('./mongoose')

var searchTagSchema = new mongoose.Schema(
    {
        text: String,
        type: {
            type: String,
            enum: ["agent", "advisor", "inspector", "lawyer"]
        },
        refId: mongoose.Schema.Types.ObjectId
    },
    {
        timestamps: true
    }
);

let SearchTag = mongoose.model('SearchTag', searchTagSchema);

module.exports = { SearchTag }