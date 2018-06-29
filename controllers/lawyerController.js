const { LawyerCompanyService } = require('./../schema/lawyerCompanyService');
const { LawyerCompany } = require('./../schema/lawyerCompany');
const { SocialNetwork } = require('./../schema/socialNetwork');
const { SearchTag } = require('./../schema/searchTag');
const { User } = require('./../schema/user');
const { Lawyer } = require('./../models/lawyer')
const { errorHandler } = require('./../utils/errorHandler');

class LawyerController {
    async registrationWizardStep1(req, res) {
        try {
            let tags = req.body.tags;
            let lawyerCompany = new LawyerCompany({
                name: req.body.name,
                lawyerName: req.body.lawyerName,
                designation: req.body.designation,
                experience: req.body.experience,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website,
                founded: req.body.founded,
                image: req.body.image,
                lat: req.body.lat,
                lng: req.body.lng,
                radius: req.body.radius,
                userId: req.body.userId
            });
            lawyerCompany = await lawyerCompany.save();
            let tagUpsert = tags.map(x => {
                return {
                    text: x,
                    type: "lawyer",
                    refId: lawyerCompany._id
                }
            });
            await SearchTag.insertMany(tagUpsert);
            let socialNetworks = [
                {
                    provider: "facebook",
                    url: req.body.facebook,
                    type: "lawyer",
                    refId: lawyerCompany._id
                },
                {
                    provider: "youtube",
                    url: req.body.youtube,
                    type: "lawyer",
                    refId: lawyerCompany._id
                },
                {
                    provider: "instagram",
                    url: req.body.instagram,
                    type: "lawyer",
                    refId: lawyerCompany._id
                },
                {
                    provider: "google-plus",
                    url: req.body.gplus,
                    type: "lawyer",
                    refId: lawyerCompany._id
                },
                {
                    provider: "twitter",
                    url: req.body.twitter,
                    type: "lawyer",
                    refId: lawyerCompany._id
                },
                {
                    provider: "associations",
                    url: req.body.associations,
                    type: "lawyer",
                    refId: lawyerCompany._id
                }
            ]
            await SocialNetwork.insertMany(socialNetworks);
            let user = await User.findByIdAndUpdate(req.body.userId, { profileWizardStep: 1 });
            res.send({ success: true, lawyerCompany: lawyerCompany, nextStep: 1 });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async registrationWizardStep2(req, res) {
        try {
            let companyId = req.body.companyId;
            let services = req.body.services;
            let servicesUpsertArray = services.map(x => {
                return {
                    name: x.name,
                    image: x.image,
                    price: x.price,
                    promo: x.promo,
                    details: x.details,
                    lawyerCompanyId: req.body.companyId
                }
            });
            await LawyerCompanyService.insertMany(servicesUpsertArray);
            let user = await User.findByIdAndUpdate(req.body.userId, { profileWizardStep: 2 });
            res.send({ success: true, nextStep: 2 });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async getLawyerCompanyBySlug(req, res) {
        try {
            let lawyerCompany = await LawyerCompany.aggregate([
                {
                    $match: {
                        slug: req.query.slug
                    }
                }
            ].concat(Lawyer.prototype.lawyerCompanyPipeline()));
            res.send(lawyerCompany[0]);
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async editService(req, res) {
        try {
            let serviceId = req.body.serviceId;
            let service = await LawyerCompanyService.findById(serviceId);
            if (service == null)
                throw { code: 400, message: "Service ID is not valid" };
            else {
                let name = req.body.name;
                let image = req.body.image;
                let price = req.body.price;
                let promo = req.body.promo;
                let details = req.body.details;
                await LawyerCompanyService.findByIdAndUpdate(serviceId, {
                    $set: {
                        name: name,
                        image: image,
                        price: price,
                        promo: promo,
                        details: details,
                    }
                });
                service = await LawyerCompanyService.findById(serviceId);
                res.send(service);
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }
}

const lawyerController = new LawyerController();
module.exports = { lawyerController };