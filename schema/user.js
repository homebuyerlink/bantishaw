const { mongoose } = require('./mongoose')

var userSchema = new mongoose.Schema(
    {
        username: String,
        userType: {
            type: String,
            enum: ["client", "owner", "agent", "advisor", "inspector", "lawyer"]
        },
        name: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String,
        isActive: {
            type: Boolean,
            default: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        passwordResetToken: String,
        emailVerificationToken: String,
        token: String
    },
    {
        timestamps: true
    }
);

let User = mongoose.model('User', userSchema);

module.exports = { User }