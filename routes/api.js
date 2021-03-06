'use strict';

const { Router } = require('express');
const { userController } = require('./../controllers/userController');
const { authMiddleware } = require('./../middleware/authMiddleware');
const { utilsController } = require('./../controllers/utilsController');
const { inspectorController } = require('./../controllers/inspectorController');
const { lawyerController } = require('./../controllers/lawyerController');
const router = new Router();

//USER ROUTES
router.get('/user', userController.getUsers);
router.get('/user/logout', userController.logout);
router.get('/user/verify-email', userController.verifyEmail);
router.get('/user/company', userController.getCompanyDetails);
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.post('/user/login/social', userController.socialLogin);
router.post('/user/profile', authMiddleware.ensureAuthenticated, userController.profile);
router.post('/user/login/check', userController.checkLogin);
router.put('/user/username', userController.updateUsername);
router.put('/user/usertype', userController.updateUserType);

//INSPECTOR
router.get('/inspector', inspectorController.getAllInspectors);
router.get('/inspector/slug', inspectorController.getInspectorCompanyBySlug);
router.get('/inspector/service', inspectorController.getInspectorServices);
router.post('/inspector/registration/wizard/step-1', inspectorController.registrationWizardStep1);
router.post('/inspector/registration/wizard/step-2', inspectorController.registrationWizardStep2);
router.post('/inspector/registration/wizard/step-3', inspectorController.registrationWizardStep3);
router.post('/inspector/registration/wizard/step-4', inspectorController.registrationWizardStep4);
router.put('/inspector', inspectorController.editCompanyDetails);
router.put('/inspector/agent', inspectorController.editAgent);
router.put('/inspector/service', inspectorController.editService);

//LAWYER
router.get('/lawyer/slug', lawyerController.getLawyerCompanyBySlug);
router.post('/lawyer/registration/wizard/step-1', lawyerController.registrationWizardStep1);
router.post('/lawyer/registration/wizard/step-2', lawyerController.registrationWizardStep2);
router.post('/lawyer/registration/wizard/step-3', lawyerController.registrationWizardStep3);
router.put('/lawyer', lawyerController.editCompanyDetails);
router.put('/lawyer/service', lawyerController.editService);

//UTILITY ROUTES
router.post('/utils/upload', utilsController.uploadFile, utilsController.sendResponse);

router.get("/test", function (req, res) {
    res.send({ success: true });
});

module.exports = router;