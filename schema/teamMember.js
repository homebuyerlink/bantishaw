const { mongoose } = require('./mongoose')

var teamMemberSchema = new mongoose.Schema(
    {
        name: String,
        designation: String,
        email: String,
        phone: String,
        image: String,
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

let TeamMember = mongoose.model('TeamMember', teamMemberSchema);

module.exports = { TeamMember }