const { mongoose } = require('./mongoose')

var userSchema = new mongoose.Schema(
    {
        username: String,
        userType: {
            type: String,
            enum: ["client", "agent", "advisor", "inspector", "lawyer"]
        },
        name: String,
        email: {
            type: String,
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
        token: String,
        photoUrl: String,
        provider: String,
        profileWizardStep: {
            type: Number,
            default: 0
        },
        profileWizardTotalSteps: {
            type: Number,
            default: 1
        },
        emailNotification: String
    },
    {
        timestamps: true
    }
);

let User = mongoose.model('User', userSchema);
User.createIndexes([
    {
        key: { email: 1 },
        name: 'user_email',
        unique: true
    }
])


module.exports = { User }