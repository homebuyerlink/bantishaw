const { InspectionCompanyService } = require('./../schema/inspectionCompanyService');
const { InspectionCompany } = require('./../schema/inspectionCompany');
const { SocialNetwork } = require('./../schema/socialNetwork');
const { errorHandler } = require('./../utils/errorHandler');
const { TeamMember } = require('./../schema/teamMember');
const { Inspector } = require('./../models/inspector');
const { SearchTag } = require('./../schema/searchTag');
const { Schedule } = require('./../schema/schedule');
const { User } = require('./../schema/user');
class InspectorController {

    async registrationWizardStep1(req, res) {
        try {
            let inspectionCompany = new InspectionCompany({
                name: req.body.name,
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
            inspectionCompany = await inspectionCompany.save();
            let socialNetworks = [
                {
                    provider: "facebook",
                    url: req.body.facebook,
                    type: "inspector",
                    refId: inspectionCompany._id
                },
                {
                    provider: "youtube",
                    url: req.body.youtube,
                    type: "inspector",
                    refId: inspectionCompany._id
                },
                {
                    provider: "instagram",
                    url: req.body.instagram,
                    type: "inspector",
                    refId: inspectionCompany._id
                },
                {
                    provider: "google-plus",
                    url: req.body.gplus,
                    type: "inspector",
                    refId: inspectionCompany._id
                },
                {
                    provider: "twitter",
                    url: req.body.twitter,
                    type: "inspector",
                    refId: inspectionCompany._id
                },
                {
                    provider: "associations",
                    url: req.body.associations,
                    type: "inspector",
                    refId: inspectionCompany._id
                }
            ]
            await SocialNetwork.insertMany(socialNetworks);
            let user = await User.findByIdAndUpdate(req.body.userId, { profileWizardStep: 1 });
            res.send({ success: true, inspectionCompany: inspectionCompany, nextStep: 1 });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async registrationWizardStep2(req, res) {
        try {
            let inspectionCompany = await InspectionCompany.findById(req.body.companyId);
            let teamMembers = req.body.teamMembers;
            let tags = req.body.tags;
            let teamMemberUpsertArray = teamMembers.map(x => {
                return {
                    name: x.name,
                    designation: x.designation,
                    email: x.email,
                    phone: x.phone,
                    image: x.image,
                    type: "inspector",
                    refId: req.body.companyId
                }
            });
            let tagUpsert = tags.map(x => {
                return {
                    text: x,
                    type: "inspector",
                    refId: req.body.companyId
                }
            });
            await TeamMember.insertMany(teamMemberUpsertArray);
            await SearchTag.insertMany(tagUpsert);
            let user = await User.findByIdAndUpdate(req.body.userId, { profileWizardStep: 2 });
            res.send({ success: true, nextStep: 2 });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async registrationWizardStep3(req, res) {
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
                    inspectionCompanyId: req.body.companyId
                }
            });
            await InspectionCompanyService.insertMany(servicesUpsertArray);
            let user = await User.findByIdAndUpdate(req.body.userId, { profileWizardStep: 3 });
            res.send({ success: true, nextStep: 3 });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async registrationWizardStep4(req, res) {
        try {
            let schedule = req.body.schedule;
            let emailNotification = req.body.emailNotification;
            let companyId = req.body.companyId;
            let userId = req.body.userId;
            schedule.forEach(day => {
                day.refId = companyId;
                day.type = 'inspector'
            });
            await Schedule.insertMany(schedule);
            await User.findByIdAndUpdate(userId, { $set: { profileWizardStep: 4, emailNotification: emailNotification } });
            res.send({ success: true, nextStep: null });
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async getInspectorServices(req, res) {
        try {
            let services = await InspectionCompanyService.find({
                inspectionCompanyId: req.query.companyId
            });
            res.send(services);
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async getAllInspectors(req, res) {
        try {
            let inspectors = await InspectionCompany.aggregate([].concat(Inspector.prototype.inspectionCompanyPipeline()));
            res.send(inspectors)
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async getInspectorCompanyBySlug(req, res) {
        try {
            let inspectionCompany = await InspectionCompany.aggregate([
                {
                    $match: {
                        slug: req.query.slug
                    }
                }
            ].concat(Inspector.prototype.inspectionCompanyPipeline()));
            res.send(inspectionCompany[0]);
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async editCompanyDetails(req, res) {
        try {
            let inspectionCompany = await InspectionCompany.findById(req.body.companyId);
            if (inspectionCompany == null)
                throw { code: 400, message: "companyId is incorrect" };
            else {
                await InspectionCompany.findByIdAndUpdate(req.body.companyId, {
                    $set: {
                        name: req.body.name,
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
                        radius: req.body.radius
                    }
                });

                let socialNetworks = [
                    {
                        provider: "facebook",
                        url: req.body.facebook,
                        type: "inspector",
                        refId: inspectionCompany._id
                    },
                    {
                        provider: "youtube",
                        url: req.body.youtube,
                        type: "inspector",
                        refId: inspectionCompany._id
                    },
                    {
                        provider: "instagram",
                        url: req.body.instagram,
                        type: "inspector",
                        refId: inspectionCompany._id
                    },
                    {
                        provider: "google-plus",
                        url: req.body.gplus,
                        type: "inspector",
                        refId: inspectionCompany._id
                    },
                    {
                        provider: "twitter",
                        url: req.body.twitter,
                        type: "inspector",
                        refId: inspectionCompany._id
                    },
                    {
                        provider: "associations",
                        url: req.body.associations,
                        type: "inspector",
                        refId: inspectionCompany._id
                    }
                ]
                for (const network of socialNetworks) {
                    await SocialNetwork.findOneAndUpdate({ provider: network.provider, refId: network.refId, type: network.type }, {
                        $set: network
                    });
                }
                res.send({ success: true, inspectionCompany: inspectionCompany });
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async editService(req, res) {
        try {
            let serviceId = req.body.serviceId;
            let service = await InspectionCompanyService.findById(serviceId);
            if (service == null)
                throw { code: 400, message: "Service ID is not valid" };
            else {
                let name = req.body.name;
                let image = req.body.image;
                let price = req.body.price;
                let promo = req.body.promo;
                let details = req.body.details;
                await InspectionCompanyService.findByIdAndUpdate(serviceId, {
                    $set: {
                        name: name,
                        image: image,
                        price: price,
                        promo: promo,
                        details: details,
                    }
                });
                service = await InspectionCompanyService.findById(serviceId);
                res.send(service);
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

    async editAgent(req, res) {
        try {
            let agentId = req.body.agentId;
            let teamMember = await TeamMember.findById(agentId);
            if (teamMember == null)
                throw { code: 400, message: "Agent not found!" };
            else {
                let name = req.body.name,
                    designation = req.body.designation,
                    email = req.body.email,
                    phone = req.body.phone,
                    image = req.body.image;
                await TeamMember.findByIdAndUpdate(agentId, {
                    $set: {
                        name: name,
                        designation: designation,
                        email: email,
                        phone: phone,
                        image: image,
                    }
                });
                teamMember = await TeamMember.findById(agentId);
                res.send(teamMember);
            }
        } catch (error) {
            errorHandler.sendError(res, error);
        }
    }

}

const inspectorController = new InspectorController();
module.exports = { inspectorController };