const { User } = require('./../schema/user');
const { InspectionCompany } = require('./../schema/inspectionCompany');
const { errorHandler } = require('./../utils/errorHandler');
const { authMiddleware } = require('./../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const nodeMailer = require('./../utils/nodeMailer');
const config = require('./../config');

const uuidv1 = require('uuid/v1');

class UserController {

    async getUsers(req, res) {
        try {
            let users = await User.find().sort({ createdAt: -1 });
            res.send(users);
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async login(req, res) {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let user = await User.findOne({ email: email });
            if (user == null)
                throw { code: 401, message: "User not found!" };
            else {
                if (!user.isActive)
                    throw { code: 401, message: "Your profile is disabled!" };
                let comparison = bcrypt.compareSync(password, user.password);
                if (comparison) {
                    let token = authMiddleware.createJWT(user);
                    await User.findOneAndUpdate({ email: email }, { $set: { token: token } });
                    res.send({ token: token });
                }
                else throw { code: 401, message: "Incorrect password!" };
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async signup(req, res) {
        try {
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;
            let emailVerificationToken = uuidv1();
            let userType = req.body.userType;
            let user = await User.findOne({ email: email });
            if (user != null)
                throw { code: 400, message: "Email already exists" };
            else {
                user = await User.findOne({ username: username });
                if (user != null)
                    throw { code: 400, message: "Username already exists" };
                user = new User({
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 8),
                    emailVerificationToken: emailVerificationToken
                });
                user = await user.save();
                ejs.renderFile('./emails/signup.ejs', { verificationLink: `${config.BASE_URL}/api/user/verify-email?token=${emailVerificationToken}&userId=${user._id}`, user: user }, async (err, str) => {
                    try {
                        if (err)
                            throw "Email not sent!";
                        else {
                            await nodeMailer.sendMail(user.email, "Homebuyer | Thank you for signup", str);
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
                await UserController.prototype.chooseUserType(userType, user);
                let token = authMiddleware.createJWT(user);
                await User.findOneAndUpdate({ email: email }, { $set: { token: token } });
                res.send({ "token": token });
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async logout(req, res) {
        try {
            let user = await User.findById(req.query.userId);
            if (user == null)
                throw { code: 400, message: "Incorrect user id" };
            else await User.findByIdAndUpdate(req.query.userId, { $set: { token: null } });
            res.send({ "message": "Logged out successfully!" });
        } catch (error) {
            errorHandler.sendError(res, error)
        }
    }
    async checkLogin(req, res) {
        try {
            let token = req.body.token;
            if (token == null) {
                res.send({ authenticated: false });
                return;
            }
            let decodedToken = authMiddleware.decodeJWT(token);
            let user = await User.findOne({ _id: decodedToken.sub, token: token });
            if (user == null)
                res.send({ authenticated: false });
            else res.send({ authenticated: true });
        } catch (error) {
            errorHandler.sendError(res, error)
        }
    }
    async profile(req, res) {
        try {
            let token = req.body.token;
            if (token == null)
                throw { code: 401, message: "You are not authorized to make this request" };
            let decodedToken = authMiddleware.decodeJWT(token);
            let user = await User.findOne({ _id: decodedToken.sub, token: token });
            if (user == null)
                throw { code: 401, message: "You are not authorized to make this request" };
            else res.send(user);
        } catch (error) {
            errorHandler.sendError(res, error)
        }
    }
    async verifyEmail(req, res) {
        try {
            let token = req.query.token;
            let userId = req.query.userId;
            let user = await User.findOneAndUpdate({ _id: userId, emailVerificationToken: token }, { $set: { isEmailVerified: true } });
            if (user == null)
                res.redirect(`${config.FRONTEND_BASE}/verify-email/error`);
            else res.redirect(`${config.FRONTEND_BASE}/verify-email`)
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async socialLogin(req, res) {
        try {
            let email = req.body.email;
            let name = req.body.name;
            let photoUrl = req.body.photoUrl;
            let provider = req.body.provider;
            let user = await User.findOne({ email: req.body.email });
            if (user != null) {
                let token = authMiddleware.createJWT(user);
                await User.findOneAndUpdate({ email: email }, { $set: { token: token } });
                res.send({ token: token });
            }
            else {
                user = new User({
                    email: email,
                    isEmailVerified: true,
                    name: name,
                    photoUrl: photoUrl,
                    provider: provider
                });
                user = await user.save();
                let token = authMiddleware.createJWT(user);
                await User.findOneAndUpdate({ email: email }, { $set: { token: token } });
                res.send({ token: token });
            }
        } catch (error) {

        }
    }
    async updateUserType(req, res) {
        try {
            let user = await User.findById(req.body.userId);
            let userTypeRes = await UserController.prototype.chooseUserType(req.body.userType, user);
            if (userTypeRes) {
                user = await User.findById(req.body.userId);
                let response = { success: userTypeRes, updatedProfile: user }
                res.send(response);
            }
            else res.send({ success: false, updatedProfile: user });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async chooseUserType(userType, user) {
        if (user.userType == null) {
            if (userType == "client" || userType == "agent" || userType == "advisor" || userType == "inspector" || userType == "lawyer") {
                let profileWizardTotalSteps = 1, profileWizardStep = 0;
                if (userType == 'client')
                    profileWizardStep = 1;
                else if (userType == 'inspector')
                    profileWizardTotalSteps = 3;
                else if (userType == 'lawyer') {
                    profileWizardTotalSteps = 2;
                }
                await User.findByIdAndUpdate(user._id, {
                    $set: {
                        userType: userType,
                        profileWizardStep: profileWizardStep,
                        profileWizardTotalSteps: profileWizardTotalSteps
                    }
                });
            }
            else throw { code: 400, message: "Invalid User Type" }
            return true;
        }
        else return false;
    }
    async updateUsername(req, res) {
        try {
            let username = req.body.username;
            let userId = req.body.userId;
            let user = await User.findOne({ username: username });
            if (user != null)
                throw { code: 400, message: "Username already taken!" };
            else {
                await User.findByIdAndUpdate(userId, { $set: { username: username } });
                let user = await User.findById(userId);
                res.send(user);
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
    async getCompanyDetails(req, res) {
        try {
            let userId = req.query.userId;
            let user = await User.findById(userId);
            if (user == null)
                throw { code: 400, message: "User not found!" };
            else {
                let company = {};
                if (user.userType == 'inspector') {
                    company = await InspectionCompany.findOne({ userId: userId });
                }
                //TODO: Other Company types
                res.send(company);
            }
        } catch (error) {

        }
    }
}

const userController = new UserController();
module.exports = { userController };