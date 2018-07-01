const { mongoose } = require('./mongoose')

var scheduleSchema = new mongoose.Schema(
    {
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        start: Number,
        end: Number,
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

let Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Schedule }