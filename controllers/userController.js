const { User } = require('./../schema/user');
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
            let user = await User.findOne({ email: email });
            if (user != null)
                throw { code: 400, message: "Email already exists" };
            else {
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
            if (token == null)
                throw { code: 401, message: "You are not authorized to make this request" };
            let decodedToken = authMiddleware.decodeJWT(token);
            let user = await User.findOne({ _id: decodedToken.sub, token: token });
            if (user == null)
                throw { code: 401, message: "You are not authorized to make this request" };
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
}

const userController = new UserController();
module.exports = { userController };